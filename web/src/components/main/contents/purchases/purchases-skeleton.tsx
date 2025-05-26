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

export default function PurchasesSkeleton() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="font-semibold text-4xl text-primary mb-4">Compras</h1>
          <span className="flex flex-row gap-2 justify-center items-center text-muted-foreground">
            Total de <Skeleton className="w-12 h-4" /> compras
          </span>
        </div>
      </div>
      <div className="border rounded-lg p-4 mb-10">
        <Table>
          <TableCaption>Uma lista de suas compras.</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[380px]">Nome da venda</TableHead>
              <TableHead className="w-52 pl-5">Criado em</TableHead>
              <TableHead className="pl-14">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="w-[180px]">
                <Skeleton className="w-[180px] h-4" />
              </TableCell>
              <TableCell className="w-36">
                <Skeleton className="w-24  h-4" />
              </TableCell>
              <TableCell className="w-36">
                <Skeleton className="w-36 h-4" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
