import { IProductProperties } from 'domain/entities/Product/Product';

export type IRequestCreateProductDTO = Omit<IProductProperties, 'id'>;

export type IRequestGetProductByIdDTO = { id: string };

export type IRequestDeleteProductDTO = { id: string };

export type IRequestUpdateProductDTO = IProductProperties & { id: string }; // id is optional on IProductProperties, but not here
