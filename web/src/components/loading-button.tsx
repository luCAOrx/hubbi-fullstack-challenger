"use client";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ButtonLoadingProps {
  isSubmitting: boolean;
}

export default function LoadingButton({ isSubmitting }: ButtonLoadingProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      aria-label="Botão para cadastrar"
    >
      {isSubmitting ? (
        <div className="inline-flex items-center justify-center h-9 w-[61px]">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        "Cadastrar"
      )}
    </Button>
  );
}
