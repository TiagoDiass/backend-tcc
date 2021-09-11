type ControllerMethodResult = {
  status: number;
  result: {
    message: string;
    data?: any;
    errors?: string[];
  };
};
