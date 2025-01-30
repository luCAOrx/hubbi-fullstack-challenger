import { randomUUID } from "node:crypto";

import { ProductsValidation } from "@core/logic/domain/validations/products-validation";

import { Sale } from "../sale/sale";

interface PurchaseProps {
  saleId: string;
  products: string;
}

export class Purchase {
  private readonly _id: string;
  private _props: PurchaseProps;
  private readonly _created_at: Date;
  private readonly _sales: Sale;

  public get id(): string {
    return this._id;
  }

  public get props(): PurchaseProps {
    return this._props;
  }

  public set props(value: PurchaseProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get sales(): Sale {
    return this._sales;
  }

  private constructor(
    { saleId, products }: PurchaseProps,
    _id?: string,
    _sales?: Sale,
  ) {
    this._id = _id ?? randomUUID();
    this._props = { saleId, products };
    this._created_at = new Date();
    this._sales = _sales ?? Sale.prototype;
  }

  static create(
    { saleId, products }: PurchaseProps,
    _id?: string,
    sales?: Sale,
  ): Purchase {
    return new Purchase(
      {
        saleId,
        products: ProductsValidation.valid({
          propertyName: "products",
          propertyValue: products,
        }),
      },
      _id,
      sales,
    );
  }
}
