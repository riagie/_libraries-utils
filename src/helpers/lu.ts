import * as generators from "./generators";
import type { LuInput, LuKeyValue, LuRequest } from "../types/request";

const LU_COLLECTION_SCHEMA =
  "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";

const BASE_URL_VARIABLE = "{{baseUrl}}";
const PORT_VARIABLE = "{{port}}";

interface LuEnvVar {
  key: string;
  value: string;
}

interface LuBodyParam {
  raw: string;
  vars: LuEnvVar[];
}

function headerList(
  headers: LuKeyValue[] | undefined,
  body: LuRequest["body"],
): Record<string, string>[] {
  const list: Record<string, string>[] = [];

  if (body !== undefined) {
    const hasContentType = (headers ?? []).some(
      (h) => h.key.toLowerCase() === "content-type",
    );
    if (!hasContentType) {
      list.push({ key: "Content-Type", value: "application/json" });
    }
  }

  for (const header of headers ?? []) {
    list.push({
      key: header.key,
      value: header.value ?? "",
      ...(header.description ? { description: header.description } : {}),
    });
  }

  return list;
}

function sanitizeKeyPart(part: string): string {
  const cleaned = part
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return cleaned || "v";
}

function uniqueKey(base: string, used: Set<string>): string {
  let key = base;
  let n = 2;
  while (used.has(key)) {
    key = `${base}_${n}`;
    n++;
  }
  used.add(key);
  return key;
}

function escapePlaceholder(key: string): string {
  return `{{${key}}}`.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function parameterizeObjectBody(
  requestName: string,
  body: Record<string, unknown>,
  used: Set<string>,
): LuBodyParam {
  const vars: (LuEnvVar & { bare: boolean })[] = [];
  const prefix = sanitizeKeyPart(requestName);

  const walk = (value: unknown, path: string[]): unknown => {
    if (value === null || value === undefined) {
      return value;
    }
    const isLeafString = typeof value === "string";
    const isLeafBare = typeof value === "number" || typeof value === "boolean";
    if (!isLeafString && !isLeafBare) {
      if (Array.isArray(value)) {
        return value.map((item, index) => walk(item, [...path, String(index)]));
      }
      if (typeof value === "object") {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value)) {
          out[k] = walk(v, [...path, k]);
        }
        return out;
      }
      return value;
    }

    const key = uniqueKey(
      [prefix, ...path].map(sanitizeKeyPart).join("_"),
      used,
    );
    vars.push({ key, value: String(value), bare: isLeafBare });
    return `{{${key}}}`;
  };

  let raw = JSON.stringify(walk(body, []), null, 2);
  for (const variable of vars) {
    if (variable.bare) {
      raw = raw.replace(
        new RegExp(`"${escapePlaceholder(variable.key)}"`, "g"),
        `{{${variable.key}}}`,
      );
    }
  }

  return { raw, vars: vars.map(({ key, value }) => ({ key, value })) };
}

function buildUrl(
  path: string,
  query: LuKeyValue[] | undefined,
  hasPort: boolean,
): Record<string, unknown> {
  const normalized = path.startsWith("/") ? path : "/" + path;

  const search = new URLSearchParams();
  for (const item of query ?? []) {
    search.set(item.key, item.value ?? "");
  }
  const queryString = search.toString();

  const hostPart = hasPort
    ? `${BASE_URL_VARIABLE}:${PORT_VARIABLE}`
    : BASE_URL_VARIABLE;

  const url: Record<string, unknown> = {
    raw: `${hostPart}${normalized}${queryString ? "?" + queryString : ""}`,
    host: [hostPart],
    path: normalized.slice(1).split("/").filter(Boolean),
  };

  if (query?.length) {
    url.query = query.map((item) => ({
      key: item.key,
      value: item.value ?? "",
      ...(item.description ? { description: item.description } : {}),
    }));
  }

  return url;
}

function buildItem(
  request: LuRequest,
  hasPort: boolean,
  usedKeys: Set<string>,
): Record<string, unknown> & { __vars?: LuEnvVar[] } {
  let body: Record<string, unknown> | undefined;
  let collectedVars: LuEnvVar[] | undefined;
  if (request.body !== undefined) {
    let raw: string;
    if (typeof request.body === "string") {
      raw = request.body;
    } else {
      const param = parameterizeObjectBody(
        request.name,
        request.body,
        usedKeys,
      );
      raw = param.raw;
      collectedVars = param.vars;
    }
    body = { mode: "raw", raw, options: { raw: { language: "json" } } };
  }

  const item: Record<string, unknown> = {
    name: request.name,
    request: {
      method: request.method ?? "POST",
      header: headerList(request.headers, request.body),
      url: buildUrl(request.path, request.query, hasPort),
      ...(request.description ? { description: request.description } : {}),
      ...(body ? { body } : {}),
    },
    response: [],
  };

  if (collectedVars?.length) {
    (item as Record<string, unknown> & { __vars?: LuEnvVar[] }).__vars =
      collectedVars;
  }

  return item as Record<string, unknown> & { __vars?: LuEnvVar[] };
}

function collectItemVars(item: Record<string, unknown>): LuEnvVar[] {
  const vars = (item as { __vars?: LuEnvVar[] }).__vars;
  delete (item as { __vars?: LuEnvVar[] }).__vars;
  return vars ?? [];
}

export function buildLu(input: LuInput): {
  collection: Record<string, unknown>;
  environment: Record<string, unknown>;
} {
  const parsedBase = new URL(input.baseUrl);
  const hasPort = parsedBase.port !== "";
  const usedKeys = new Set<string>(["baseUrl", "port"]);

  const envVars: LuEnvVar[] = [
    { key: "baseUrl", value: `${parsedBase.protocol}//${parsedBase.hostname}` },
  ];
  if (hasPort) {
    envVars.push({ key: "port", value: parsedBase.port });
  }

  const items: Record<string, unknown>[] = [];

  for (const folder of input.folders ?? []) {
    const folderItems = folder.requests.map((request) =>
      buildItem(request, hasPort, usedKeys),
    );
    const folderVars = folderItems.flatMap(collectItemVars);
    items.push({
      name: folder.name,
      ...(folder.description ? { description: folder.description } : {}),
      item: folderItems,
    });
    envVars.push(...folderVars);
  }

  for (const request of input.requests ?? []) {
    const item = buildItem(request, hasPort, usedKeys);
    envVars.push(...collectItemVars(item));
    items.push(item);
  }

  const collectionName = [input.name, ...input.unitPath.split("/")].join(" > ");

  const collection = {
    info: {
      _postman_id: generators.uuid(),
      name: collectionName,
      schema: LU_COLLECTION_SCHEMA,
      ...(input.description ? { description: input.description } : {}),
      ...(input.version ? { version: input.version } : {}),
    },
    item: items,
  };

  for (const variable of input.variables ?? []) {
    if (variable.key === "baseUrl" || variable.key === "port") {
      continue;
    }
    envVars.push({
      key: variable.key,
      ...(variable.value !== undefined
        ? { value: variable.value }
        : { value: "" }),
    });
  }

  const envName =
    `${input.name.split(":").pop()?.trim() || input.name}: ${input.unitPath.split("/").pop()?.trim() || input.unitPath}`.toUpperCase();

  const environment = {
    name: envName,
    values: envVars.map((variable) => ({ ...variable, enabled: true })),
    _postman_variable_scope: "environment",
  };

  return { collection, environment };
}
