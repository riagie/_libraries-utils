import { describe, expect, test } from "bun:test";
import { phoneNumber } from "../src/helpers/phone";

describe("phoneNumber", () => {
  test("nomor Indonesia valid", () => {
    const result: any = phoneNumber("081323456789", "ID");
    expect(result.regionCode).toBe("ID");
    expect(result.countryCode).toBe(62);
    expect(result.number).toBe("81323456789");
    expect(result.validNumber).toBe(true);
    expect(result.possibleNumber).toBe(true);
    expect(result.numberType).toBe("Mobile");
  });
});
