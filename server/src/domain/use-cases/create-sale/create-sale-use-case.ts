import { SaleProduct } from "@domain/entities/sale-product/sale-product";
import { Sale } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { CreateSaleUseCaseErrors } from "./errors/sale-already-exists-error";

interface CreateSaleRequest {
  name: string;
  products: string;
}

interface CreateSaleResponse {
  sale: Sale;
}

export class CreateSaleUseCase
  implements BaseUseCase<CreateSaleRequest, CreateSaleResponse>
{
  constructor(private readonly saleRepository: SaleRepository) {}

  async execute({
    name,
    products,
  }: CreateSaleRequest): Promise<CreateSaleResponse> {
    const sale = Sale.create({ name, products, status: "Pendente" }, {});

    const saleAlreadyExists = await this.saleRepository.exists(sale.props.name);

    if (saleAlreadyExists) {
      throw new CreateSaleUseCaseErrors.SaleAlreadyExistsError();
    }

    let saleProducts = products.split(",").map((productId) => {
      const saleProduct = SaleProduct.create(
        {
          saleId: sale.id,
          productId,
        },
        { _sale: sale },
      );

      return saleProduct;
    });

    sale.products?.map((product) => {
      saleProducts = saleProducts.map((saleProduct) => {
        return SaleProduct.create(
          {
            saleId: saleProduct.props.saleId,
            productId: saleProduct.props.productId,
          },
          {
            _sale: saleProduct.sale,
            _product: product,
            _id: saleProduct.id,
          },
        );
      });
    });

    await this.saleRepository.transactionCreateSaleWithSaleProductAndSaleCounter(
      sale,
      saleProducts,
    );

    return { sale };
  }
}
