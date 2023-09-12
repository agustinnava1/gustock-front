import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import LocalService from '../services/local.service';

export const LocalPage = () => {
  const { id } = useParams();

  const [local, setLocal] = useState([]);

  useEffect(() => {
    loadLocal();
	}, []);

	const loadLocal = async () => {
		  await LocalService.getById(id).then(data => {
      setLocal(data);
    })
	};
  
  return(
    <div>
      <h1>{local.id}</h1>
      <h1>{local.nombre}</h1>
      <h1>{local.direccion}</h1>
      <h1>{local.turnos}</h1>
    </div>
  )
}

