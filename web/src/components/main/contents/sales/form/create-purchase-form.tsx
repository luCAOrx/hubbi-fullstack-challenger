"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { getSaleProductById } from "@api/get-sale-product-by-id";
import { createPurchase } from "@api/create-purchase";
import InfiniteScroll from "@/components/infinite-scroll";
import { Loader2 } from "lucide-react";
import { revalidatePurchases } from "@/helpers/revalidate-purchases";
import LoadingButton from "@/components/loading-button";

interface SaleProducts {
  saleProductId: string;
  productName: string;
}

interface CreatePurchaseFormProps {
  saleId: string;
  saleName: string;
}

const CreateSaleFormSchema = z.object({
  saleProductId: z
    .array(z.string())
    .refine((value) => value.some((product) => product), {
      message: "Você deve selecionar pelo menos um item.",
    }),
});

export default function CreatePurchaseForm({
  saleId,
  saleName,
}: CreatePurchaseFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saleProducts, setSaleProducts] = useState<SaleProducts[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const form = useForm<z.infer<typeof CreateSaleFormSchema>>({
    resolver: zodResolver(CreateSaleFormSchema),
    defaultValues: {
      saleProductId: [],
    },
  });

  async function handleGetSaleProductById() {
    await getSaleProductById({ saleId }, { page }).then(async (response) => {
      setSaleProducts(response.data);
      setPage(page + 1);

      if (response.data.length < 10) {
        setHasMore(false);
      }
      setLoading(false);
    });

    setSaleProducts((prev) => [...saleProducts, ...prev]);
  }

  async function onSubmit(data: z.infer<typeof CreateSaleFormSchema>) {
    await createPurchase({
      saleId,
      saleProductId: data.saleProductId.join(","),
    }).then(async (response) => {
      form.setError("saleProductId", {
        message: response.message,
      });

      if (response.statusCode === 400) return;

      form.reset();

      toast({
        className: "bg-emerald-700 w-72",
        title: "Você realizou a compra com sucesso!",
      });
      setIsDialogOpen(false);

      await revalidatePurchases();
    });
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger
          asChild
          onClick={() => {
            handleGetSaleProductById();
            setIsDialogOpen(true);
          }}
        >
          <Button>Cadastrar compra</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-start">
          <DialogHeader>
            <DialogTitle>Nova compra da venda: {saleName}</DialogTitle>
            <DialogDescription>Cadastrar uma nova compra</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              method="POST"
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="saleProductId"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel
                        className={cn(
                          form.getFieldState("saleProductId").error
                            ? "text-red-500"
                            : null,
                        )}
                      >
                        Selecione o(s) produto(s) que deseja
                      </FormLabel>
                    </div>
                    <ScrollArea className="h-48 w-48 rounded-md border">
                      {saleProducts.map(({ saleProductId, productName }) => (
                        <FormField
                          key={saleProductId}
                          control={form.control}
                          name="saleProductId"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={saleProductId}
                                className="flex flex-row items-start space-x-3 space-y-0 py-2 p-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      saleProductId,
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            saleProductId,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== saleProductId,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    form.getFieldState("saleProductId").error
                                      ? "text-red-500"
                                      : "font-normal",
                                  )}
                                >
                                  {productName}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <InfiniteScroll
                        hasMore={hasMore}
                        isLoading={loading}
                        next={handleGetSaleProductById}
                        threshold={1}
                      >
                        {hasMore && (
                          <Loader2 className="my-4 mx-20 h-8 w-8 animate-spin" />
                        )}
                      </InfiniteScroll>
                    </ScrollArea>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => form.reset()}>
                    Cancelar
                  </Button>
                </DialogClose>
                <LoadingButton isSubmitting={form.formState.isSubmitting} />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
