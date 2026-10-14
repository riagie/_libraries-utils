# _libraries-utils — Engine REST Generator Identifier (AKTIF)

Engine service generator identifier (ADR-045). Identitas env: `TYPE=engine`,
`NAME=libraries-utils` (mengikuti nama unit). Pemanggil: unit internal (app, api, service
pendukung) lintas bahasa — **bukan untuk pihak luar**. Implementasi lama (library) sudah
dipensiunkan — acuan parity via git history commit awal unit (ADR-052).

## Prinsip: Terpusat vs Lokal (ADR-047/050)

Pemanggil beragam bahasa — engine hanya melayani fungsi yang **wajib identik lintas bahasa**
atau **butuh dependensi/egres terpusat**. Fungsi lain dihitung **native di app masing-masing**;
kode porting tanpa endpoint TIDAK dibawa ke runtime (ADR-050) — acuannya arsip `reference/`:

| Grup | Fungsi | Penempatan |
|------|--------|------------|
| Kontrak identifier | `uuid, secret, refnum, token, apiId, ppid, unique` | **ENGINE** — format dijaga 1 sumber kebenaran (ADR-LIB-001) |
| Dependensi berat | `phoneNumber` | **ENGINE** — lib + data carrier tak perlu di-shipping tiap app |
| Egres eksternal | `geolocation` | **ENGINE** — call keluar + rate limit terpusat |
| Kontrak format koleksi | `lu` — generator file koleksi endpoint (aturan: `_docs/LU.md`) | **ENGINE** — format koleksi dijaga 1 sumber kebenaran (ADR-056) |
| Waktu & format | `setStartTime, getElapsedTime, setExpired, Object, Json, Xml, Text, Debug` | **LOKAL** — native di bahasa masing-masing; tanpa endpoint |
| Konteks request | `clientIp, clientBrowser` | **LOKAL** — data asal ada di pemanggil; parser native |
| Konteks proses | `getEnv, loadFile, database` | **INTERNAL-ONLY** — konteks proses tak bisa dibawa lewat HTTP (salah konteks) |
| Standar HTTP internal | `setHeaders, setOpts` | internal engine (helper `geolocation`) |

## Endpoint (10 + info root)

Base: `http://{HOST}:{PORT}` (default `http://127.0.0.1:30150`) — format respon lihat
section **Format Respon**; path tak dikenal → 404 bentuk framework (satu-satunya
pengecualian, ADR-054).

| Method | Path | Fungsi | Body |
|--------|------|--------|------|
| GET | `/` | info & health service (`status`, `name`, `env`) | — |
| POST | `/api/v1/uuid` | `uuid()` — multi-versi, lihat **Versi UUID** | opsional, tanpa body = v4 |
| POST | `/api/v1/secret` | `secret()` — 32 char lowercase | — |
| POST | `/api/v1/refnum` | `refnum()` — 32 char uppercase | — |
| POST | `/api/v1/token` | `token()` — 28 char mixedcase | — |
| POST | `/api/v1/api-id` | `apiId()` — `api-` + 10 digit | — |
| POST | `/api/v1/ppid` | `ppid()` — 16 char alfanumerik | `{"text": "DUMMY NAME"}` |
| POST | `/api/v1/unique` | `unique()` — prefix indeks alfabet + digit | `{"character": "D", "length": 6}` (opsional) |
| POST | `/api/v1/phone-number` | `phoneNumber()` | `{"phone": "081323456789", "country": "ID"}` |
| POST | `/api/v1/geolocation` | `geolocation()` — lihat **Mode geolocation** | `{"ip": "1.2.3.4"}` (opsional) |
| POST | `/api/v1/lu` | generator koleksi endpoint (fitur LU) — lihat **Endpoint LU** | `{"name", "baseUrl", "folders"/"requests", ...}` — lihat **Endpoint LU** |

## Cara Hit

Semua endpoint inti: **POST**, `Content-Type: application/json` (endpoint tanpa body boleh
tanpa header), **tanpa auth** — berjalan sepenuhnya di jaringan internal (ADR-046).
Contoh dari bahasa pemanggil apa pun:

```
POST http://127.0.0.1:30150/api/v1/refnum

POST http://127.0.0.1:30150/api/v1/ppid           body: {"text": "DUMMY NAME"}
POST http://127.0.0.1:30150/api/v1/unique         body: {"character": "D", "length": 6}
POST http://127.0.0.1:30150/api/v1/phone-number   body: {"phone": "081323456789"}
POST http://127.0.0.1:30150/api/v1/geolocation    body: {"ip": "8.8.8.8"}
POST http://127.0.0.1:30150/api/v1/uuid           body: {"version": 3, "namespace": "dns", "name": "example.org"}
POST http://127.0.0.1:30150/api/v1/lu             body: {"name": "...", "baseUrl": "...", "requests": [...]}

GET  http://127.0.0.1:30150/                      (info & health)
```

