import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import LocalService from '../services/local.service';

export const LocalPage = () => {

  const [local, setLocal] = useState(null);
  const location = useLocation();
  const localId = location.state.localId;

  useEffect(() => {
    if(!localId) return;
    
    LocalService.getById(localId).then(data => {setLocal(data)})
  }, []);
  
  return(
    <div>
      <h1>{local.id}</h1>
      <h2>{local.nombre}</h2>
      <h3>{local.direccion}</h3>
    </div>
  )
}

