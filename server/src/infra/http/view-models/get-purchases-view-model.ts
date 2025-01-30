import { Purchase } from "@domain/entities/purchase/purchase";
import { Status } from "@domain/entities/sale/sale";

export interface ToHttpResponse {
  id: string;
  saleId: string;
  created_at: Date;
  sales: {
    id: string;
    name: string;
    status: Status;
    created_at: Date;
  };
}

export class GetPurchasesViewModel {
  static toHttp({
    id,
    props: { saleId },
    created_at,
    sales,
  }: Purchase): ToHttpResponse {
    return {
      id,
      saleId,
      created_at,
      sales: {
        id: String(sales?.id),
        name: String(sales?.props.name),
        status: sales?.props.status,
        created_at: sales?.created_at,
      },
    };
  }
}
