import { randomUUID } from "node:crypto";

import { Purchase } from "../purchase/purchase";
import { SaleProduct } from "../sale-product/sale-product";

interface PurchaseSaleProductProps {
  purchaseId: string;
  saleProductId: string;
}

export class PurchaseSaleProduct {
  private readonly _id: string;
  private _props: PurchaseSaleProductProps;
  private readonly _created_at: Date;
  private readonly _purchase?: Purchase | undefined;
  private readonly _saleProduct?: SaleProduct | undefined;

  public get id(): string {
    return this._id;
  }

  public get props(): PurchaseSaleProductProps {
    return this._props;
  }
  public set props(value: PurchaseSaleProductProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get purchase(): Purchase | undefined {
    return this._purchase;
  }

  public get saleProduct(): SaleProduct | undefined {
    return this._saleProduct;
  }

  constructor(
    { purchaseId, saleProductId }: PurchaseSaleProductProps,
    {
      _id,
      _purchase,
      _saleProduct,
    }: {
      _id?: string;
      _purchase?: Purchase;
      _saleProduct?: SaleProduct;
    },
  ) {
    this._props = { purchaseId, saleProductId };
    this._id = _id ?? randomUUID();
    this._purchase = _purchase;
    this._saleProduct = _saleProduct;
    this._created_at = new Date();
  }

  static create(
    { purchaseId, saleProductId }: PurchaseSaleProductProps,
    {
      _id,
      _purchase,
      _saleProduct,
    }: {
      _id?: string;
      _purchase?: Purchase;
      _saleProduct?: SaleProduct;
    },
  ): PurchaseSaleProduct {
    return new PurchaseSaleProduct(
      {
        purchaseId,
        saleProductId,
      },
      {
        _id,
        _purchase,
        _saleProduct,
      },
    );
  }
}
