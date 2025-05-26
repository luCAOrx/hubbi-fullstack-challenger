export type Status = "Pendente" | "Finalizada";

export interface Sale {
  id: string;
  name: string;
  status: Status;
  products: string;
  created_at: Date;
}

interface CreateSaleRequest {
  name: string;
  products: string;
}

export interface CreateSaleResponse {
  sale: Sale;
  statusCode: number;
  message: string;
  error: string;
}

export const createSale = async (
  createSaleRequest: CreateSaleRequest,
): Promise<CreateSaleResponse> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/create-sale`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: createSaleRequest.name,
        products: createSaleRequest.products,
      }),
    },
  );

  const data: CreateSaleResponse = await response.json();

  return data;
};