## Format Respon (ADR-054 — aturan penuh: `_docs/ENGINE-RESPONSE.md`)

Format khusus engine — berbeda dari layer non-engine (envelope `{RC, RCM, DATA, P}`):

| Kondisi | HTTP | Body |
|---------|------|------|
| Sukses (`"0200"`) | 200 | `{"data": <isi>}` |
| Parameter salah (`"0400"`) | 400 | `{"message": "INVALID REQUEST PARAMETER"}` |
| Gagal internal (`"0500"`) | 500 | `{"message": "INTERNAL SERVER ERROR"}` |

- Kode varchar CORE_API — HTTP status = int kode; daftar kode & pesan resmi:
  `_docs/RESPONSE-CODES.md` (satu-satunya tabel).
- **Tanpa `P`** (pagination) — engine tidak mengenal pagination.
- Body JSON rusak / bukan JSON valid (dengan Content-Type json) → 400
  `{"message": "INVALID REQUEST PARAMETER"}`.
- Contoh: `POST /api/v1/refnum` → `{"data": "E1JL7J341HGV4LTLRDBWAVMGKVL5XJYO"}`

## Versi UUID (ADR-048)

Endpoint `/api/v1/uuid` menerima body opsional untuk memilih versi — format hasil selalu
36 char sesuai kontrak:

| Body | Versi | Sifat |
|------|-------|-------|
| *(tanpa body)* / `{"version": 4}` | v4 | random — perilaku lama, default |
| `{"version": 1, "node": "aabbccddeeff", "msecs": 1760000000000}` | v1 | time-based; `node` & `msecs` opsional |
| `{"version": 2, "domain": "person", "id": 1000, "node": "...", "msecs": ...}` | v2 | DCE security; `domain` (person/group/org/domain) + `id` wajib |
| `{"version": 3, "namespace": "dns", "name": "example.org"}` | v3 | deterministik (MD5); `namespace` alias `dns/url/oid/x500` atau UUID custom + `name` wajib |

Perhatian: v2/v3 **deterministik** — input sama menghasilkan UUID sama; v1/v2 memuat
timestamp (bukan untuk kebutuhan kerahasiaan). Input kurang/tidak valid → 400.

## Mode geolocation (ADR-049)

| Panggilan | Hasil |
|-----------|-------|
| `{"ip": "<IP mitra>"}` | detail lengkap IP yang diberikan — **pola utama**: app utama meneruskan IP mitra yang diterimanya langsung dari koneksi |
| *(tanpa `ip`)* | auto-detect = **IP publik server engine** (egress bersama jaringan internal) — untuk profil IP publik sendiri, **BUKAN mitra** |

Pemanggil yang butuh geo mitra **wajib forward IP via body** — tanpa `ip` untuk kebutuhan
mitra menghasilkan lokasi server, bukan mitra.

## Endpoint LU (ADR-056 — aturan penuh: `_docs/LU.md`)

`POST /api/v1/lu` menerima definisi endpoint sebuah unit, mengembalikan file koleksi
endpoint siap pakai (format koleksi standar, kompatibel impor ke aplikasi Postman) via
`{"data": {...}}`. Hasil disimpan pemanggil sebagai `lu-{unit}.{version}.json` di root
unit-nya — bukan disimpan engine (tetap stateless).

| Field body | Wajib | Isi |
|------------|-------|-----|
| `name` | ya | nama base folder Postman (contoh `@127.0.0.1:2002`) — hasil `info.name` = breadcrumb `name > segmen unitPath` |
| `unitPath` | ya | path unit — menyusun breadcrumb `info.name` (contoh `_libraries/_libraries-utils` → `... > _libraries > _libraries-utils`); 1+ segmen dipisah `/` tanpa segmen kosong; **TIDAK menjadi folder** |
| `baseUrl` | ya | URL dasar service (valid) — dipecah 2 variabel environment: `baseUrl` (protocol+host) + `port` (terpisah) |
| `version` | tidak | versi koleksi — samakan dengan versi service |
| `description` | tidak | deskripsi koleksi |
| `folders` | salah satu | daftar folder: `name`, `description?`, `requests[]` (min 1 request) |
| `requests` | salah satu | daftar request tanpa folder |
| `variables` | tidak | variabel environment tambahan `{"key", "value"}` — key `baseUrl`/`port` diabaikan (otomatis) |

