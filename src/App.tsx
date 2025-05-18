//import logo from './logo.svg';
import "./App.css";
import logoFree from "./imagenes/logo.webp";
import { FC, useState } from "react";
import { evaluate } from "mathjs";

import Boton from "./componentes/Boton";
import Pantalla from "./componentes/Pantalla";
import BotonBorrar from "./componentes/BotonBorrar";
import { esOperador } from "./funciones";

const App: FC = () => {
	const ERROR = "Error";
	//const DISABLED = 'disabled';

	const [cadena, setCadena] = useState("");
	const [puntoDecimal, setPuntoDecimal] = useState(false);
	const cadenaErronea = () => {
		return cadena.includes(ERROR) || cadena.includes("Infinity");
	};

	const modificarCadena = (caracter: string) => {
		cadenaErronea() ? setCadena(caracter) : setCadena(cadena + caracter);
		if (caracter === ".") {
			setPuntoDecimal(true);
		} else if (esOperador(caracter)) {
			setPuntoDecimal(false);
		}
	};

	const ultimoCaracterEsPunto = () => {
		return cadena[cadena.length - 1] === ".";
	};

	const ultimoCaracterEsOperador = () => {
		return (
			cadena.length === 0 ||
			esOperador(cadena[cadena.length - 1]) ||
			ultimoCaracterEsPunto()
		);
	};

	const botonOperadorDisabled = () => {
		return ultimoCaracterEsOperador() || cadenaErronea();
	};

	const borrarCadena = () => {
		setCadena("");
		setPuntoDecimal(false);
	};

	const calcularCadena = () => {
		let ayuda = "0";

		try {
			ayuda = evaluate(cadena) + ""; // Una forma de convertir en string
		} catch {
			ayuda = ERROR;
		}
		setPuntoDecimal(cadena.includes("."));
		setCadena(ayuda);
	};

	return (
		<div className="App d-flex p-1 flex-wrap flex-column">
			<header className="col-12 d-flex justify-content-center align-items-center p-1 mb-2">
				<img className="logo-imagen" src={logoFree} alt="Logo de FreeCode" />
			</header>
			<div className="cuerpo">
				<main className="border border-3 border-white rounded-3">
					{/*-- Pantalla -->*/}
					<div className="fila">
						<Pantalla cadena={cadena} />
					</div>
					{/*-- Teclado numérico -->*/}
					<div className="fila">
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="1" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="2" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="3" />
						<Boton
							OnClick={modificarCadena}
							NoActivo={botonOperadorDisabled()}
							caracter="+"
						/>
					</div>
					<div className="fila">
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="4" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="5" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="6" />
						<Boton
							OnClick={modificarCadena}
							NoActivo={botonOperadorDisabled()}
							caracter="-"
						/>
					</div>
					<div className="fila">
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="7" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="8" />
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="9" />
						<Boton
							OnClick={modificarCadena}
							NoActivo={botonOperadorDisabled()}
							caracter="/"
						/>
					</div>
					<div className="fila">
						<Boton
							OnClick={calcularCadena}
							NoActivo={ultimoCaracterEsOperador()}
							caracter="="
						/>
						<Boton OnClick={modificarCadena} NoActivo={false} caracter="0" />
						<Boton
							OnClick={modificarCadena}
							NoActivo={puntoDecimal}
							caracter="."
						/>
						<Boton
							OnClick={modificarCadena}
							NoActivo={botonOperadorDisabled()}
							caracter="*"
						/>
					</div>
					{/*-- Tecla de Borrado -->*/}
					<div className="fila">
						<BotonBorrar OnClick={borrarCadena} />
					</div>
				</main>
			</div>
		</div>
	);
};

export default App;
