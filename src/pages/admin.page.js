import { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import LocalService from "../services/local.service";

export const AdminPage = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    LocalService.getAll().then(data => {
      setSucursales(data)
    })
  }, [])

  const locales = sucursales.filter(local => local.tipo === 'LOCAL');
  const depositos = sucursales.filter(deposito => deposito.tipo === 'DEPOSITO');

  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-[42px] my-5">Mis Locales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locales.map(local => (
            <div className="bg-white border rounded-lg shadow">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold text-gray-900">{local.nombre}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{local.direccion}</p>
                <Link to={`/local/${local.id}`}>
                  <Button label="Ingresar" size="small" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-[42px] my-5">Mis Depósitos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        </div>
      </div>
    </div>
  )
}