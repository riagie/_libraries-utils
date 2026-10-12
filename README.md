<<<<<<< HEAD
<<<<<<< HEAD
## Libraries
Utils is Libraries Cloud Data Center application programming interfaces (API's) that enables you to access data globally service.

#### Information results
The testing file in directory tests


#### UUID (universally unique identifier)
Generate 36 digit unique string
- `\Libraries\Utils::uuid()`
- response 
```
8c4b8c45-befa-4aa1-8313-c8c37b818d4c
```

#### Secret Key
Generate 32 digit unique string
- `\Libraries\Utils::secret()`
- response 
```
5otdrv7lzspfblf65apnetzn4euvtc6m
```

#### Refnum (reference number)
Generate 32 digit unique string
- `\Libraries\Utils::refnum()`
- response 
```
E1JL7J341HGV4LTLRDBWAVMGKVL5XJYO
```

#### Token 
Generate 28 digit unique string
- `\Libraries\Utils::token()`
- response 
```
JvEpqAajNt8VkMRuRnGb34mmwPM7
```

#### ID API's
Generate 10 digit unique string
- `\Libraries\Utils::apiId()`
- response 
```
api-2969052206
```

#### PPID (personal private ID)
Generate 16 digit random alfabet + number
- `\Libraries\Utils::ppid(string)`
- parameters
```
**string** "OGIE NURDIANA 081323456789"
```
- response 
```
OARUENDIIAOGNA57
```

#### CID (central ID)
- `\Libraries\Utils::unique(alfabet, length_number)`
- parameters
```
**alfabet** string of 1 letter
**length_number** number 1 digit
```
- response 
```
323545
```

#### Phone
- `\Libraries\Utils::phoneNumber(number_phone, region_code)`
- parameters
```
**number_phone** number
**region_code** string
```
- response 
```
(
    [regionCode] => ID
    [numberType] => Mobile
    [providerNumber] => Telkomsel
    [countryCode] => 62
    [number] => 81323456789
    [possibleNumber] => 1
    [validNumber] => 1
)
```

#### Start Time
- `\Libraries\Utils::setStartTime(time_start)`
- parameters
```
**time_start** microtime(true)
```
- response 
```
1681805195.8551
```

#### Elapsed Time
- `\Libraries\Utils::getElapsedTime($time_start)`
- parameters
```
**time_start** from setStartTime
```
- response 
```
1.5020370483398E-5
```

#### Expired
- `\Libraries\Utils::setExpired(number)`
- parameters
```
**number** number in count day
```
- response 
```
2023-04-19
```

#### Curl Headers
- `\Libraries\Utils::setHeaders(curl, headers, time)`
- parameters
```
**curl** new \Curl\Curl()
**headers** array key header and value
**time** interval /sec 
```
- response 
```
(
    [curl] => Resource id #106
    [id] => 643e4f8bd20ef3.43049570
    [error] => 
    [errorCode] => 0
    [errorMessage] => 
    [curlError] => 
    [curlErrorCode] => 0
    [curlErrorMessage] => 
    [httpError] => 
    [httpStatusCode] => 0
    [httpErrorMessage] => 
    [url] => 
    [requestHeaders] => Array
        (
        )

    [responseHeaders] => 
    [rawResponseHeaders] => 
    [responseCookies] => Array
        (
        )

    [response] => 
    [rawResponse] => 
    [downloadCompleteCallback] => 
    [fileHandle] => 
    [downloadFileName] => 
    [attempts] => 0
    [retries] => 0
    [childOfMultiCurl] => 
    [remainingRetries] => 0
    [retryDecider] => 
    [jsonDecoder] => 
    [xmlDecoder] => 
    [headerCallbackData:Curl\Curl:private] => stdClass Object
        (
            [rawResponseHeaders] => 
            [responseCookies] => Array
                (
                )

            [stopRequestDecider] => 
            [stopRequest] => 
        )

    [cookies:Curl\Curl:private] => Array
        (
        )

    [headers:Curl\Curl:private] => Curl\CaseInsensitiveArray Object
        (
            [data:Curl\CaseInsensitiveArray:private] => Array
                (
                    [content-type] => application/x-www-form-urlencoded
                    [cache-control] => private, max-age=30
                    [expires] => Tue, 18 Apr 2023 08:07:05 GMT
                    [accept-encoding] => gzip, deflate, br
                )

            [keys:Curl\CaseInsensitiveArray:private] => Array
                (
                    [content-type] => Content-Type
                    [cache-control] => Cache-Control
                    [expires] => Expires
                    [accept-encoding] => Accept-Encoding
                )

        )

    [jsonDecoderArgs:Curl\Curl:private] => Array
        (
        )

    [jsonPattern:Curl\Curl:private] => /^(?:application|text)\/(?:[a-z]+(?:[\.-][0-9a-z]+){0,}[\+\.]|x-)?json(?:-[a-z]+)?/i
    [xmlDecoderArgs:Curl\Curl:private] => Array
        (
        )

    [xmlPattern:Curl\Curl:private] => ~^(?:text/|application/(?:atom\+|rss\+|soap\+)?)xml~i
    [defaultDecoder:Curl\Curl:private] => 
    [beforeSendCallback] => 
    [successCallback] => 
    [errorCallback] => 
    [completeCallback] => 
    [options:protected] => Array
        (
            [181] => 3
            [182] => 3
            [10018] => Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0
            [13] => 30
            [2] => 1
            [20056] => Closure Object
                (
                    [static] => Array
                        (
                            [header_callback_data] => stdClass Object
                                (
                                    [rawResponseHeaders] => 
                                    [responseCookies] => Array
                                        (
                                        )

                                    [stopRequestDecider] => 
                                    [stopRequest] => 
                                )

                        )

                    [parameter] => Array
                        (
                            [$resource] => <required>
                            [$download_size] => <required>
                            [$downloaded] => <required>
                            [$upload_size] => <required>
                            [$uploaded] => <required>
                        )

                )

            [43] => 
            [20079] => Closure Object
                (
                    [static] => Array
                        (
                            [header_callback_data] => stdClass Object
                                (
                                    [rawResponseHeaders] => 
                                    [responseCookies] => Array
                                        (
                                        )

                                    [stopRequestDecider] => 
                                    [stopRequest] => 
                                )

                        )

                    [parameter] => Array
                        (
                            [$ch] => <required>
                            [$header] => <required>
                        )

                )

            [19913] => 1
            [10023] => Array
                (
                    [0] => Content-Type: application/x-www-form-urlencoded
                    [1] => Cache-Control: private, max-age=30
                    [2] => Expires: Tue, 18 Apr 2023 08:07:05 GMT
                    [3] => Accept-Encoding: gzip, deflate, br
                )

        )

)
```

#### Curl Opts
- `\Libraries\Utils::setOpts(curl, opts)`
`$setOpts["CURLOPT_ENCODING"] = "gzip, deflate, br"`
- parameters
```
**curl** new \Curl\Curl()
**opts** array key Opts and value
```
- response 
```
(
    [curl] => Resource id #106
    [id] => 643e4f8bd20ef3.43049570
    [error] => 
    [errorCode] => 0
    [errorMessage] => 
    [curlError] => 
    [curlErrorCode] => 0
    [curlErrorMessage] => 
    [httpError] => 
    [httpStatusCode] => 0
    [httpErrorMessage] => 
    [url] => 
    [requestHeaders] => Array
        (
        )

    [responseHeaders] => 
    [rawResponseHeaders] => 
    [responseCookies] => Array
        (
        )

    [response] => 
    [rawResponse] => 
    [downloadCompleteCallback] => 
    [fileHandle] => 
    [downloadFileName] => 
    [attempts] => 0
    [retries] => 0
    [childOfMultiCurl] => 
    [remainingRetries] => 0
    [retryDecider] => 
    [jsonDecoder] => 
    [xmlDecoder] => 
    [headerCallbackData:Curl\Curl:private] => stdClass Object
        (
            [rawResponseHeaders] => 
            [responseCookies] => Array
                (
                )

            [stopRequestDecider] => 
            [stopRequest] => 
        )

    [cookies:Curl\Curl:private] => Array
        (
        )

    [headers:Curl\Curl:private] => Curl\CaseInsensitiveArray Object
        (
            [data:Curl\CaseInsensitiveArray:private] => Array
                (
                    [content-type] => application/x-www-form-urlencoded
                    [cache-control] => private, max-age=30
                    [expires] => Tue, 18 Apr 2023 08:07:05 GMT
                    [accept-encoding] => gzip, deflate, br
                )

            [keys:Curl\CaseInsensitiveArray:private] => Array
                (
                    [content-type] => Content-Type
                    [cache-control] => Cache-Control
                    [expires] => Expires
                    [accept-encoding] => Accept-Encoding
                )

        )

    [jsonDecoderArgs:Curl\Curl:private] => Array
        (
        )

    [jsonPattern:Curl\Curl:private] => /^(?:application|text)\/(?:[a-z]+(?:[\.-][0-9a-z]+){0,}[\+\.]|x-)?json(?:-[a-z]+)?/i
    [xmlDecoderArgs:Curl\Curl:private] => Array
        (
        )

    [xmlPattern:Curl\Curl:private] => ~^(?:text/|application/(?:atom\+|rss\+|soap\+)?)xml~i
    [defaultDecoder:Curl\Curl:private] => 
    [beforeSendCallback] => 
    [successCallback] => 
    [errorCallback] => 
    [completeCallback] => 
    [options:protected] => Array
        (
            [181] => 3
            [182] => 3
            [10018] => Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0
            [13] => 30
            [2] => 1
            [20056] => Closure Object
                (
                    [static] => Array
                        (
                            [header_callback_data] => stdClass Object
                                (
                                    [rawResponseHeaders] => 
                                    [responseCookies] => Array
                                        (
                                        )

                                    [stopRequestDecider] => 
                                    [stopRequest] => 
                                )

                        )

                    [parameter] => Array
                        (
                            [$resource] => <required>
                            [$download_size] => <required>
                            [$downloaded] => <required>
                            [$upload_size] => <required>
                            [$uploaded] => <required>
                        )

                )

            [43] => 
            [20079] => Closure Object
                (
                    [static] => Array
                        (
                            [header_callback_data] => stdClass Object
                                (
                                    [rawResponseHeaders] => 
                                    [responseCookies] => Array
                                        (
                                        )

                                    [stopRequestDecider] => 
                                    [stopRequest] => 
                                )

                        )

                    [parameter] => Array
                        (
                            [$ch] => <required>
                            [$header] => <required>
                        )

                )

            [19913] => 1
            [10023] => Array
                (
                    [0] => Content-Type: application/x-www-form-urlencoded
                    [1] => Cache-Control: private, max-age=30
                    [2] => Expires: Tue, 18 Apr 2023 08:07:05 GMT
                    [3] => Accept-Encoding: gzip, deflate, br
                )

            [52] => 1
            [10102] => gzip, deflate, br
            [68] => 10
            [84] => CURL_HTTP_VERSION_1_1
            [42] => 
            [64] => 
            [81] => 
            [45] => 
            [41] => 
            [10082] => logs/20230418-cookie.txt
            [10031] => logs/20230418-cookie.txt
            [78] => 60
        )

)
```

#### Load File
- `\Libraries\Utils::loadFile(directory)`
- parameters
```
**directory** directory file and name file
```
- response 
```
## Libraries
Utils application programming interfaces (API's) that enables you to access data globally service. 
After you register your app and get authentication tokens for a user or service, you can make requests to the Cloud Data Center API's.1
```

#### Environment
- `\Libraries\Utils::getEnv()`
- response 
```
(
    [ALLUSERSPROFILE] => C:\ProgramData
    [APPDATA] => C:\Users\{{users}}\AppData\Roaming
    [CHROME_CRASHPAD_PIPE_NAME] => \\.\pipe\LOCAL\crashpad_14404_SRPQTVJZEXRLOIIE
    [CommonProgramFiles] => C:\Program Files\Common Files
    [CommonProgramFiles(x86)] => C:\Program Files (x86)\Common Files
    [CommonProgramW6432] => C:\Program Files\Common Files
    [COMPUTERNAME] => 9F079636H
    [ComSpec] => C:\Windows\system32\cmd.exe
    [DriverData] => C:\Windows\System32\Drivers\DriverData
    [ESET_OPTIONS] =>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    [FPS_BROWSER_APP_PROFILE_STRING] => Internet Explorer
    [FPS_BROWSER_USER_PROFILE_STRING] => Default
    [HOMEDRIVE] => C:
    [HOMEPATH] => \Users\{{users}}
    [LOCALAPPDATA] => C:\Users\{{users}}\AppData\Local
    [LOGONSERVER] => \\9F079636H
    [NUMBER_OF_PROCESSORS] => 4
    [OneDrive] => C:\Users\{{users}}\OneDrive
    [OneDriveConsumer] => C:\Users\{{users}}\OneDrive
    [ORIGINAL_XDG_CURRENT_DESKTOP] => undefined
    [OS] => Windows_NT
    [Path] => C:\Program Files\Java\jdk\bin;C:\Program Files\Java\jre\bin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Program Files\Composer;C:\xampp\mysql\bin;C:\Program Files\Microsoft VS Code\bin;C:\Program Files\Git\cmd;C:\xampp\php-739;C:\xampp\MongoDB\Server\6.0\bin;C:\Program Files\apache-jmeter-5.5\bin;C:\xampp\nginx;C:\Users\{{users}}\AppData\Local\Microsoft\WindowsApps;C:\Users\{{users}}\AppData\Roaming\Composer\vendor\bin
    [PATHEXT] => .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC
    [PROCESSOR_ARCHITECTURE] => AMD64
    [PROCESSOR_IDENTIFIER] => Intel64 Family 6 Model 61 Stepping 4, GenuineIntel
    [PROCESSOR_LEVEL] => 6
    [PROCESSOR_REVISION] => 3d04
    [ProgramData] => C:\ProgramData
    [ProgramFiles] => C:\Program Files
    [ProgramFiles(x86)] => C:\Program Files (x86)
    [ProgramW6432] => C:\Program Files
    [PSModulePath] => C:\Program Files\WindowsPowerShell\Modules;C:\Windows\system32\WindowsPowerShell\v1.0\Modules
    [PUBLIC] => C:\Users\Public
    [SESSIONNAME] => Console
    [SystemDrive] => C:
    [SystemRoot] => C:\Windows
    [TEMP] => C:\Users\OGIENU~1\AppData\Local\Temp
    [TMP] => C:\Users\OGIENU~1\AppData\Local\Temp
    [USERDOMAIN] => 9F079636H
    [USERDOMAIN_ROAMINGPROFILE] => 9F079636H
    [USERNAME] => {{users}}
    [USERPROFILE] => C:\Users\{{users}}
    [VSCODE_AMD_ENTRYPOINT] => vs/workbench/api/node/extensionHostProcess
    [VSCODE_CODE_CACHE_PATH] => C:\Users\{{users}}\AppData\Roaming\Code\CachedData\704ed70d4fd1c6bd6342c436f1ede30d1cff4710
    [VSCODE_CRASH_REPORTER_PROCESS_TYPE] => extensionHost
    [VSCODE_CRASH_REPORTER_SANDBOXED_HINT] => 1
    [VSCODE_CWD] => C:\Program Files\Microsoft VS Code
    [VSCODE_HANDLES_UNCAUGHT_ERRORS] => true
    [VSCODE_IPC_HOOK] => \\.\pipe\28bce457577a9dfc47e72f5601a35cdb-1.77.3-main-sock
    [VSCODE_L10N_BUNDLE_LOCATION] => 
    [VSCODE_NLS_CONFIG] => {"locale":"en-us","osLocale":"en-us","availableLanguages":{},"_languagePackSupport":true}
    [VSCODE_PID] => 14404
    [windir] => C:\Windows
    [XDEBUG_CONFIG] => client_port=57245
    [XDEBUG_MODE] => debug,develop
)
```

#### Browser
- `\Libraries\Utils::clientBrowser()`
- response 
```
(
    [userAgent] => 
    [browserName] => unknown
    [browserVer] => unknown
    [platformFamily] => unknown
    [platformVer] => unknown
    [platformName] => unknown
    [platformIs64bit] => 
    [isMobile] => 
    [isRobot] => 
    [isInIECompat] => 
    [strEmulatedIE] => 
    [arrayEmulatedIE] => Array
        (
            [browser] => 
            [version] => 
        )

    [isChromeFrame] => 
)
```

#### IP
- `\Libraries\Utils::clientIp()`
- response 
```
UNKNOWN
```

#### Geolocation
- `\Libraries\Utils::geolocation(ip)`
- parameters
```
**ip** public IP is opsional
```
- response 
```
(
    [status] => success
    [continent] => Asia
    [continentCode] => AS
    [country] => Indonesia
    [countryCode] => ID
    [region] => JB
    [regionName] => West Java
    [city] => Bandung
    [district] => 
    [zip] => 
    [lat] => -6.9217
    [lon] => 107.6071
    [timezone] => Asia/Jakarta
    [offset] => 25200
    [currency] => IDR
    [isp] => PT. TELKOM INDONESIA
    [org] => 
    [as] => AS7713 PT Telekomunikasi Indonesia
    [asname] => telkomnet-as-ap
    [reverse] => 
    [mobile] => 
    [proxy] => 
    [hosting] => 
    [query] => 180.244.129.23
)
```

#### Database
- `\Libraries\Utils::database(name, config)`
- parameters
```
**name** name class
**config** accses database in array example `array ("API_CENTRAL", "127.0.0.1", 3306, "root", "root")`
```
- response 
```
(
    [scalar] => Class DBMySQL not found
)
```

#### Convert Object
- `\Libraries\Utils::Object(object)`
- parameters
```
**object** data object
```
- response 
```
(
    [opacity] => 0.5
    [index] => Array
        (
            [0] => white
            [1] => black
        )

    [colors] => stdClass Object
        (
            [index] => Array
                (
                    [0] => White
                    [1] => Black
                    [2] => Red
                    [3] => Green
                    [4] => Blue
                )

        )

    [red] => stdClass Object
        (
            [r] => ff
            [g] => 00
            [b] => 00
        )

    [green] => stdClass Object
        (
            [r] => 00
            [g] => ff
            [b] => 00
        )

    [blue] => stdClass Object
        (
            [r] => 00
            [g] => 00
            [b] => ff
        )

)
```

#### Convert Json
- `\Libraries\Utils::Json(type, data)`
- parameters
```
**type** request format
**data** data array
```
- response 
```
(
    [scalar] => {"red":"ff0000","green":"00ff00","blue":"0000ff"}
)
```

#### Convert Array to Xml
- `\Libraries\Utils::Xml(data, encoding, version, standalone)`
- parameters
```
**data** data array
**encoding** format encoding is optional
**version** version xml is optional
**standalone** active standalone or not is optional
```
- response 
```
<?xml version="1.1" encoding="UTF-8" standalone="yes"?>
<root><Good_guy><name>Luke Skywalker</name><weapon>Lightsaber</weapon></Good_guy><Bad_guy><name>Sauron</name><weapon>Evil Eye</weapon></Bad_guy></root>
```

#### Convert Array to Text
- `\Libraries\Utils::Text(header, massage)`
- parameters
```
**header** array head
**massage** array data
```
- response 
```
DARK_RED|LIGHT_GREEN|BLUE
01|11|21
02|12|22
03|13|23
```
=======
# _libraries-utils
=======
# _libraries-utils — Engine REST Generator Identifier (AKTIF)
>>>>>>> 381260f (feat: initialize libraries-utils project with core functionality)

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
| Waktu & format | `setStartTime, getElapsedTime, setExpired, Object, Json, Xml, Text, Debug` | **LOKAL** — native di bahasa masing-masing; tanpa endpoint |
| Konteks request | `clientIp, clientBrowser` | **LOKAL** — data asal ada di pemanggil; parser native |
| Konteks proses | `getEnv, loadFile, database` | **INTERNAL-ONLY** — konteks proses tak bisa dibawa lewat HTTP (salah konteks) |
| Standar HTTP internal | `setHeaders, setOpts` | internal engine (helper `geolocation`) |

## Endpoint (9 + info root)

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
├── routes/api.ts         # registrasi endpoint (9 inti) + info root
├── src/
│   ├── config/           # baca .env
│   ├── controllers/      # handler endpoint (ApiController)
│   ├── helpers/          # generator live + envelope/RC + HTTP helper geolocation + logger
│   ├── middlewares/      # kosong — service global internal tanpa auth (ADR-046);
│   │                     # logging via helpers/logger (middleware request — ADR-055)
│   ├── migrations/       # kosong — engine stateless tanpa DB
│   ├── models/           # kosong — engine stateless tanpa DB
│   └── types/            # tipe request/response + deklarasi vendor
├── storage/              # GIT-IGNORED penuh — artefak runtime + test lokal
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

## Testing

<<<<<<< HEAD
File uji ada di `tests/` — jalankan sesuai tooling unit saat menambah fungsi baru.
>>>>>>> 518a26e (chore: initial commit — library aktif (ADR-013: repo per unit))
=======
```sh
make test
```

36 test: kontrak generator (panjang/format), uuid multi-versi (v1–v4 + validasi), format
respon engine (kode varchar → HTTP, bentuk data/message, validasi 0400), logger
(timestamp/rotasi/mask/pasangan REQ-RES), phoneNumber, http helper — kode non-live tidak
lagi dites (ADR-050).

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

> Catatan (keputusan owner, 2026-10-12): seluruh isi `storage/` — termasuk `storage/tests/` —
> git-ignored karena berisi artefak runtime/hasil proses yang berbeda per environment.
> Test suite hanya ada di mesin yang menjalankan; jangan taruh satu-satunya salinan test di sini.
>>>>>>> 381260f (feat: initialize libraries-utils project with core functionality)
