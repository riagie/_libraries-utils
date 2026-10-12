import * as generators from "../helpers/generators";
import * as phone from "../helpers/phone";
import * as httpClient from "../helpers/http_client";
import { parseBody } from "../helpers/validation";
import { respond } from "../helpers/http";
import { RC_SUCCESS, status } from "../helpers/status_codes";
import type { HandlerLike } from "../types/app";
import { GeolocationSchema, PhoneNumberSchema, PpidSchema, UniqueSchema, UuidSchema } from "../types/request";

const ok = (res: any, value: unknown) => respond(res, status(RC_SUCCESS, value));

export const ApiController: Record<string, HandlerLike> = {
  uuid: (req, res) => {
    const body = parseBody(UuidSchema, req, res);
    if (body === null) return;
    return ok(res, generators.uuidVersioned(body));
  },

  secret: (_req, res) => ok(res, generators.secret()),

  refnum: (_req, res) => ok(res, generators.refnum()),

  token: (_req, res) => ok(res, generators.token()),

  apiId: (_req, res) => ok(res, generators.apiId()),

  ppid: (req, res) => {
    const body = parseBody(PpidSchema, req, res);
    if (body === null) return;
    return ok(res, generators.ppid(body.text));
  },

  unique: (req, res) => {
    const body = parseBody(UniqueSchema, req, res);
    if (body === null) return;
    return ok(res, generators.unique(body.character ?? "A", body.length ?? 6));
  },

  phoneNumber: (req, res) => {
    const body = parseBody(PhoneNumberSchema, req, res);
    if (body === null) return;
    return ok(res, phone.phoneNumber(body.phone, body.country ? body.country : "ID"));
  },

  geolocation: async (req, res) => {
    const body = parseBody(GeolocationSchema, req, res);
    if (body === null) return;
    return ok(res, await httpClient.geolocation(body.ip));
  },
};
