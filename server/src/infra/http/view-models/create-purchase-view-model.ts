import { Purchase } from "@domain/entities/purchase/purchase";

export interface CreatePurchaseToHttpResponse {
  id: string;
  saleId: string;
  created_at: Date;
}

export class CreatePurchaseViewModel {
  static toHttp({
    id,
    props: { saleId },
    created_at,
  }: Purchase): CreatePurchaseToHttpResponse {
    return {
      id,
      saleId,
      created_at,
    };
  }
}
