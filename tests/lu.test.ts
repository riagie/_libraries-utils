import { describe, expect, test } from "bun:test";
import { ApiController } from "../src/controllers/api";
import { buildLu } from "../src/helpers/lu";
import { LuSchema } from "../src/types/request";

const UUID_FORMAT =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

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

function validInput() {
  return {
    name: "sample-base",
    unitPath: "_libraries/_libraries-utils",
    version: "1.0.0",
    baseUrl: "http://127.0.0.1:30150",
    folders: [
      {
        name: "Generator",
        requests: [
          { name: "refnum", path: "/api/v1/refnum" },
          { name: "ppid", path: "/api/v1/ppid", body: { text: "DUMMY NAME" } },
        ],
      },
    ],
    requests: [{ name: "info", method: "GET" as const, path: "/" }],
  };
}

describe("kontrak body LU (validasi 0400)", () => {
  test("body valid diterima", () => {
    expect(LuSchema.safeParse(validInput()).success).toBe(true);
  });

  test("unitPath: satu segmen valid; segmen bebas karakter @ dan :", () => {
    expect(
      LuSchema.safeParse({ ...validInput(), unitPath: "@127.0.0.1:2002" })
        .success,
    ).toBe(true);
  });

  test("tanpa unitPath / segmen kosong -> gagal", () => {
    const input = validInput();
    delete (input as Record<string, unknown>).unitPath;
    expect(LuSchema.safeParse(input).success).toBe(false);
    expect(
      LuSchema.safeParse({ ...validInput(), unitPath: "a//b" }).success,
    ).toBe(false);
    expect(LuSchema.safeParse({ ...validInput(), unitPath: "/" }).success).toBe(
      false,
    );
  });

  test("tanpa name -> gagal", () => {
    const input = validInput();
    delete (input as Record<string, unknown>).name;
    expect(LuSchema.safeParse(input).success).toBe(false);
  });

  test("baseUrl bukan URL -> gagal", () => {
    expect(
      LuSchema.safeParse({ ...validInput(), baseUrl: "127.0.0.1:30150" })
        .success,
    ).toBe(false);
  });

  test("tanpa requests & folders -> gagal (minimal satu item)", () => {
    const input = validInput();
    delete (input as Record<string, unknown>).folders;
    delete (input as Record<string, unknown>).requests;
    expect(LuSchema.safeParse(input).success).toBe(false);
  });

  test("folder tanpa requests -> gagal", () => {
    const input = validInput();
    input.folders = [{ name: "kosong", requests: [] }];
    expect(LuSchema.safeParse(input).success).toBe(false);
  });

  test("method di luar daftar -> gagal", () => {
    const input = validInput();
    input.requests = [{ name: "x", method: "TRACE" as never, path: "/" }];
    expect(LuSchema.safeParse(input).success).toBe(false);
  });
});

