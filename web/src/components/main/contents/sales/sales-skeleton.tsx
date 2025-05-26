import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "@/components/ui/button";

export default function SalesSkeleton() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold text-primary mb-4">Vendas</h1>
          <span className="flex flex-row gap-2 justify-center items-center text-muted-foreground">
            Total de <Skeleton className="w-12 h-4" /> vendas
          </span>
        </div>

        <Button disabled>Cadastrar venda</Button>
      </div>
      <div className="border rounded-lg p-4 mb-10">
        <Table>
          <TableCaption>Uma lista de suas vendas.</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px]">Nome</TableHead>
              <TableHead className="pl-20 w-52">Status</TableHead>
              <TableHead className="w-36">Criado em</TableHead>
              <TableHead className="pl-14 w-36">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell>
                <Skeleton className="w-[180px] h-4" />
              </TableCell>
              <TableCell className="w-36 pl-16">
                <Skeleton className="w-24  h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-36 h-4" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
