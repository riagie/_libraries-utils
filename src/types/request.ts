import { z } from "zod";

const UUID_VERSIONS = [1, 2, 3, 4];
const UUID_NAMESPACE_ALIASES = ["dns", "url", "oid", "x500"];
const UUID_V2_DOMAINS = ["person", "group", "org", "domain"];
const UUID_FORMAT =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const UUID_NODE_FORMAT = /^[0-9a-fA-F]{12}$/;

export const UuidSchema = z
  .object({
    version: z.number().int().optional(),
    namespace: z.string().optional(),
    name: z.string().optional(),
    domain: z.string().optional(),
    id: z.number().int().optional(),
    node: z.string().regex(UUID_NODE_FORMAT).optional(),
    msecs: z.number().int().optional(),
  })
  .superRefine((body, ctx) => {
    const version = body.version ?? 4;

    if (!UUID_VERSIONS.includes(version)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["version"],
        message: "version harus 1, 2, 3, atau 4",
      });
      return;
    }

    if (version === 3) {
      if (!body.namespace || !body.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["version"],
          message: "version 3 butuh body namespace + name",
        });
      } else if (
        !UUID_NAMESPACE_ALIASES.includes(body.namespace.toLowerCase()) &&
        !UUID_FORMAT.test(body.namespace)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["namespace"],
          message: "namespace harus alias dns/url/oid/x500 atau UUID",
        });
      }
    }

    if (version === 2) {
      if (!body.domain || body.id === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["version"],
          message: "version 2 butuh body domain + id",
        });
      } else if (!UUID_V2_DOMAINS.includes(body.domain.toLowerCase())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["domain"],
          message: "domain harus person/group/org/domain",
        });
      }
    }
  });

export const PpidSchema = z.object({
  text: z.string(),
});

export const UniqueSchema = z.object({
  character: z.string().optional(),
  length: z.number().int().optional(),
});

export const PhoneNumberSchema = z.object({
  phone: z.string(),
  country: z.string().optional(),
});

export const GeolocationSchema = z.object({
  ip: z.string().optional(),
});

const LU_HTTP_METHODS = [
  "GET",
  "PUT",
  "POST",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const;

export const LuKeyValueSchema = z.object({
  key: z.string().min(1),
  value: z.string().optional(),
  description: z.string().optional(),
});

export const LuRequestSchema = z.object({
  name: z.string().min(1),
  method: z.enum(LU_HTTP_METHODS).optional(),
  path: z.string().min(1),
  query: z.array(LuKeyValueSchema).optional(),
  headers: z.array(LuKeyValueSchema).optional(),
  body: z.union([z.string(), z.record(z.unknown())]).optional(),
  description: z.string().optional(),
});

export const LuFolderSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  requests: z.array(LuRequestSchema).min(1),
});

export const LuSchema = z
  .object({
    name: z.string().min(1),
    unitPath: z
      .string()
      .regex(
        /^[^/]+(\/[^/]+)*$/,
        "unitPath harus 1+ segmen dipisah '/' tanpa segmen kosong",
      ),
    description: z.string().optional(),
    version: z.string().optional(),
    baseUrl: z.string().url(),
    variables: z
      .array(
        z.object({
          key: z.string().min(1),
          value: z.string().optional(),
        }),
      )
      .optional(),
    folders: z.array(LuFolderSchema).optional(),
    requests: z.array(LuRequestSchema).optional(),
  })
  .superRefine((body, ctx) => {
    const folderCount = body.folders?.length ?? 0;
    const requestCount = body.requests?.length ?? 0;
    if (folderCount + requestCount === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["requests"],
        message: "butuh minimal satu request (requests atau folders.requests)",
      });
    }
  });

export type LuKeyValue = z.infer<typeof LuKeyValueSchema>;
export type LuRequest = z.infer<typeof LuRequestSchema>;
export type LuFolder = z.infer<typeof LuFolderSchema>;
export type LuInput = z.infer<typeof LuSchema>;
