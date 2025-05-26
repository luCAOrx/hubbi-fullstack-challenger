"use server";

import { revalidateTag } from "next/cache";

export async function revalidateSales() {
  revalidateTag("get-sales");
}
