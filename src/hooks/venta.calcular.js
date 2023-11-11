import { useState } from "react"
import { formatCurrency } from "../helper/format";

export const useCalculateTotal = (listSales) => {

  const totalCash = () => {
    let total = 0;

    for (let sale of listSales) {
      total += sale.cashPayment;
    }

    return formatCurrency(total);
  };

  const totalDebit = () => {
    let total = 0;

    for (let sale of listSales) {
      total += sale.debitPayment;
    }

    return formatCurrency(total);
  };

  const totalCredit = () => {
    let total = 0;

    for (let sale of listSales) {
      total += sale.creditPayment;
    }

    return formatCurrency(total);
  };

  const totalCodeQr = () => {
    let total = 0;

    for (let sale of listSales) {
      total += sale.qrCodePayment;
    }

    return formatCurrency(total);
  };

  const totalFinal = () => {
    let total = 0;

    for (let sale of listSales) {
      total += sale.total;
    }

    return formatCurrency(total);
  };

  return {
    totalCash,
    totalDebit,
    totalCredit,
    totalCodeQr,
    totalFinal
  }

}