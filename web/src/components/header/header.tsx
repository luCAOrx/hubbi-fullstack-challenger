"use client";

import React from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="w-full h-full border-b mb-10 flex justify-between items-center"
      aria-label="Cabeçalho"
    >
      <Link
        href="/"
        title="Início"
        aria-label="Botão da logo do site para ir ao início"
        className="max-md:hidden ml-4"
      >
        <Image
          src={Logo}
          priority
          alt="Logo da Top Aves Ornamentais"
          className="h-16 w-16"
        />
      </Link>

      <Button
        className="mr-4 flex justify-between"
        title="Alterar tema"
        aria-label="Botão para alterar o tema"
        variant="outline"
        size="lg"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <Sun
          aria-label="Ícone do tema claro"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          aria-label="Ícone do tema escuro"
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="font-medium text-sm">Alterar tema</span>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}
