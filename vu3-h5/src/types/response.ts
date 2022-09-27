export interface BaseResponse<T> {
  requestId: string | null;
  code: number;
  userMsg: string | null;
  developerMsg: string | null;
  timestamp: string;
  content: T;
}

export interface BoolContent {
  success: boolean;
}
