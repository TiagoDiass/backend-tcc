export type IRequestCreateServiceDTO = {
  title: string;
  description?: string;
};

export type IRequestDeleteServiceDTO = {
  id: string;
};

export type IRequestGetServiceByIdDTO = {
  id: string;
};
