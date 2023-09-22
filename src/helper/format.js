import { DateTime } from "luxon";

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

export function formatoHora(time) {
  const timeObject = DateTime.fromISO(`1970-01-01T${time}`, { zone: 'UTC' });
  const formattedTime = timeObject.toFormat('HH:mm');
  return formattedTime;
};

export function formatoFechaCorto(fecha) {
  const dateObject = DateTime.fromISO(fecha, { zone: 'America/Argentina/Buenos_Aires' });
  const formattedDate = dateObject.toFormat('dd/MM/yyyy');
  return formattedDate;
};

export function formatoFechaCompleto(fecha) {
  const dateObject = DateTime.fromISO(fecha, { zone: 'America/Argentina/Buenos_Aires' });
  const formato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaCompleta = dateObject.toLocaleString(formato);
  return fechaCompleta;
};