Item request: `name` (wajib), `path` (wajib), `method` (default `POST`), `query[]`,
`headers[]`, `body` (string → raw apa adanya; object → nilai otomatis dinamis), `description`.
Validasi gagal → 400 standar engine.

**Dinamis & environment terpisah** — respon `{"data": {"collection": {...},
"environment": {...}}}` disimpan 2 file:

| File | Isi |
|------|-----|
| `lu-{unit}.{version}.json` | koleksi endpoint — `info.name` = breadcrumb (contoh `@127.0.0.1:2002 > _libraries > _libraries-utils`), `item` langsung folder endpoint; **TANPA variabel** |
| `lu-{unit}.{version}.environment.json` | environment Postman terpisah — nama UPPERCASE = `{name setelah ':'}: {segmen terakhir unitPath}` (contoh `2002: _LIBRARIES-UTILS`) |

- URL request memakai **`{{baseUrl}}:{{port}}`** (atau `{{baseUrl}}` saja bila baseUrl
  tanpa port) — ganti host/port cukup edit environment, tanpa sentuh request.
- Nilai **body object otomatis dinamis**: tiap leaf jadi variabel environment bernama
  `{nama-request}_{field}` (contoh `ppid_text`); angka/boolean dipakai tanpa quote agar
  tipe JSON terjaga (contoh `{{uuid_version}}`); body string dibiarkan apa adanya.
- Workflow Postman: import collection → import environment → **aktifkan environment**
  tersebut (pojok kanan atas) — semua request & nilai body mengikuti environment aktif.
- Nama breadcrumb unik per unit — import pertama tidak tabrakan; re-import update
  (nama sama) → pilih **Replace** = hanya menimpa koleksi unit itu, koleksi lain aman.

Contoh body:

```json
{
  "name": "@127.0.0.1:2002",
  "unitPath": "_libraries/_libraries-utils",
  "version": "1.0.0",
  "baseUrl": "http://127.0.0.1:30150",
  "folders": [
    { "name": "Generator", "requests": [
      { "name": "refnum", "path": "/api/v1/refnum" },
      { "name": "ppid", "path": "/api/v1/ppid", "body": {"text": "DUMMY NAME"} }
    ]}
  ],
  "requests": [ { "name": "info", "method": "GET", "path": "/" } ]
}
```

Contoh pemakaian nyata: file `lu-libraries-utils.1.0.0.json` +
`lu-libraries-utils.1.0.0.environment.json` di root unit ini — di-generate endpoint
ini dengan definisi endpoint-nya sendiri.

## Pemanggil Lintas Bahasa

Engine = jembatan kontrak, bukan pengganti library. Dipanggil dari app utama/service lain
(bahasa apa pun) — lihat **Cara Hit**. Format hasil dijamin identik dengan tabel kontrak di
`AGENTS.md` folder `_libraries` (ADR-LIB-001) — refnum 32 char uppercase, uuid 36 char, dst.
Fungsi waktu/format/konteks: pakai native bahasa app masing-masing; kebutuhan util lokal
non-kontrak lintas platform kelak disediakan `_libraries-core` (ROADMAP).

## Akses

Service ini **global-INTERNAL** — hanya untuk unit internal (app, api, service pendukung);
TIDAK untuk pihak luar. TANPA auth/API key (ADR-046) karena berjalan sepenuhnya di jaringan
internal — wajib ditempatkan di jaringan internal. Fungsi berisiko wajib tetap tanpa endpoint;
dilarang menambah endpoint yang mengekspos env, file server, atau konfigurasi.

## Menjalankan

```sh
cp .env.example .env   # lalu sesuaikan
make dev               # development (hot reload) — lokal TANPA container
make run               # produksi tanpa build
make build             # build binary ke bin/
make test              # test suite parity
make clean
```

Dokumentasi API (OpenAPI): `GET /docs` saat service berjalan.

## Deployment

- **Lokal**: jalan langsung via `make dev` / `make run` — tanpa container.
- **Produksi**: via container — `Dockerfile` + `docker-entrypoint.sh`, port 30150.
  Konfigurasi disuntik saat run (env container / `env_file`) — `.env` tidak dibaking
  ke image (lihat `.dockerignore`); kesehatan service dicek via `GET /`.

## Konfigurasi (.env)

