export type THttpError = {
  timestamp: string;
  statusCode: number;
  message: string;
  details?: TErrorDetail[];
};

export type TErrorDetail = {
  property: string;
  code: string;
  message: string;
};
