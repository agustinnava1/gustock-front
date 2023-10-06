import { useState, useEffect } from 'react';
import ProveedorServicio from '../services/proveedor.servicio';
import RubroService from '../services/rubro.servicio';
import MarcaServicio from '../services/marca.servicio';

function ProductFilters() {
  const [listProviders, setListProviders] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const [listQuantities, setListQuantities] = useState([10, 20, 30, 40, 50, "TODOS"]);

  useEffect(() => {
    const fetchProveedores = ProveedorServicio.getAll().then((res) => setListProviders(res));
    const fetchRubros = RubroService.getAll().then((res) => setListCategories(res));
    const fetchMarcas = MarcaServicio.listar().then((res) => setListBrands(res));

    Promise.all([fetchProveedores, fetchRubros, fetchMarcas])
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return {
    listProviders,
    listCategories,
    listBrands,
    listQuantities,
  };
}

export default ProductFilters;




