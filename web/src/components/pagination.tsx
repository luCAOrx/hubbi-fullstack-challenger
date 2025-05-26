"use client";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useCreateQueryString } from "@/hooks/use-create-query-string";
import {
  ELLIPSIS_LEFT,
  ELLIPSIS_RIGHT,
  usePagination,
} from "@/hooks/use-pagination";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  perPage: number;
  pages: number;
  totalCount: number;
  queryParamName: string;
}

export function Pagination({
  perPage,
  pages,
  totalCount,
  queryParamName,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get(queryParamName)
    ? Number(searchParams.get(queryParamName))
    : 1;

  const { pages: pagesNumber } = usePagination({
    page,
    totalCount,
    perPage,
  });

  const createQueryString = useCreateQueryString(searchParams);

  if (page <= 0) {
    redirect("/");
  }

  function handlePageChange(targetPage: number) {
    if (targetPage - 1 <= 0 || targetPage + 1 > pages) return;
    const query =
      targetPage === 1
        ? pathname
        : `${pathname}?${createQueryString(queryParamName, String(targetPage))}`;

    router.push(query);
  }

  return (
    <PaginationRoot aria-label="Paginação">
      {pages <= 1 ? null : (
        <PaginationContent>
          <div className="block sm:hidden">
            <PaginationPrevious
              href={`${pathname}?${createQueryString(queryParamName, String(page - 1))}`}
              title="Página anterior"
              paginationPreviousTitle="Anterior"
              onClick={() => handlePageChange(page - 1)}
              aria-label="Voltar para à página anterior"
            />
            <span
              className="text-sm font-medium"
              aria-label="Informa a página atual e a quantidade de páginas"
            >
              Página {page} de {pages}
            </span>
            <PaginationNext
              href={`${pathname}?${createQueryString(queryParamName, String(page + 1))}`}
              title="Próxima página"
              paginationNextTitle="Próxima"
              onClick={() => handlePageChange(page + 1)}
              aria-label="Avançar para à próxima página"
            />
          </div>

          <div className="hidden gap-2 sm:flex">
            <PaginationItem hidden={page - 1 <= 0}>
              <PaginationPrevious
                href={`${pathname}?${createQueryString(queryParamName, String(page - 1))}`}
                title="Página anterior"
                paginationPreviousTitle="Anterior"
                onClick={() => handlePageChange(page - 1)}
                aria-label="Ir para à página anterior"
              />
            </PaginationItem>
            {pagesNumber.map((pageNumber) => {
              const isEllipsis =
                pageNumber === ELLIPSIS_LEFT || pageNumber === ELLIPSIS_RIGHT;

              if (isEllipsis) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`${pathname}?${createQueryString(queryParamName, String(pageNumber))}`}
                    title={`Página ${pageNumber}`}
                    aria-label="Informa a quantidade de páginas e a página atual"
                    onClick={() => {
                      router.push(
                        `${pathname}?${createQueryString(queryParamName, String(pageNumber))}`,
                      );
                    }}
                    isActive={!!pageNumber}
                    className={
                      pageNumber === page
                        ? "bg-primary text-primary-foreground"
                        : "outline-none"
                    }
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem hidden={page + 1 > pages}>
              <PaginationNext
                href={`${pathname}?${createQueryString(queryParamName, String(page + 1))}`}
                paginationNextTitle="Próxima"
                title="Próxima página"
                aria-label="Ir para à próxima página"
                onClick={() => handlePageChange(page + 1)}
              />
            </PaginationItem>
          </div>
        </PaginationContent>
      )}
    </PaginationRoot>
  );
}
