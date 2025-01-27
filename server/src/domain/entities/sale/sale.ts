import { randomUUID } from "node:crypto";
import { NameValidation } from "src/core/logic/domain/validations/name-validation";
import { ProductsValidation } from "src/core/logic/domain/validations/products-validation";

export type Status = "Pendente" | "Finalizada";

interface SaleProps {
  name: string;
  status: Status;
  products: { public_id: string; name: string }[];
}

export class Sale {
  private readonly _private_id: number;
  private readonly _public_id: string;
  private _props: SaleProps;
  private readonly _created_at: Date;

  public get private_id(): number {
    return this._private_id;
  }

  public get public_id(): string {
    return this._public_id;
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

  private constructor(
    { name, products, status }: SaleProps,
    private_id?: number,
    public_id?: string,
  ) {
    this._private_id = private_id ?? 0;
    this._public_id = public_id ?? randomUUID();
    this._props = { name, status, products };
    this._created_at = new Date();
  }

  static create(
    { name, products, status }: SaleProps,
    private_id?: number,
    public_id?: string,
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
      private_id,
      public_id,
    );
  }
}
