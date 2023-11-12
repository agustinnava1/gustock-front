import { useState, useEffect } from 'react';
import ShopService from '../services/local.servicio';
import CategoryService from '../services/rubro.servicio';

function VentaFilters() {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState(["EFECTIVO", "DEBITO", "CREDITO", "CODIGOQR"]);
  const [quantities, setQuantities] = useState([10, 20, 30, 40, 50, "TODOS"]);

  useEffect(() => {
    const fetchLocales = ShopService.getAll().then((data) => {
      setShops(data);
    });

    const fetchRubros = CategoryService.getAll().then((data) => {
      setCategories(data);
    });

    Promise.all([fetchLocales, fetchRubros])
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return {
    shops,
    payments,
    categories,
    quantities,
  };
}

export default VentaFilters;
