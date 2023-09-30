import { useState, useEffect } from 'react';
import LocalServicio from '../services/local.servicio';

function VentaFiltros() {
  const [listaLocales, setListaLocales] = useState([]);
  const [listaMetodosPago, setListaMetodosPago] = useState(["TODOS", "EFECTIVO", "DEBITO", "CREDITO", "CODIGOQR"]);
  const [listaCantidades, setListaCantidades] = useState([10, 20, 30, 40, 50, "TODOS"]);

  useEffect(() => {
    const fetchLocales = LocalServicio.listarLocales().then((res) => {
      const localesWithTodos = [{ nombre: 'TODOS', valor: null }, ...res];
      setListaLocales(localesWithTodos);
    });

    Promise.all([fetchLocales])
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return {
    listaLocales,
    listaMetodosPago,
    listaCantidades,
  };
}

export default VentaFiltros;
