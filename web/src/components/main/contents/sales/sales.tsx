import React from "react";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckCircle, CircleAlert } from "lucide-react";
import { getSales } from "@api/get-sales";

import { formatDateHelper } from "@/helpers/format-date-helper";

import CreatePurchaseForm from "./form/create-purchase-form";
import { Pagination } from "@/components/pagination";
import CreateSaleForm from "./form/create-sale-form";

interface SalesProps {
  saleSearchParam: number;
}

export default async function Sales({ saleSearchParam }: SalesProps) {
  const sales = await getSales({ page: saleSearchParam });

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1
            title="Titulo da aba vendas"
            className="text-4xl font-semibold text-primary mb-4"
          >
            Vendas
          </h1>
          <span
            title={`Descrição do total de ${sales.totalSales} vendas`}
            className="text-lg font-normal text-muted-foreground"
          >
            Total de {sales.totalSales} vendas
          </span>
        </div>
        <CreateSaleForm />
      </div>
      <div className="border rounded-lg p-4 mb-10">
        <Table>
          {sales.data.length === 0 ? (
            <TableCaption title="Não há nenhuma venda no momento">
              Não há nenhuma venda no momento.
            </TableCaption>
          ) : (
            <TableCaption title="Uma lista de suas vendas">
              Uma lista de suas vendas.
            </TableCaption>
          )}
          <TableHeader>
            {sales.data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px]">Nome</TableHead>
                <TableHead className="w-52">Status</TableHead>
                <TableHead className="w-36">Criado em</TableHead>
                <TableHead className="w-36">Ações</TableHead>
              </TableRow>
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px]">Nome</TableHead>
                <TableHead className="pl-20">Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="pl-14">Ações</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody aria-label="Corpo da tabela">
            {sales.data.map((sale) => (
              <TableRow key={sale.id} className="hover:bg-transparent">
                <TableCell className="w-[180px]">{sale.name}</TableCell>
                <TableCell
                  className={cn(
                    "w-52 flex gap-2 mt-1 items-center justify-center",
                    sale.status === "Pendente"
                      ? "text-red-600"
                      : "text-green-600",
                  )}
                >
                  {sale.status}
                  {sale.status === "Pendente" ? (
                    <CircleAlert />
                  ) : (
                    <CheckCircle />
                  )}
                </TableCell>
                <TableCell
                  aria-label="Data da criação da venda"
                  className="w-36"
                >
                  {formatDateHelper(sale.created_at)}
                </TableCell>
                <TableCell className="w-36">
                  <CreatePurchaseForm saleId={sale.id} saleName={sale.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        pages={sales.pages}
        perPage={sales.perPage}
        totalCount={sales.totalSales}
        queryParamName="vendaPagina"
      />
    </>
  );
}
