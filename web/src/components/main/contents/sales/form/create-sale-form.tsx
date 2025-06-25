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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createSale } from "@api/create-sale";
import { getProducts } from "@api/get-products";
import { Checkbox } from "@/components/ui/checkbox";
import InfiniteScroll from "@/components/infinite-scroll";
import { Loader2 } from "lucide-react";
import { revalidateSales } from "@/helpers/revalidate-sales";
import LoadingButton from "@/components/loading-button";

interface Products {
  id: string;
  name: string;
}

const CreateSaleFormSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "O nome do produto deve ter mais que 6 characters.",
    })
    .max(150, {
      message: "O nome do produto deve ter menos que 150 characters.",
    }),
  products: z
    .array(z.string())
    .refine((value) => value.some((product) => product), {
      message: "Você deve selecionar pelo menos um item.",
    }),
});

export default function CreateSaleForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const form = useForm<z.infer<typeof CreateSaleFormSchema>>({
    resolver: zodResolver(CreateSaleFormSchema),
    defaultValues: {
      name: "",
      products: [],
    },
  });

  async function handleGetProducts() {
    await getProducts({ page }).then(async (response) => {
      setProducts(response.data);
      setPage(page + 1);

      if (response.data.length < 10) {
        setHasMore(false);
      }
      setLoading(false);
    });

    setProducts((prev) => [...products, ...prev]);
  }

  async function onSubmit(data: z.infer<typeof CreateSaleFormSchema>) {
    await createSale({
      name: data.name,
      products: data.products.join(","),
    }).then(async (response) => {
      form.setError("name", {
        message:
          response.message === "The field name should only accept letters"
            ? "O nome do produto deve conter apenas letras."
            : response.message,
      });

      if (response.statusCode === 400) return;

      form.reset();

      toast({
        className: "bg-emerald-700 w-72",
        title: "Você realizou a venda com sucesso!",
      });
      setIsDialogOpen(false);

      await revalidateSales();
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          handleGetProducts();
          setIsDialogOpen(true);
        }}
      >
        <Button title="Botão para cadastrar venda">Cadastrar venda</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-start">
        <DialogHeader>
          <DialogTitle title="Título do formulário">Nova venda</DialogTitle>
          <DialogDescription title="Descrição do formulário">
            Cadastrar uma nova venda
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="POST"
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    title="Título da entrada nome"
                    className={cn(
                      form.getFieldState("name").error ? "text-red-500" : null,
                    )}
                  >
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Produtos de limpeza" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel
                      title="Título da entrada produtos"
                      className={cn(
                        form.getFieldState("products").error
                          ? "text-red-500"
                          : null,
                      )}
                    >
                      Produtos
                    </FormLabel>
                  </div>
                  <ScrollArea
                    aria-label="Área de rolagem dos produtos"
                    className="h-48 w-48 rounded-md border"
                  >
                    {products.map((product) => (
                      <FormField
                        key={product.id}
                        control={form.control}
                        name="products"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={product.id}
                              className="flex flex-row items-start space-x-3 space-y-0 py-2 p-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(product.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          product.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== product.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel
                                aria-label="Título da caixa de seleção do campo produtos"
                                className={cn(
                                  form.getFieldState("products").error
                                    ? "text-red-500"
                                    : "font-normal",
                                )}
                              >
                                {product.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <InfiniteScroll
                      hasMore={hasMore}
                      isLoading={loading}
                      next={handleGetProducts}
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
  );
}