| Variabel | Default | Fungsi |
|----------|---------|--------|
| `TYPE` | `engine` | tipe unit (engine) |
| `ENV` | `development` | mode |
| `NAME` | `libraries-utils` | nama service (mengikuti nama unit) |
| `HOST` | `0.0.0.0` | bind host |
| `PORT` | `30150` | port service (registry PORTS) |
| `TIMEOUT` | `60` | timeout call keluar service (`geolocation`), detik |

## Struktur

```
_libraries-utils/
├── main.ts               # entry service
├── routes/api.ts         # registrasi endpoint (10 inti) + info root
├── src/
│   ├── config/           # baca .env
│   ├── controllers/      # handler endpoint (ApiController)
│   ├── helpers/          # generator live + envelope/RC + HTTP helper geolocation + logger + koleksi LU
│   ├── middlewares/      # kosong — service global internal tanpa auth (ADR-046);
│   │                     # logging via helpers/logger (middleware request — ADR-055)
│   ├── migrations/       # kosong — engine stateless tanpa DB
│   ├── models/           # kosong — engine stateless tanpa DB
│   └── types/            # tipe request/response + deklarasi vendor
├── tests/                # test suite (52 test) — ter-track git
├── lu-libraries-utils.1.0.0.json              # koleksi endpoint unit ini (fitur LU)
├── lu-libraries-utils.1.0.0.environment.json  # environment Postman-nya (aturan: _docs/LU.md)
├── storage/              # GIT-IGNORED penuh — artefak runtime (log harian, dll.)
├── Makefile, Dockerfile, .dockerignore, docker-entrypoint.sh
└── .env / .env.example
```

## Parity & Limitasi

- Fungsi arsip yang diekspos: 7 generator + `phoneNumber` + `geolocation` (ADR-047);
  porting 1:1 — kode non-ekspos dihapus dari runtime; acuan parity = git history commit
  awal unit (`src/Utils.php` asli — ADR-052).
- `providerNumber` pada `phoneNumber()` selalu kosong — pemetaan carrier tidak tersedia
  di runtime baru; field lain identik.
- `geolocation()` memanggil layanan publik `ip-api.com` (free tier, rate limit) — versi JSON
  dengan field yang sama seperti arsip. Perbaikan perilaku: mode forward IP kini memakai
  IP di path URL (`/json/{ip}`) — di arsip lama mode ini tidak pernah berfungsi karena
  parameter `query` diabaikan layanan geo (selalu ter-resolve ke IP pemanggil).
- `uuid()` multi-versi: v4 identik arsip (`uuid4()`); v1/v2/v3 = kemampuan baru (ADR-048),
  v3 terkunci test vector resmi.
- `lu()`: kemampuan baru di luar arsip (ADR-056, revisi ADR-057 s.d. ADR-060 —
  `unitPath` wajib, nama breadcrumb, environment terpisah, URL & body dinamis) —
  generator koleksi endpoint semua unit; aturan & konvensi file: `_docs/LU.md`.
  File koleksi + environment unit ini tidak ikut image container
  (`.dockerignore` — `lu-*.json`).

## Testing

```sh
make test
```

60 test: kontrak generator (panjang/format), uuid multi-versi (v1–v4 + validasi), format
respon engine (kode varchar → HTTP, bentuk data/message, validasi 0400), logger
(timestamp/rotasi/mask/pasangan REQ-RES), phoneNumber, http helper, koleksi LU (kontrak
body 0400, breadcrumb, baseUrl/port terpisah, body dinamis, environment terpisah,
envelope) — kode non-live tidak lagi dites (ADR-050). Test suite berada di `tests/`
(root unit) dan **ter-track git**.

## Logging (ADR-055 — aturan penuh: `_docs/LOGS.md`)

Setiap hit dicatat pasangan REQ–RES ke `storage/logs/{YYYYMMDD}.log` (rotasi harian,
git-ignored):

```
[Mon Oct 12 14:20:29 2026 +0700][INFO][api-3920498356] REQ POST /api/v1/refnum id=3a8ab03d-252c body={}
[Mon Oct 12 14:20:29 2026 +0700][INFO][api-3920498356] RES POST /api/v1/refnum id=3a8ab03d-252c http=200 durasi_ms=12 body={"data":"..."}
```

Engine meng-generate **api-id per hit** dan mengembalikannya di **header respon
`X-Api-Id`** — pemanggil tidak perlu mengirim header apa pun (nilai berguna sebagai nomor
referensi trace). Respon HTTP ≥ 400 tercatat bertipe WARNING; kredensial otomatis dimasking.
