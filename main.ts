import { createApp } from "@morojs/moro";
import { Env } from "./src/config/config";
import { registerRoutes } from "./routes/api";

const app = await createApp({
  cors: {
    enabled: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Api-Id"],
    maxAge: 86400,
  },
  helmet: true,
});

app.enableDocs({
  title: Env.NAME,
  version: "1.0.0",
  description: "Service generator identifier & util umum (_libraries-utils)",
  basePath: "/docs",
});

registerRoutes(app);

app.listen(Env.PORT, Env.HOST, () => {
  console.log(`${Env.NAME} listening on http://${Env.HOST}:${Env.PORT}`);
});
