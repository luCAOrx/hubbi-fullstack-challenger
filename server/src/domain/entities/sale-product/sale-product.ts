import { randomUUID } from "node:crypto";

import { Product } from "../product/product";
import { Sale } from "../sale/sale";

interface SaleProductProps {
  saleId: string;
  productId: string;
}

export class SaleProduct {
  private readonly _id: string;
  private _props: SaleProductProps;
  private readonly _created_at: Date;
  private readonly _product?: Product | undefined;
  private readonly _sale?: Sale | undefined;

  public get id(): string {
    return this._id;
  }

  public get props(): SaleProductProps {
    return this._props;
  }
  public set props(value: SaleProductProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get product(): Product | undefined {
    return this._product;
  }

  public get sale(): Sale | undefined {
    return this._sale;
  }

  constructor(
    { saleId, productId }: SaleProductProps,
    {
      _id,
      _product,
      _sale,
    }: {
      _id?: string;
      _product?: Product;
      _sale?: Sale;
    },
  ) {
    this._props = { saleId, productId };
    this._id = _id ?? randomUUID();
    this._product = _product;
    this._sale = _sale;
    this._created_at = new Date();
  }

  static create(
    { saleId, productId }: SaleProductProps,
    {
      _id,
      _product,
      _sale,
    }: {
      _id?: string;
      _product?: Product;
      _sale?: Sale;
    },
  ): SaleProduct {
    return new SaleProduct(
      {
        productId,
        saleId,
      },
      {
        _id,
        _product,
        _sale,
      },
    );
  }
}
