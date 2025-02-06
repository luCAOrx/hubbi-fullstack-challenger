import { randomUUID } from "node:crypto";
import { NameValidation } from "src/core/logic/domain/validations/name-validation";
import { ProductsValidation } from "src/core/logic/domain/validations/products-validation";

import { Product } from "../product/product";

export type Status = "Pendente" | "Finalizada";

interface SaleProps {
  name: string;
  status?: Status;
  products: string;
}

export class Sale {
  private readonly _id: string;
  private _props: SaleProps;
  private readonly _created_at: Date;
  private readonly _products?: Product[] | undefined;

  public get id(): string {
    return this._id;
  }

  public get props(): SaleProps {
    return this._props;
  }

  public set props(value: SaleProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get products(): Product[] | undefined {
    return this._products;
  }

  private constructor(
    { name, products, status }: SaleProps,
    {
      _id,
      _products,
    }: {
      _id?: string;
      _products?: Product[];
    },
  ) {
    this._id = _id ?? randomUUID();
    this._props = { name, status, products };
    this._created_at = new Date();
    this._products = _products;
  }

  static create(
    { name, products, status }: SaleProps,
    {
      _id,
      _products,
    }: {
      _id?: string;
      _products?: Product[];
    },
  ): Sale {
    return new Sale(
      {
        name: NameValidation.valid({
          propertyName: "name",
          propertyValue: name,
          greaterThan: 6,
          lessThan: 150,
        }),
        status,
        products: ProductsValidation.valid({
          propertyName: "products",
          propertyValue: products,
        }),
      },
      {
        _id,
        _products,
      },
    );
  }
}
