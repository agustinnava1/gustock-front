import { useState } from "react"
import { formatCurrency } from "../helper/format";

export const useCalculateTotal = (listaVentas) => {

  const totalEfectivo = () => {
    let total = 0;

    for (let venta of listaVentas) {
      total += venta.pagoEfectivo;
    }

    return formatCurrency(total);
  };

  const totalDebito = () => {
    let total = 0;

    for (let venta of listaVentas) {
      total += venta.pagoDebito;
    }

    return formatCurrency(total);
  };

  const totalCredito = () => {
    let total = 0;

    for (let venta of listaVentas) {
      total += venta.pagoCredito;
    }

    return formatCurrency(total);
  };

  const totalCodigoQr = () => {
    let total = 0;

    for (let venta of listaVentas) {
      total += venta.pagoCodigoQr;
    }

    return formatCurrency(total);
  };

  const totalFinal = () => {
    let total = 0;

    for (let venta of listaVentas) {
      total += venta.total;
    }

    return formatCurrency(total);
  };

  return {
    totalEfectivo,
    totalDebito,
    totalCredito,
    totalCodigoQr,
    totalFinal
  }

}