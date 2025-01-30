import { randomUUID } from "node:crypto";

import { ProductsValidation } from "@core/logic/domain/validations/products-validation";

interface PurchaseProps {
  saleId: string;
  products: string;
}

export class Purchase {
  private readonly _id: string;
  private _props: PurchaseProps;
  private readonly _created_at: Date;

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

  private constructor({ saleId, products }: PurchaseProps, _id?: string) {
    this._id = _id ?? randomUUID();
    this._props = { saleId, products };
    this._created_at = new Date();
  }

  static create({ saleId, products }: PurchaseProps, _id?: string): Purchase {
    return new Purchase(
      {
        saleId,
        products: ProductsValidation.valid({
          propertyName: "products",
          propertyValue: products,
        }),
      },
      _id,
    );
  }
}
