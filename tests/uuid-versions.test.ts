import { describe, expect, test } from "bun:test";
import { uuid3, uuidVersioned } from "../src/helpers/generators";
import { UuidSchema } from "../src/types/request";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const UUID_VERSIONED = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("uuid multi-versi", () => {
  test("tanpa body default v4", () => {
    expect(uuidVersioned()).toMatch(UUID_V4);
    expect(uuidVersioned({})).toMatch(UUID_V4);
  });

  test("v1 time-based + node", () => {
    const value = uuidVersioned({ version: 1, node: "aabbccddeeff" });
    expect(value).toMatch(UUID_VERSIONED);
    expect(value.split("-")[2][0]).toBe("1");
    expect(value.endsWith("aabbccddeeff")).toBe(true);
  });

  test("v2 DCE: id di time_low, domain di clock_seq_hi", () => {
    const value = uuidVersioned({ version: 2, domain: "person", id: 1000 });
    expect(value).toMatch(UUID_VERSIONED);
    expect(value.split("-")[2][0]).toBe("2");
    expect(value.startsWith("000003e8-")).toBe(true);
    const clockSeqHi = parseInt(value.split("-")[3].slice(0, 2), 16);
    expect(clockSeqHi & 0xc0).toBe(0x80);
    expect(clockSeqHi & 0x3f).toBe(0);
  });

  test("v3 deterministik + vector resmi dns", () => {
    const value = uuidVersioned({ version: 3, namespace: "dns", name: "python.org" });
    expect(value).toBe(uuid3("dns", "python.org"));
    expect(value).toBe("6fa459ea-ee8a-3ca4-894e-db77e160355e");
  });

  test("v3 namespace UUID custom deterministik", () => {
    const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
    const value = uuid3(namespace, "hello");
    expect(value).toBe(uuid3(namespace, "hello"));
    expect(value).not.toBe(uuid3(namespace, "world"));
    expect(value.split("-")[2][0]).toBe("3");
  });

  test("UuidSchema validasi silang versi", () => {
    expect(UuidSchema.safeParse({}).success).toBe(true);
    expect(UuidSchema.safeParse({ version: 9 }).success).toBe(false);
    expect(UuidSchema.safeParse({ version: 3 }).success).toBe(false);
    expect(UuidSchema.safeParse({ version: 3, namespace: "bukan-ns", name: "x" }).success).toBe(false);
    expect(UuidSchema.safeParse({ version: 3, namespace: "dns", name: "x" }).success).toBe(true);
    expect(UuidSchema.safeParse({ version: 2, domain: "person" }).success).toBe(false);
    expect(UuidSchema.safeParse({ version: 2, domain: "person", id: 1000 }).success).toBe(true);
  });
});
