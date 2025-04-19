import { randomUUID } from "node:crypto";

import { PurchaseSaleProduct } from "../purchase-sale-product/purchase-sale-product";
import { Sale } from "../sale/sale";

interface PurchaseProps {
  saleId: string;
}

export class Purchase {
  private readonly _id: string;
  private _props: PurchaseProps;
  private readonly _created_at: Date;
  private readonly _sale: Sale;
  private readonly _purchaseSaleProducts: PurchaseSaleProduct[];

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

  public get sale(): Sale {
    return this._sale;
  }

  public get purchaseSaleProducts(): PurchaseSaleProduct[] {
    return this._purchaseSaleProducts;
  }

  private constructor(
    { saleId }: PurchaseProps,
    {
      _id,
      _sale,
      _purchaseSaleProducts,
    }: {
      _id?: string;
      _sale?: Sale;
      _purchaseSaleProducts?: PurchaseSaleProduct[];
    },
  ) {
    this._id = _id ?? randomUUID();
    this._props = { saleId };
    this._created_at = new Date();
    this._sale = _sale ?? Sale.prototype;
    this._purchaseSaleProducts = _purchaseSaleProducts ?? [
      PurchaseSaleProduct.prototype,
    ];
  }

  static create(
    { saleId }: PurchaseProps,
    {
      _id,
      _sale,
      _purchaseSaleProducts,
    }: {
      _id?: string;
      _sale?: Sale;
      _purchaseSaleProducts?: PurchaseSaleProduct[];
    },
  ): Purchase {
    return new Purchase(
      {
        saleId,
      },
      {
        _id,
        _sale,
        _purchaseSaleProducts,
      },
    );
  }
}
