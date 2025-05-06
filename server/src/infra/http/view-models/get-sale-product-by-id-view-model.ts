import { GetSaleProductByIdResponse } from "@domain/use-cases/get-sale-product-by-id/get-sale-product-by-id-use-case";

export interface GetSaleProductByIdToHttpResponse {
  page: number;
  data: {
    saleProductId: string;
    productName: string;
  }[];
}

export class GetSaleProductByIdViewModel {
  static toHttp({
    page,
    data,
  }: GetSaleProductByIdResponse): GetSaleProductByIdToHttpResponse {
    const saleProducts = data.map(({ id, product }) => {
      return {
        saleProductId: id,
        productName: product!.props.name,
      };
    });

    return {
      page,
      data: saleProducts,
    };
  }
}
