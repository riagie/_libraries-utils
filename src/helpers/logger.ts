import { appendFileSync, mkdirSync } from "fs";
import { apiId as generateApiId, uuid } from "./generators";

const LOG_DIR = "storage/logs";
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MASK_KEY = /(password|passwd|secret|token|api[-_]?key|authorization|pin)/i;
const MASKED = "***";
const UNKNOWN_API_ID = "unknown";

const pad = (value: number): string => String(value).padStart(2, "0");

export function logTimestamp(now = new Date()): string {
  const offsetMinutes = -now.getTimezoneOffset();
  const zone = (offsetMinutes >= 0 ? "+" : "-") + pad(Math.floor(Math.abs(offsetMinutes) / 60)) + pad(Math.abs(offsetMinutes) % 60);

  return (
    DAY_NAMES[now.getDay()] + " " +
    MONTH_NAMES[now.getMonth()] + " " +
    now.getDate() + " " +
    pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds()) + " " +
    now.getFullYear() + " " + zone
  );
}

export function logFileName(now = new Date()): string {
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.log`;
}

export function maskValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(maskValue);
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = MASK_KEY.test(key) ? MASKED : maskValue(val);
    }
    return out;
  }
  return value;
}

export function formatBody(body: unknown): string {
  try {
    return JSON.stringify(maskValue(body ?? {})) ?? "{}";
  } catch {
    return "{}";
  }
}

export function writeLog(tipe: string, apiId: string, message: string, destination = LOG_DIR): void {
  const line = `[${logTimestamp()}][${tipe.toUpperCase()}][${apiId || UNKNOWN_API_ID}] ${message.replace(/\s+/g, " ").trim()}`;
  try {
    mkdirSync(destination, { recursive: true });
    appendFileSync(`${destination}/${logFileName()}`, line + "\n");
  } catch {
  }
}

export function requestLog(apiId: string, requestId: string, method: string, path: string, body: unknown): string {
  return `REQ ${method} ${path} id=${requestId} body=${formatBody(body)}`;
}

export function responseLog(apiId: string, requestId: string, method: string, path: string, http: number, durasiMs: number, body: unknown): { tipe: string; message: string } {
  return {
    tipe: http >= 400 ? "WARNING" : "INFO",
    message: `RES ${method} ${path} id=${requestId} http=${http} durasi_ms=${durasiMs} body=${formatBody(body)}`,
  };
}

export function createRequestLogger(destination = LOG_DIR) {
  return (req: any, res: any, next: () => void) => {
    const startedAt = performance.now();
    const requestId = uuid().slice(0, 13);
    const apiId = generateApiId();
    const method = String(req.method ?? "-");
    const path = String(req.path ?? req.url ?? "-");

    res.setHeader("X-Api-Id", apiId);
    req.logContext = { id: requestId, apiId, startedAt };
    writeLog("INFO", apiId, requestLog(apiId, requestId, method, path, req.body), destination);

    const originalJson = res.json.bind(res);
    res.json = (payload: unknown) => {
      res.logBody = payload;
      const durasi = Math.round(performance.now() - startedAt);
      const http = typeof res.statusCode === "number" ? res.statusCode : 0;
      const entry = responseLog(apiId, requestId, method, path, http, durasi, payload);
      writeLog(entry.tipe, apiId, entry.message, destination);
      return originalJson(payload);
    };

    next();
  };
}
