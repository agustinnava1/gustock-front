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
    <div className="m-5">
      <div>
        <h2 className="sm:text-4xl text-5xl font-medium title-font text-gray-900 mb-5">Mis Locales</h2>
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
        <h1 className="sm:text-4xl text-5xl font-medium title-font text-gray-900| my-5">Mis Depósitos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {depositos.map(deposito => (
            <div className="bg-white border rounded-lg shadow">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold text-gray-900">{deposito.nombre}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{deposito.direccion}</p>
                <Link to={`/local/${deposito.id}`}>
                  <Button label="Ingresar" size="small" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}