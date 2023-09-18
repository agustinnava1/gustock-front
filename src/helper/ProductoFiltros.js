import { useState, useEffect } from 'react';
import ProveedorServicio from '../services/proveedor.service';
import RubroServicio from '../services/rubro.service';
import MarcaServicio from '../services/marca.service';

function ProductoFiltros() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [listaRubros, setListaRubros] = useState([]);
  const [listaMarcas, setListaMarcas] = useState([]);

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
    listaProveedores,
    listaRubros,
    listaMarcas,
  };
}

export default ProductoFiltros;




