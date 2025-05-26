interface UsePaginationProps {
  page: number;
  perPage: number;
  totalCount: number;
}

interface GeneratePagesProps {
  page: number;
  totalPages: number;
}

export const ELLIPSIS_LEFT = -10;
export const ELLIPSIS_RIGHT = -20;

function generatePages({ page, totalPages }: GeneratePagesProps) {
  const currentPage = Math.min(page, totalPages);
  const total = Math.max(1, totalPages);

  if (total <= 7) {
    return Array.from({ length: total }).map((_, index) => index + 1);
  }

  if (currentPage < 3) {
    return [1, 2, 3, ELLIPSIS_LEFT, total - 1, total];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, ELLIPSIS_LEFT, total - 1, total];
  }

  if (currentPage > total - 2) {
    return [1, 2, ELLIPSIS_RIGHT, total - 1, total];
  }

  if (currentPage === total - 2) {
    return [1, 2, ELLIPSIS_RIGHT, total - 3, total - 2, total - 1, total];
  }

  return [
    1,
    ELLIPSIS_LEFT,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    ELLIPSIS_RIGHT,
    total,
  ];
}

export function usePagination({
  page,
  perPage,
  totalCount,
}: UsePaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);
  const pages = generatePages({ page, totalPages });

  const isCurrentPage = (index: number) => index === page;

  return { pages, isCurrentPage, totalPages };
}
