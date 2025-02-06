import { GetSaleProductByIdResponse } from "@domain/use-cases/get-sale-product-by-id/get-sale-product-by-id";

export interface GetSaleProductByIdToHttpResponse {
  saleId: string;
  products: {
    productId: string;
    productName: string;
  }[];
}

export class GetSaleProductByIdViewModel {
  static toHttp({
    saleProduct: { id, products },
  }: GetSaleProductByIdResponse): GetSaleProductByIdToHttpResponse {
    const saleProducts = products?.map((product) => {
      return {
        productId: product.id,
        productName: product.props.name,
      };
    });

    return {
      saleId: id,
      products: saleProducts!,
    };
  }
}
