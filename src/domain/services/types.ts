type ErrorResponse = {
  message: any;
  errorsList?: string[];
};

export type DomainServiceResult<ResultType = any> = {
  status: number;
  result?: ResultType;
  error?: ErrorResponse;
};
