import { Sale, Status } from "@domain/entities/sale/sale";

export interface CreateSaleToHttpResponse {
  id: string;
  name: string;
  status: Status;
  products: string;
  created_at: Date;
}

export class SaleViewModel {
  static toHttp({
    id,
    props: { name, status, products },
    created_at,
  }: Sale): CreateSaleToHttpResponse {
    return {
      id,
      name,
      status: status!,
      products,
      created_at,
    };
  }
}
