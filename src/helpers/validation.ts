import type { z } from "zod";
import { respond } from "./http";
import { RC_INVALID_REQUEST, status } from "./status_codes";

function isEmptyBody(raw: unknown): boolean {
  return raw === undefined || raw === null || (typeof raw === "string" && raw.trim() === "");
}

export function parseBody<S extends z.ZodTypeAny>(schema: S, req: any, res: any): z.infer<S> | null {
  const raw = req.body;
  const parsed = schema.safeParse(isEmptyBody(raw) ? {} : raw);
  if (!parsed.success) {
    respond(res, status(RC_INVALID_REQUEST));
    return null;
  }
  return parsed.data;
}
