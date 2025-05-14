import { GetPurchaseSaleProductByPurchaseIdResponse } from "@domain/use-cases/get-purchase-sale-product-by-purchase-id/get-purchase-sale-product-by-purchase-id-use-case";

export interface GetPurchaseSaleProductByPurchaseIdToHttpResponse {
  data: {
    purchaseSaleProductId: string;
    productName: string;
    saleName: string;
  }[];
}

export class GetPurchaseSaleProductByPurchaseIdViewModel {
  static toHttp({
    data,
  }: GetPurchaseSaleProductByPurchaseIdResponse): GetPurchaseSaleProductByPurchaseIdToHttpResponse {
    const purchaseSaleProducts = data.map(({ saleProduct, id, purchase }) => {
      return {
        purchaseSaleProductId: id,
        productName: saleProduct!.product!.props.name,
        saleName: purchase!.sale.props.name,
      };
    });

    return {
      data: purchaseSaleProducts,
    };
  }
}
