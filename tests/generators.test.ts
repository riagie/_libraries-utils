import { describe, expect, test } from "bun:test";
import { uuid, secret, refnum, token, apiId, ppid, unique } from "../src/helpers/generators";

describe("kontrak generator identifier", () => {
  test("uuid 36 char format v4", () => {
    const value = uuid();
    expect(value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(value.length).toBe(36);
  });

  test("secret 32 char lowercase alfanumerik", () => {
    const value = secret();
    expect(value).toMatch(/^[a-z0-9]{32}$/);
  });

  test("refnum 32 char uppercase alfanumerik", () => {
    const value = refnum();
    expect(value).toMatch(/^[A-Z0-9]{32}$/);
  });

  test("token 28 char mixedcase alfanumerik", () => {
    const value = token();
    expect(value).toMatch(/^[A-Za-z0-9]{28}$/);
  });

  test("apiId prefix api- + 10 digit", () => {
    const value = apiId();
    expect(value).toMatch(/^api-\d{10}$/);
  });

  test("ppid 16 char dari input", () => {
    const value = ppid("DUMMY NAME");
    expect(value).toMatch(/^[A-Z0-9]{16}$/);
    expect(value.startsWith("D")).toBe(true);
  });

  test("ppid input pendek dipad digit sampai 16", () => {
    const value = ppid("A");
    expect(value).toMatch(/^[A-Z0-9]{16}$/);
  });

  test("unique prefix indeks alfabet + digit", () => {
    const value = unique("D", 6);
    expect(value).toMatch(/^3\d{5}$/);
  });
});