describe("generator koleksi LU", () => {
  test("collection: info.name breadcrumb, schema v2.1, _postman_id UUID, TANPA variable", () => {
    const { collection } = buildLu({
      ...validInput(),
      description: "contoh koleksi",
    });

    const info = (collection as Record<string, any>).info;
    expect(info.schema).toBe(
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    );
    expect(info.name).toBe("sample-base > _libraries > _libraries-utils");
    expect(info.version).toBe("1.0.0");
    expect(info.description).toBe("contoh koleksi");
    expect(String(info._postman_id)).toMatch(UUID_FORMAT);
    expect((collection as Record<string, any>).variable).toBeUndefined();
  });

  test("unitPath TIDAK menjadi folder — endpoint langsung di item koleksi", () => {
    const { collection } = buildLu(validInput());
    const items = (collection as Record<string, any>).item;

    expect(items).toHaveLength(2);
    expect(items[0].name).toBe("Generator");
    expect(items[0].item).toHaveLength(2);
    expect(items[0].item[0].request.url.path).toEqual(["api", "v1", "refnum"]);
    expect(items[0].item[1].name).toBe("ppid");
    expect(items[1].name).toBe("info");
    expect(items[1].request.method).toBe("GET");
  });

  test("request tanpa method -> default POST; setiap item punya response kosong", () => {
    const { collection } = buildLu(validInput());
    const items = (collection as Record<string, any>).item;

    expect(items[0].item[0].request.method).toBe("POST");
    expect(items[0].item[0].response).toEqual([]);
  });

  test("url object: baseUrl & port variabel TERPISAH saat baseUrl ada portnya", () => {
    const { collection } = buildLu(validInput());
    const url = (collection as Record<string, any>).item[0].item[0].request.url;

    expect(url.raw).toBe("{{baseUrl}}:{{port}}/api/v1/refnum");
    expect(url.host).toEqual(["{{baseUrl}}:{{port}}"]);
    expect(url.protocol).toBeUndefined();
    expect(url.port).toBeUndefined();
    expect(url.path).toEqual(["api", "v1", "refnum"]);
  });

  test("url object: tanpa variabel port saat baseUrl tanpa port", () => {
    const { collection } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "https://api.example.com",
      requests: [
        {
          name: "cari",
          method: "GET",
          path: "/v1/products",
          query: [{ key: "page", value: "2" }],
        },
      ],
    });
    const url = (collection as Record<string, any>).item[0].request.url;

    expect(url.raw).toBe("{{baseUrl}}/v1/products?page=2");
    expect(url.host).toEqual(["{{baseUrl}}"]);
    expect(url.query).toEqual([{ key: "page", value: "2" }]);
  });

  test("body object -> nilai string jadi variabel env (quoted) + Content-Type default", () => {
    const { collection, environment } = buildLu(validInput());
    const ppid = (collection as Record<string, any>).item[0].item[1].request;

    expect(ppid.body.mode).toBe("raw");
    expect(JSON.parse(ppid.body.raw)).toEqual({ text: "{{ppid_text}}" });
    expect(ppid.body.options).toEqual({ raw: { language: "json" } });
    expect(ppid.header).toEqual([
      { key: "Content-Type", value: "application/json" },
    ]);
    expect(environment.values).toContainEqual({
      key: "ppid_text",
      value: "DUMMY NAME",
      enabled: true,
    });
  });

  test("body angka/boolean -> variabel TANPA quote (tipe JSON terjaga)", () => {
    const { collection, environment } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "http://127.0.0.1:1",
      requests: [{ name: "uuid", path: "/x", body: { version: 4 } }],
    });
    const raw = (collection as Record<string, any>).item[0].request.body.raw;

    expect(raw).toBe('{\n  "version": {{uuid_version}}\n}');
    expect(environment.values).toContainEqual({
      key: "uuid_version",
      value: "4",
      enabled: true,
    });
  });

  test("body string (raw) -> dibiarkan apa adanya, tanpa variabel", () => {
    const { collection } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "http://127.0.0.1:1",
      requests: [
        {
          name: "raw",
          path: "/x",
          headers: [{ key: "Content-Type", value: "text/plain" }],
          body: "halo",
        },
      ],
    });
    const req = (collection as Record<string, any>).item[0].request;

    expect(req.body.raw).toBe("halo");
    expect(req.header).toEqual([{ key: "Content-Type", value: "text/plain" }]);
  });

  test("tanpa body -> tanpa key body & tanpa Content-Type", () => {
    const { collection } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "http://127.0.0.1:1",
      requests: [{ name: "x", path: "/x" }],
    });
    const req = (collection as Record<string, any>).item[0].request;

    expect(req.body).toBeUndefined();
    expect(req.header).toEqual([]);
  });

  test("description request & folder ikut tersimpan", () => {
    const { collection } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "http://127.0.0.1:1",
      folders: [
        {
          name: "f",
          description: "folder deskripsi",
          requests: [{ name: "x", path: "/x", description: "req deskripsi" }],
        },
      ],
    });
    const folder = (collection as Record<string, any>).item[0];

    expect(folder.description).toBe("folder deskripsi");
    expect(folder.item[0].request.description).toBe("req deskripsi");
  });
});

