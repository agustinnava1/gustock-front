import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
	return (
	  <div class="text-center">
			<div class="form-signin">
				<form method="POST">
					<h1 class="fw-bold">GUSTOCK</h1>
					<h2 class="mb-5 fw-normal">Ingreso al sistema</h2>

					<div class="form-floating mb-3">
						<input name="username" type="text" class="form-control m-0" id="usuario" placeholder="Usuario" autofocus="true"></input>
						<label for="usuario">Usuario</label>
					</div>

					<div class="form-floating mb-2">
						<input name="password" type="password" class="form-control m-0" id="password" placeholder="Contraseña"></input>
						<label for="password">Contraseña</label>
						<div type="hidden">
							<div class="text-start mt-3">
								<input type="checkbox" class="form-check-input fs-5 me-2 mt-0 border border-dark border-2" onclick="show_password()"></input>
								<span>Mostrar Contraseña</span>
							</div>
						</div>
					</div>

					<span class="text-danger"></span>

					<button class="w-100 btn btn-lg btn-primary rounded-pill mt-3" type="submit">Iniciar sesión</button>
				</form>
			</div>
		</div>
	);
}

export default App;