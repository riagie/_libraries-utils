import { randomUUID, getRandomValues, randomBytes } from "crypto";
import { v1 as uuidV1, v3 as uuidV3, validate as isUuidString } from "uuid";

const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const DIGITS = "0123456789";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const SECRET_LENGTH = 32;
const REFNUM_LENGTH = 32;
const TOKEN_LENGTH = 28;
const API_ID_DIGITS = 10;
const PPID_LENGTH = 16;

const UUID_NAMESPACES: Record<string, string> = {
  dns: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  url: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  oid: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
  x500: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
};

const UUID_V2_DOMAINS: Record<string, number> = {
  person: 0,
  group: 1,
  org: 2,
  domain: 3,
};

const UUID_V2_TIMESTAMP_OFFSET_100NS = 122192928000000000;

function randomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  do {
    getRandomValues(buffer);
  } while (buffer[0] >= limit);
  return buffer[0] % max;
}

function randomString(length: number, alphabet: string): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet.charAt(randomInt(alphabet.length));
  }
  return out;
}

function shuffle(input: string): string {
  const chars = input.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function formatUuidBytes(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function uuid(): string {
  return randomUUID();
}

export function uuid1(node?: string, msecs?: number): string {
  const options: { node?: Uint8Array; msecs?: number } = {};
  if (node) {
    options.node = hexToBytes(node);
  }
  if (typeof msecs === "number") {
    options.msecs = msecs;
  }
  return uuidV1(options);
}

export function uuid2(input: { domain: string; id: number; node?: string; msecs?: number }): string {
  const domainBits = UUID_V2_DOMAINS[String(input.domain).toLowerCase()];
  if (domainBits === undefined) {
    throw new Error("Unknown uuid2 domain: " + input.domain);
  }

  const localId = Number(input.id) >>> 0;
  const msecs = typeof input.msecs === "number" ? input.msecs : Date.now();
  const timestamp100ns = msecs * 10000 + UUID_V2_TIMESTAMP_OFFSET_100NS;

  const bytes = new Uint8Array(16);
  bytes[0] = (localId >>> 24) & 0xff;
  bytes[1] = (localId >>> 16) & 0xff;
  bytes[2] = (localId >>> 8) & 0xff;
  bytes[3] = localId & 0xff;
  bytes[4] = Math.floor(timestamp100ns / 2 ** 32) & 0xff;
  bytes[5] = Math.floor(timestamp100ns / 2 ** 40) & 0xff;
  bytes[6] = 0x20 | (Math.floor(timestamp100ns / 2 ** 56) & 0x0f);
  bytes[7] = Math.floor(timestamp100ns / 2 ** 48) & 0xff;
  bytes[8] = 0x80 | domainBits;
  bytes[9] = randomInt(256);
  const nodeHex = input.node ? String(input.node) : randomBytes(6).toString("hex");
  bytes.set(hexToBytes(nodeHex), 10);

  return formatUuidBytes(bytes);
}

export function uuid3(namespace: string, name: string): string {
  const key = String(namespace).toLowerCase();
  const resolvedNamespace = UUID_NAMESPACES[key] ?? (isUuidString(String(namespace)) ? String(namespace) : "");
  if (!resolvedNamespace) {
    throw new Error("Unknown uuid3 namespace: " + namespace);
  }
  return uuidV3(String(name), resolvedNamespace);
}

export interface UuidVersionedOptions {
  version?: number;
  namespace?: string;
  name?: string;
  domain?: string;
  id?: number;
  node?: string;
  msecs?: number;
}

export function uuidVersioned(options: UuidVersionedOptions = {}): string {
  const version = options.version ?? 4;
  if (version === 1) {
    return uuid1(options.node, options.msecs);
  }
  if (version === 2) {
    return uuid2({
      domain: String(options.domain ?? ""),
      id: Number(options.id ?? 0),
      node: options.node,
      msecs: options.msecs,
    });
  }
  if (version === 3) {
    return uuid3(String(options.namespace ?? ""), String(options.name ?? ""));
  }
  return uuid();
}

export function secret(): string {
  return randomString(SECRET_LENGTH, ALPHANUM).toLowerCase();
}

export function refnum(): string {
  return randomString(REFNUM_LENGTH, ALPHANUM).toUpperCase();
}

export function token(): string {
  return randomString(TOKEN_LENGTH, ALPHANUM);
}

export function apiId(): string {
  return "api-" + randomString(API_ID_DIGITS, DIGITS);
}

export function ppid(text: string): string {
  const cleaned = String(text ?? "").replace(/[^A-Za-z0-9 ]/g, "").replace(/\s+/g, "");

  const headLength = Math.ceil(cleaned.length / 12);
  const tailLength = Math.ceil(cleaned.length / 16);
  const midLength = PPID_LENGTH - (headLength + tailLength);

  const head = cleaned.slice(0, headLength);
  const tail = cleaned.slice(-tailLength);
  const middle = midLength !== 0 ? shuffle(cleaned).slice(0, midLength) : "";

  let result = (head + middle + tail).toUpperCase();
  if (result.length < PPID_LENGTH) {
    result += randomString(PPID_LENGTH - result.length, DIGITS);
  }

  return result;
}

export function unique(character = "A", length = 6): string {
  const firstChar = String(character).toUpperCase().charAt(0);
  const alphabetIndex = UPPERCASE.indexOf(firstChar);
  const indexDigit = String(alphabetIndex).slice(-1);

  let suffix = "";
  for (let i = 1; i < length; i++) {
    suffix += String(randomInt(10));
  }

  return indexDigit + suffix;
}
