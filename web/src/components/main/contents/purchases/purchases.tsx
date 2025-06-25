import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { getPurchases } from "@api/get-purchases";
import { Pagination } from "@/components/pagination";
import { formatDateHelper } from "@/helpers/format-date-helper";
import PurchaseDetailsCardButton from "./purchase-details-card-button";

interface PurchasesProps {
  purchaseSearchParam: number;
}

export default async function Purchases({
  purchaseSearchParam,
}: PurchasesProps) {
  const purchases = await getPurchases({ page: purchaseSearchParam });

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1
            title="Titulo da aba compras"
            className="font-semibold text-4xl text-primary mb-4"
          >
            Compras
          </h1>
          <span
            title={`Descrição do total de ${purchases.totalPurchases} compras`}
            className="text-lg font-normal text-muted-foreground"
          >
            Total de {purchases.totalPurchases} compras
          </span>
        </div>
      </div>
      <div className="border rounded-lg p-4 mb-10">
        <Table>
          {purchases.data.length === 0 ? (
            <TableCaption title="Não há nenhuma compra no momento.">
              Não há nenhuma compra no momento.
            </TableCaption>
          ) : (
            <TableCaption title="Uma lista de suas compras.">
              Uma lista de suas compras.
            </TableCaption>
          )}
          <TableHeader>
            {purchases.data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[380px]">Nome da venda</TableHead>
                <TableHead className="w-52">Criado em</TableHead>
                <TableHead className="pl-10">Ações</TableHead>
              </TableRow>
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[380px]">Nome da venda</TableHead>
                <TableHead className="w-52">Criado em</TableHead>
                <TableHead className="pl-10 w-36">Ações</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody aria-label="Corpo da tabela">
            {purchases.data.map(
              ({ purchaseId, saleName, purchase_created_at }) => (
                <TableRow key={purchaseId} className="hover:bg-transparent">
                  <TableCell className="w-[180px]">{saleName}</TableCell>
                  <TableCell
                    aria-label="Data da criação da compra"
                    className="w-36"
                  >
                    {formatDateHelper(purchase_created_at)}
                  </TableCell>
                  <TableCell className="w-36">
                    <PurchaseDetailsCardButton
                      purchaseId={purchaseId}
                      saleName={saleName}
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        perPage={purchases.perPage}
        pages={purchases.pages}
        totalCount={purchases.totalPurchases}
        queryParamName="compraPagina"
      />
    </>
  );
}
