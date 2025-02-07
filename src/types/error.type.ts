export type HttpErrorType = {
  timestamp: string;
  statusCode: number;
  message: string;
  details?: ErrorDetailType[];
};

export type ErrorDetailType = {
  property: string;
  code: string;
  message: string;
};
