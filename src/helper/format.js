export function formatCurrency(number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

export function formatDate(number) {
  return new Intl.DateTimeFormat("es-sp", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(number));
}

export function formatDateLong(number) {
  return new Intl.DateTimeFormat("es-sp", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(new Date(number));
}

