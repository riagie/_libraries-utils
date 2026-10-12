export interface ApiResponse {
  http: number;
  message: string;
  data?: unknown;
}

export interface HttpResponseLike {
  status(code: number): any;
  json(payload: unknown): void;
}

export type HandlerLike = (req: any, res: any) => void | Promise<void>;
