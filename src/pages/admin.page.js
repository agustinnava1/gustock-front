import { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import LocalService from "../services/local.servicio";

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
    <div className="container m-5">
      <div>
        <h2 className="sm:text-4xl text-5xl font-medium text-gray-600 mb-5">Mis Locales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {locales.map(local => (
            <div className="border text-center rounded drop-shadow">
              <div className="bg-blue-500 py-5">
                <i className="bi bi-shop text-white text-8xl"></i>
              </div>
              <div className="bg-white  p-5">
                <h5 className="mb-2 text-2xl font-bold text-blue-900">{local.nombre}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{local.direccion}</p>
                <Link to={`/local/${local.id}`}>
                  <Button label="Ingresar" size="small" className="hover:!bg-blue-600 w-1/2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="sm:text-4xl text-5xl font-medium title-font text-gray-600 my-5">Mis Depósitos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {depositos.map(deposito => (
            <div className="border text-center rounded drop-shadow">
              <div className="bg-cyan-500 py-5">
                <i className="bi bi-shop text-white text-8xl"></i>
              </div>
              <div className="bg-white p-5">
                <h5 className="mb-2 text-2xl font-bold text-cyan-900">{deposito.nombre}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{deposito.direccion}</p>
                <Link to={`/local/${deposito.id}`}>
                  <Button label="Ingresar" size="small" className="!bg-cyan-500 !border-cyan-500 hover:!bg-cyan-600 w-1/2"/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}