import { Purchase } from "@domain/entities/purchase/purchase";

export interface ToHttpResponse {
  id: string;
  saleId: string;
  products: string;
  created_at: Date;
}

export class PurchaseViewModel {
  static toHttp({
    id,
    props: { saleId, products },
    created_at,
  }: Purchase): ToHttpResponse {
    return {
      id,
      products,
      saleId,
      created_at,
    };
  }
}
