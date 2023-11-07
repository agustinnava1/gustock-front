import { DateTime } from "luxon";

export function formatCurrency(number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

export function formatTime(time) {
  const timeObject = DateTime.fromISO(`1970-01-01T${time}`, { zone: 'UTC' });
  const formattedTime = timeObject.toFormat('HH:mm');
  return formattedTime;
};

export function formatDate(fecha) {
  const dateObject = DateTime.fromISO(fecha, { zone: 'America/Argentina/Buenos_Aires' });
  const formattedDate = dateObject.toFormat('dd/MM/yy');
  return formattedDate;
};

export function formatDateTime(fecha) {
  const dateObject = DateTime.fromISO(fecha, { zone: 'America/Argentina/Buenos_Aires' });
  const formattedDate = dateObject.toFormat('dd/MM/yy HH:mm')
  return formattedDate;
}

export function formatFullDate(fecha) {
  const dateObject = DateTime.fromISO(fecha, { zone: 'America/Argentina/Buenos_Aires' });
  const formato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaCompleta = dateObject.toLocaleString(formato);
  return fechaCompleta;
};