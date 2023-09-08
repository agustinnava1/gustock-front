import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import '../index.css'

function Login() {
	const[userDetail, setUserDetail] = useState({
		username: "",
		password: ""
	})

	const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value
    });
  };

	return (
	  <div className="text-center">
			<div className="form-signin">
				<h1 className="fw-bold">GUSTOCK</h1>
				<h2 className="mb-5 fw-normal">Ingreso al sistema</h2>
				<form>
					<div className="form-floating mb-3">
						<input name="username" type="text" className="form-control m-0" autoFocus
									 value={userDetail.username} onChange={handleChange}></input>
						<label>Usuario</label>
					</div>

					<div className="form-floating mb-2">
						<input name="password" type="password" className="form-control m-0" 
									 value={userDetail.password} onChange={handleChange}></input>
						<label>Contraseña</label>
						<div type="hidden">
							<div className="text-start mt-3">
								<input type="checkbox" className="form-check-input fs-5 me-2 mt-0 border border-dark border-2"></input>
								<span>Mostrar Contraseña</span>
							</div>
						</div>
					</div>

					<span className="text-danger"></span>

					<button className="w-100 btn btn-lg btn-primary rounded-pill mt-3" type="submit">Iniciar sesión</button>
				</form>
			</div>
		</div>
	);
}

export default Login;