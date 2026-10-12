const RC_MESSAGES: Record<string, string> = {
  "0100": "TRY AGAIN",
  "0200": "SUCCESS",
  "0201": "PENDING",
  "0202": "CANCELED",
  "0211": "PROCESS",
  "0212": "FAILED",
  "0222": "EXPIRED",
  "0400": "INVALID REQUEST PARAMETER",
  "0401": "INVALID ACCESS",
  "0403": "INVALID ACCOUNT",
  "0404": "INVALID TOKEN",
  "0405": "INVALID SIGNATURE",
  "0411": "INVALID BALANCE",
  "0412": "ACCESS FAILED",
  "0423": "ACCESS LOCKED",
  "0429": "TOO MANY REQUESTS PLEASE TRY AGAIN LATER",
  "0444": "CONNECTION CLOSED",
  "0499": "CLIENT CLOSED REQUEST",
  "0500": "INTERNAL SERVER ERROR",
  "0501": "NOT IMPLEMENTED",
  "0502": "BAD GATEWAY",
  "0503": "SERVICE UNAVAILABLE",
  "0504": "GATEWAY TIMEOUT",
  "0999": "GENERAL ERROR",
};

export const RC_SUCCESS = "0200";
export const RC_INVALID_REQUEST = "0400";
export const RC_INTERNAL_ERROR = "0500";

const RC_FALLBACK_ERROR = "0500";
const RC_UNKNOWN_MESSAGE = "unknown status code";

export interface ResponseEnvelope {
  http: number;
  message: string;
  data?: unknown;
}

export function status(code: string, data?: unknown): ResponseEnvelope {
  let rc = code;
  if (rc === "0000") {
    rc = RC_FALLBACK_ERROR;
  }

  const http = parseInt(rc, 10);
  const message = RC_MESSAGES[rc] ?? RC_UNKNOWN_MESSAGE;

  return data === undefined ? { http, message } : { http, message, data };
}
