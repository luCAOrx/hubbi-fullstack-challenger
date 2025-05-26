export type Status = "Pendente" | "Finalizada";

interface CreatePurchaseRequest {
  saleId: string;
  saleProductId: string;
}

export interface CreatePurchaseResponse {
  purchase: {
    id: string;
    saleId: string;
    created_at: Date;
  };
  statusCode: number;
  message: string;
  error: string;
}

export const createPurchase = async ({
  saleId,
  saleProductId,
}: CreatePurchaseRequest): Promise<CreatePurchaseResponse> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/create-purchase/${saleId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        saleProductId,
      }),
    },
  );

  const data: CreatePurchaseResponse = await response.json();

  return data;
};
