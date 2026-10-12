const toNum = (value: string | undefined, fallback: number): number => {
  const parsed = parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const Env = {
  TYPE: process.env.TYPE ?? "engine",
  ENV: process.env.ENV ?? "development",
  NAME: process.env.NAME ?? "libraries-utils",
  HOST: process.env.HOST ?? "0.0.0.0",
  PORT: toNum(process.env.PORT, 30150),
  TIMEOUT: toNum(process.env.TIMEOUT, 60),
} as const;
