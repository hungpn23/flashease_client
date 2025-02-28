export type HttpError = {
  timestamp: string;
  statusCode: number;
  message: string;
  details?: ErrorDetail[];
};

export type ErrorDetail = {
  property: string;
  code: string;
  message: string;
};
