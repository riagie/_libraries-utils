import { describe, expect, test } from "bun:test";
import { z } from "zod";
import { RC_INTERNAL_ERROR, RC_INVALID_REQUEST, RC_SUCCESS, status } from "../src/helpers/status_codes";
import { respond } from "../src/helpers/http";
import { parseBody } from "../src/helpers/validation";

function mockRes() {
  const calls: { statusCode?: number; body?: unknown } = {};
  const res: any = {
    headersSent: false,
    status(code: number) {
      calls.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      calls.body = payload;
      return res;
    },
  };
  return { res, calls };
}

describe("format respon engine", () => {
  test("status varchar -> http int + RCM resmi", () => {
    expect(status("0200")).toEqual({ http: 200, message: "SUCCESS" });
    expect(status("0200", "E1JL")).toEqual({ http: 200, message: "SUCCESS", data: "E1JL" });
    expect(status("0500")).toEqual({ http: 500, message: "INTERNAL SERVER ERROR" });
    expect(status("0429")).toEqual({ http: 429, message: "TOO MANY REQUESTS PLEASE TRY AGAIN LATER" });
  });

  test("kode 0000 dipetakan ke 0500 (aturan kanon)", () => {
    expect(status("0000")).toEqual({ http: 500, message: "INTERNAL SERVER ERROR" });
  });

  test("kode tak dikenal -> unknown status code", () => {
    expect(status("0777")).toEqual({ http: 777, message: "unknown status code" });
  });

  test("respond sukses -> data saja", () => {
    const { res, calls } = mockRes();
    respond(res, status("0200", "E1JL7J341HGV4LTLRDBWAVMGKVL5XJYO"));
    expect(calls.statusCode).toBe(200);
    expect(calls.body).toEqual({ data: "E1JL7J341HGV4LTLRDBWAVMGKVL5XJYO" });
  });

  test("respond gagal -> message saja", () => {
    const { res, calls } = mockRes();
    respond(res, status("0500"));
    expect(calls.statusCode).toBe(500);
    expect(calls.body).toEqual({ message: "INTERNAL SERVER ERROR" });
  });

  test("parseBody gagal -> 0400 INVALID REQUEST PARAMETER", () => {
    const { res, calls } = mockRes();
    const schema = z.object({ text: z.string() });
    expect(parseBody(schema, { body: {} }, res)).toBeNull();
    expect(calls.statusCode).toBe(400);
    expect(calls.body).toEqual({ message: "INVALID REQUEST PARAMETER" });
  });

  test("body kosong/whitespace -> dianggap objek kosong", () => {
    const optional = z.object({ version: z.number().int().optional() });
    for (const raw of [undefined, null, "", "   ", "\n"]) {
      const { res } = mockRes();
      expect(parseBody(optional, { body: raw }, res)).toEqual({});
    }
    const { res, calls } = mockRes();
    const required = z.object({ text: z.string() });
    expect(parseBody(required, { body: "\n" }, res)).toBeNull();
    expect(calls.statusCode).toBe(400);
  });

  test("parseBody sukses -> data tervalidasi tanpa respon", () => {
    const { res, calls } = mockRes();
    const schema = z.object({ text: z.string() });
    expect(parseBody(schema, { body: { text: "X" } }, res)).toEqual({ text: "X" });
    expect(calls.body).toBeUndefined();
  });

  test("konstanta RC inti", () => {
    expect(RC_SUCCESS).toBe("0200");
    expect(RC_INVALID_REQUEST).toBe("0400");
    expect(RC_INTERNAL_ERROR).toBe("0500");
  });
});
