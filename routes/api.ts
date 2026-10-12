import type { Moro } from "@morojs/moro";
import { Env } from "../src/config/config";
import { respond } from "../src/helpers/http";
import { RC_INTERNAL_ERROR, RC_INVALID_REQUEST, RC_SUCCESS, status } from "../src/helpers/status_codes";
import { ApiController } from "../src/controllers/api";
import { createRequestLogger } from "../src/helpers/logger";

export async function registerRoutes(app: Moro) {
  await app.use(createRequestLogger());

  app.get("/").handler((_req: any, res: any) => {
    respond(res, status(RC_SUCCESS, { status: "ok", name: Env.NAME, env: Env.ENV }));
  });

  app.group("/api/v1", (group) => {
    group.post("/uuid").handler(ApiController.uuid);
    group.post("/secret").handler(ApiController.secret);
    group.post("/refnum").handler(ApiController.refnum);
    group.post("/token").handler(ApiController.token);
    group.post("/api-id").handler(ApiController.apiId);

    group.post("/ppid").handler(ApiController.ppid);
    group.post("/unique").handler(ApiController.unique);
    group.post("/phone-number").handler(ApiController.phoneNumber);
    group.post("/geolocation").handler(ApiController.geolocation);
  });

  app.setErrorHandler((err: any, _req: any, res: any) => {
    if (res?.headersSent) {
      return;
    }
    if (err instanceof SyntaxError) {
      respond(res, status(RC_INVALID_REQUEST));
      return;
    }
    console.error(err);
    respond(res, status(RC_INTERNAL_ERROR));
  });
}
