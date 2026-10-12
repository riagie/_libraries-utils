import type { ApiResponse, HttpResponseLike } from "../types/app";

export function respond(res: HttpResponseLike, envelope: ApiResponse): void {
  const payload: Record<string, unknown> =
    envelope.http === 200 ? { data: envelope.data ?? null } : { message: envelope.message };

  (res as any).logBody = payload;
  res.status(envelope.http).json(payload);
}
