import Header from "@/components/header/header";
import { Main } from "@/components/main";
import Purchases from "@/components/main/contents/purchases/purchases";
import PurchasesSkeleton from "@/components/main/contents/purchases/purchases-skeleton";
import Sales from "@/components/main/contents/sales/sales";
import SalesSkeleton from "@/components/main/contents/sales/sales-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

type SearchParamsProps = Promise<{
  vendaPagina: number;
  compraPagina: number;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { vendaPagina, compraPagina } = (await searchParams) || 1;

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="purchases">Compras</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <Main.Root>
              <Main.Content>
                <Suspense fallback={<SalesSkeleton />}>
                  <Sales saleSearchParam={vendaPagina} />
                </Suspense>
              </Main.Content>
            </Main.Root>
          </TabsContent>
          <TabsContent value="purchases">
            <Main.Root>
              <Main.Content>
                <Suspense fallback={<PurchasesSkeleton />}>
                  <Purchases purchaseSearchParam={compraPagina} />
                </Suspense>
              </Main.Content>
            </Main.Root>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
