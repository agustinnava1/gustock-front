import { useState, useEffect } from 'react';
import ProveedorServicio from '../services/proveedor.servicio';
import RubroServicio from '../services/rubro.servicio';
import MarcaServicio from '../services/marca.servicio';

function ProductoFiltros() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [listaRubros, setListaRubros] = useState([]);
  const [listaMarcas, setListaMarcas] = useState([]);
  const [listaCantidades, setListaCantidades] = useState([10, 20, 30, 40, 50, "TODOS"]);

  useEffect(() => {
    const fetchProveedores = ProveedorServicio.listar().then((res) => setListaProveedores(res));
    const fetchRubros = RubroServicio.listar().then((res) => setListaRubros(res));
    const fetchMarcas = MarcaServicio.listar().then((res) => setListaMarcas(res));

    Promise.all([fetchProveedores, fetchRubros, fetchMarcas])
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return {
    listaCantidades,
    listaProveedores,
    listaRubros,
    listaMarcas,
  };
}

export default ProductoFiltros;




