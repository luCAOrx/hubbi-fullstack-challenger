import { randomUUID } from "node:crypto";

interface ProductProps {
  name: string;
}

export class Product {
  private readonly _id: string;
  private _props: ProductProps;
  private readonly _created_at: Date;

  public get id(): string {
    return this._id;
  }

  public get props(): ProductProps {
    return this._props;
  }

  public set props(value: ProductProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  private constructor({ name }: ProductProps, { _id }: { _id?: string }) {
    this._id = _id ?? randomUUID();
    this._props = { name };
    this._created_at = new Date();
  }

  static create({ name }: ProductProps, { _id }: { _id?: string }): Product {
    return new Product({ name }, { _id });
  }
}
