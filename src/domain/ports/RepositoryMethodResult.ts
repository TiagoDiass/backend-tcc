type IRepositoryMethodResult<Result = any> = {
  status: number;
  data: Result;
};

export default IRepositoryMethodResult;
