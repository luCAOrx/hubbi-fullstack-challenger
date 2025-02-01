import { Sale, Status } from "@domain/entities/sale/sale";

export interface ToHttpResponse {
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
  }: Sale): ToHttpResponse {
    return {
      id,
      name,
      status: status!,
      products,
      created_at,
    };
  }
}