describe("environment LU (terpisah dari collection)", () => {
  test("nama = segmen terakhir name (setelah :) + ': ' + segmen terakhir unitPath, UPPERCASE", () => {
    const { environment } = buildLu({
      ...validInput(),
      name: "@127.0.0.1:2002",
    });

    expect(environment.name).toBe("2002: _LIBRARIES-UTILS");
    expect(environment._postman_variable_scope).toBe("environment");
  });

  test("isi: baseUrl (protocol+host tanpa port), port terpisah, variabel body; tanpa key variable di collection", () => {
    const { collection, environment } = buildLu(validInput());
    const values = (environment as Record<string, any>).values;
    const keys = values.map((v: any) => v.key);

    expect(keys[0]).toBe("baseUrl");
    expect(values[0].value).toBe("http://127.0.0.1");
    expect(keys[1]).toBe("port");
    expect(values[1].value).toBe("30150");
    expect(keys).toContain("ppid_text");
    for (const value of values) {
      expect(value.enabled).toBe(true);
    }
    expect((collection as Record<string, any>).variable).toBeUndefined();
  });

  test("baseUrl tanpa port -> tanpa variabel port; variables user digabung (baseUrl/port user diabaikan)", () => {
    const { environment } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "https://api.example.com",
      variables: [
        { key: "baseUrl", value: "http://diabaikan" },
        { key: "port", value: "9999" },
        { key: "api_key", value: "DUMMY" },
      ],
      requests: [{ name: "x", path: "/x" }],
    });
    const values = (environment as Record<string, any>).values;
    const keys = values.map((v: any) => v.key);

    expect(keys).toEqual(["baseUrl", "api_key"]);
    expect(values[0].value).toBe("https://api.example.com");
    expect(values[1].value).toBe("DUMMY");
  });

  test("nama variabel body unik (sanitasi + suffix angka)", () => {
    const { environment } = buildLu({
      name: "s",
      unitPath: "unit",
      baseUrl: "http://127.0.0.1:1",
      folders: [
        {
          name: "f",
          requests: [
            { name: "Info & Health", path: "/a", body: { text: "A" } },
            { name: "info & health", path: "/b", body: { text: "B" } },
          ],
        },
      ],
    });
    const keys = (environment as Record<string, any>).values.map(
      (v: any) => v.key,
    );

    expect(keys).toEqual([
      "baseUrl",
      "port",
      "info_health_text",
      "info_health_text_2",
    ]);
    expect((environment as Record<string, any>).values[2].value).toBe("A");
    expect((environment as Record<string, any>).values[3].value).toBe("B");
  });
});

describe("endpoint POST /api/v1/lu", () => {
  test("sukses -> envelope 0200 data { collection, environment }", async () => {
    const { res, calls } = mockRes();
    await ApiController.lu({ body: validInput() }, res);
    const body = calls.body as Record<string, any>;

    expect(calls.statusCode).toBe(200);
    expect(body.data.collection.info.name).toBe(
      "sample-base > _libraries > _libraries-utils",
    );
    expect(body.data.collection.info.schema).toContain("/collection/v2.1.0/");
    expect(body.data.collection.item[0].name).toBe("Generator");
    expect(body.data.environment.name).toBe("SAMPLE-BASE: _LIBRARIES-UTILS");
  });

  test("body tidak valid -> 0400 INVALID REQUEST PARAMETER", async () => {
    const { res, calls } = mockRes();
    await ApiController.lu({ body: { name: "s" } }, res);

    expect(calls.statusCode).toBe(400);
    expect(calls.body).toEqual({ message: "INVALID REQUEST PARAMETER" });
  });
});
