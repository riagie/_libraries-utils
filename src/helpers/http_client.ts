import { Env } from "../config/config";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0";
const DEFAULT_TIMEOUT_SECONDS = 30;
const COOKIE_FILE_PATH = "logs/" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-cookie.txt";
const DEFAULT_CONNECT_TIMEOUT_SECONDS = 60;

const CURL_OPTION_MAP: Record<string, string> = {
  CURLOPT_FOLLOWLOCATION: "followLocation",
  CURLOPT_RETURNTRANSFER: "returnTransfer",
  CURLOPT_ENCODING: "encoding",
  CURLOPT_MAXREDIRS: "maxRedirs",
  CURLOPT_HTTP_VERSION: "httpVersion",
  CURLOPT_HEADER: "header",
  CURLINFO_HEADER_OUT: "headerOut",
  CURLOPT_SSL_VERIFYPEER: "sslVerifyPeer",
  CURLOPT_SSL_VERIFYHOST: "sslVerifyHost",
  CURLOPT_FAILONERROR: "failOnError",
  CURLOPT_VERBOSE: "verbose",
};

export interface HttpConfig {
  userAgent?: string;
  headers: Record<string, string>;
  [key: string]: unknown;
}

export function setHeaders(curl: HttpConfig = { headers: {} }, header: Record<string, unknown> | false = false, interval = 60): HttpConfig {
  const expiresAt = new Date(Date.now() + interval * 1000).toUTCString();

  curl.userAgent = USER_AGENT;
  curl.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cache-Control": "private, max-age=" + interval,
    Expires: expiresAt,
  };

  if (header) {
    for (const [key, value] of Object.entries(header)) {
      curl.headers[String(key).trim()] = String(value).trim();
    }
  }

  return curl;
}

export function setOpts(curl: HttpConfig = { headers: {} }, opt: Record<string, unknown> | false = false): HttpConfig {
  curl.followLocation = true;
  curl.returnTransfer = true;
  curl.encoding = "gzip, deflate, br";
  curl.maxRedirs = 10;
  curl.httpVersion = "CURL_HTTP_VERSION_1_1";
  curl.header = false;
  curl.headerOut = true;
  curl.sslVerifyPeer = false;
  curl.sslVerifyHost = false;
  curl.failOnError = false;
  curl.verbose = false;

  if (opt) {
    for (const [key, value] of Object.entries(opt)) {
      const mapped = CURL_OPTION_MAP[String(key).trim()];
      if (!mapped) {
        throw new Error("Undefined constant " + key);
      }
      (curl as Record<string, unknown>)[mapped] = typeof value === "string" ? value.trim() : value;
    }
  }

  curl.timeout = DEFAULT_TIMEOUT_SECONDS;
  curl.cookieJar = COOKIE_FILE_PATH;
  curl.cookieFile = COOKIE_FILE_PATH;
  curl.connectTimeout = DEFAULT_CONNECT_TIMEOUT_SECONDS;

  return curl;
}

export async function geolocation(ip?: string) {
  const httpProfile = setOpts(setHeaders());

  const fields =
    "status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";

  const params = new URLSearchParams({ fields });
  const url = ip
    ? "http://ip-api.com/json/" + encodeURIComponent(ip) + "?" + params.toString()
    : "http://ip-api.com/json?" + params.toString();

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": String(httpProfile.userAgent ?? ""),
        "Accept-Encoding": String(httpProfile.encoding ?? ""),
      },
      signal: AbortSignal.timeout(Env.TIMEOUT * 1000),
    });

    if (!response.ok) {
      return {
        status: false,
        errorCode: response.status,
        errorMessage: response.statusText,
      };
    }

    return await response.json();
  } catch (error: any) {
    return {
      status: false,
      errorCode: typeof error?.code !== "undefined" ? error.code : 0,
      errorMessage: String(error?.message ?? error),
    };
  }
}
