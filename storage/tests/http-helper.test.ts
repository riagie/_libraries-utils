import { describe, expect, test } from "bun:test";
import { setHeaders, setOpts } from "../../src/helpers/http_client";

describe("http helper", () => {
  test("setHeaders membangun header cache + ua", () => {
    const config: any = setHeaders({ headers: {} }, { "Accept-Encoding": "gzip" }, 30);
    expect(config.userAgent).toContain("Firefox/97.0");
    expect(config.headers["Cache-Control"]).toBe("private, max-age=30");
    expect(config.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    expect(config.headers["Accept-Encoding"]).toBe("gzip");
    expect(config.headers["Expires"]).toMatch(/GMT$/);
  });

  test("setOpts default + override konstanta", () => {
    const config: any = setOpts({ headers: {} }, { CURLOPT_ENCODING: "gzip" });
    expect(config.followLocation).toBe(true);
    expect(config.encoding).toBe("gzip");
    expect(config.timeout).toBe(30);
    expect(config.connectTimeout).toBe(60);
    expect(config.cookieJar).toMatch(/^logs\/\d{8}-cookie\.txt$/);
  });

  test("setOpts konstanta tak dikenal melempar error", () => {
    expect(() => setOpts({ headers: {} }, { CURLOPT_TIDAK_ADA: "x" })).toThrow("Undefined constant");
  });
});
