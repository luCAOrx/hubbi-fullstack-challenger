"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPurchaseSaleProductByPurchaseId } from "@api/get-purchase-sale-product-by-purchase-id";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

interface PurchaseSaleProduct {
  purchaseSaleProductId: string;
  productName: string;
  saleName: string;
}

interface PurchaseDetailsCardButtonProps {
  purchaseId: string;
  saleName: string;
}

export default function PurchaseDetailsCardButton({
  purchaseId,
  saleName,
}: PurchaseDetailsCardButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchaseSaleProducts, setPurchaseSaleProducts] = useState<
    PurchaseSaleProduct[]
  >([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function handleGetPurchaseSaleProductByPurchaseId() {
    await getPurchaseSaleProductByPurchaseId({ purchaseId }, { page }).then(
      (response) => {
        setPurchaseSaleProducts(response.data);
        setPage(page + 1);

        if (response.data.length < 10) {
          setHasMore(false);
        }
        setLoading(false);
      },
    );

    setPurchaseSaleProducts((prev) => [...purchaseSaleProducts, ...prev]);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger
          asChild
          onClick={() => {
            handleGetPurchaseSaleProductByPurchaseId();
            setIsDialogOpen(true);
          }}
        >
          <Button>Ver detalhes</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-start">
          <DialogHeader>
            <DialogTitle>Detalhes da compra</DialogTitle>
            <DialogDescription>
              Detalhes da compra da venda: {saleName}
            </DialogDescription>
          </DialogHeader>
          <h1 className="font-semibold">Foi comprado o(s) produto(s):</h1>
          <ScrollArea
            aria-label="Área de rolagem dos produtos"
            className="h-48 w-64 rounded-md border"
          >
            {purchaseSaleProducts.map(
              ({ purchaseSaleProductId, productName }) => (
                <div className="mx-3 my-2" key={purchaseSaleProductId}>
                  <span
                    aria-label="Nome do produto comprado"
                    className="font-sm text-foreground"
                  >
                    {productName}
                  </span>
                </div>
              ),
            )}
            <InfiniteScroll
              hasMore={hasMore}
              isLoading={loading}
              next={handleGetPurchaseSaleProductByPurchaseId}
              threshold={1}
            >
              {hasMore && (
                <Loader2 className="my-4 mx-20 h-8 w-8 animate-spin" />
              )}
            </InfiniteScroll>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
