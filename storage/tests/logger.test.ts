import { describe, expect, test } from "bun:test";
import { mkdirSync, readFileSync, rmSync } from "fs";
import {
  createRequestLogger,
  formatBody,
  logFileName,
  logTimestamp,
  maskValue,
  responseLog,
  writeLog,
} from "../../src/helpers/logger";

const TMP = "storage/logs/.test-tmp";

function reset() {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });
}

function readLog(): string[] {
  return readFileSync(`${TMP}/${logFileName(new Date("2026-10-12T10:00:00"))}`, "utf-8").trim().split("\n");
}

describe("format log engine", () => {
  test("timestamp sesuai format 3 segmen LOGS.md", () => {
    const stamp = logTimestamp(new Date(2026, 9, 12, 14, 20, 29));
    expect(stamp).toMatch(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{2}:\d{2}:\d{2} \d{4} [+-]\d{4}$/);
    expect(stamp).toContain("Oct 12");
  });

  test("nama file rotasi harian YYYYMMDD.log", () => {
    expect(logFileName(new Date(2026, 9, 12))).toBe("20261012.log");
  });

  test("maskValue menyamarkan kredensial", () => {
    const masked: any = maskValue({ password: "x", token: "y", apiKey: "z", name: "DUMMY" });
    expect(masked.password).toBe("***");
    expect(masked.token).toBe("***");
    expect(masked.apiKey).toBe("***");
    expect(masked.name).toBe("DUMMY");
    const nested: any = maskValue({ body: { pin: "123", keep: 1 } });
    expect(nested.body.pin).toBe("***");
    expect(nested.body.keep).toBe(1);
  });

  test("formatBody JSON satu baris", () => {
    expect(formatBody({ a: 1, b: "x" })).toBe('{"a":1,"b":"x"}');
    expect(formatBody(undefined)).toBe("{}");
  });

  test("writeLog menulis baris [timestamp][TIPE][api-id] + whitespace dipadatkan", () => {
    reset();
    writeLog("info", "api-3920498356", "REQ  POST   /api/v1/refnum  id=x  body={}", TMP);
    const lines = readLog();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatch(/^\[(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{2}:\d{2}:\d{2} \d{4} [+-]\d{4}\]\[INFO\]\[api-3920498356\] REQ POST \/api\/v1\/refnum id=x body=\{\}$/);
  });

  test("api-id kosong -> unknown", () => {
    reset();
    writeLog("INFO", "", "cek", TMP);
    expect(readLog()[0]).toContain("][unknown] cek");
  });

  test("responseLog: http >= 400 -> WARNING, normal -> INFO", () => {
    expect(responseLog("api-1", "abc-def", "POST", "/x", 200, 12, {}).tipe).toBe("INFO");
    const gagal = responseLog("api-1", "abc-def", "POST", "/x", 400, 3, { message: "INVALID REQUEST PARAMETER" });
    expect(gagal.tipe).toBe("WARNING");
    expect(gagal.message).toContain("http=400");
    expect(gagal.message).toContain("durasi_ms=3");
    expect(gagal.message).toContain("INVALID REQUEST PARAMETER");
  });

  test("middleware createRequestLogger menulis pasangan REQ/RES + header respon X-Api-Id", () => {
    reset();
    const middleware = createRequestLogger(TMP);
    const bodies: unknown[] = [];
    const req: any = { method: "POST", path: "/api/v1/refnum", headers: {}, body: {} };
    const res: any = {
      statusCode: 200,
      headers: {} as Record<string, string>,
      setHeader(name: string, value: string) {
        res.headers[name] = value;
        return res;
      },
      json(payload: unknown) {
        bodies.push(payload);
        return res;
      },
    };
    let nextCalled = false;
    middleware(req, res, () => {
      nextCalled = true;
    });
    expect(nextCalled).toBe(true);
    expect(req.logContext.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}$/);
    expect(res.headers["X-Api-Id"]).toMatch(/^api-\d{10}$/);
    res.json({ data: "E1JL" });
    expect(bodies).toEqual([{ data: "E1JL" }]);
    const lines = readLog();
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain(`[INFO][${res.headers["X-Api-Id"]}] REQ POST /api/v1/refnum`);
    expect(lines[1]).toMatch(/\[INFO\]\[api-\d{10}\] RES POST \/api\/v1\/refnum id=.+ http=200 durasi_ms=\d+ body=\{"data":"E1JL"\}/);
  });

  test("middleware createRequestLogger: header request X-Api-Id diabaikan + respon >= 400 -> WARNING", () => {
    reset();
    const middleware = createRequestLogger(TMP);
    const req: any = { method: "POST", path: "/api/v1/ppid", headers: { "x-api-id": "api-9999999999" }, body: {} };
    const res: any = {
      statusCode: 400,
      headers: {} as Record<string, string>,
      setHeader(name: string, value: string) {
        res.headers[name] = value;
        return res;
      },
      json() { return res; },
    };
    middleware(req, res, () => {});
    res.json({ message: "INVALID REQUEST PARAMETER" });
    const lines = readLog();
    expect(lines[0]).toMatch(/\[api-\d{10}\] REQ/);
    expect(lines[0]).not.toContain("api-9999999999");
    expect(res.headers["X-Api-Id"]).toMatch(/^api-\d{10}$/);
    expect(res.headers["X-Api-Id"]).not.toBe("api-9999999999");
    expect(lines[1]).toContain("[WARNING]");
    expect(lines[1]).toContain(`[${res.headers["X-Api-Id"]}]`);
  });
});
