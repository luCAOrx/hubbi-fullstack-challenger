export function formatDateHelper(date: Date) {
  return new Date(date)
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-");
}
