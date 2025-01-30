import { Sale, Status } from "@domain/entities/sale/sale";
import { SaleRepository } from "@domain/repositories/sale-repository";

import { BaseUseCase } from "../base-use-case";
import { CreateSaleUseCaseErrors } from "./errors/sale-already-exists-error";

interface CreateSaleRequest {
  name: string;
  status: Status;
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
    status,
    products,
  }: CreateSaleRequest): Promise<CreateSaleResponse> {
    const sale = Sale.create({ name, status, products });

    const saleAlreadyExists = await this.saleRepository.exists(sale.props.name);

    if (saleAlreadyExists) {
      throw new CreateSaleUseCaseErrors.SaleAlreadyExistsError();
    }

    await this.saleRepository.create(sale);

    return { sale };
  }
}
