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