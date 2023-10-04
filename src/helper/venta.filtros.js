import { useState, useEffect } from 'react';
import LocalServicio from '../services/local.servicio';
import CategoryService from '../services/rubro.servicio';

function VentaFilters() {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState(["TODOS", "EFECTIVO", "DEBITO", "CREDITO", "CODIGOQR"]);
  const [quantities, setQuantities] = useState([10, 20, 30, 40, 50, "TODOS"]);

  useEffect(() => {
    const fetchLocales = LocalServicio.listarLocales().then((res) => {
      const all = [{ nombre: 'TODOS', valor: null }, ...res];
      setStores(all);
    });

    const fetchRubros = CategoryService.getAll().then((res) => {
      setCategories(res);
    });

    Promise.all([fetchLocales, fetchRubros])
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return {
    stores,
    categories,
    paymentMethods,
    quantities,
  };
}

export default VentaFilters;
