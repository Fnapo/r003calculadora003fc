import "../css/Boton.css";

import { esOperador } from "../funciones";
import React, { FC } from "react";
/*
class BotonProps {
    children: string;
    OnClick: (valor) => void;
}*/

interface BotonProps {
    NoActivo: boolean;
    OnClick: (valor: string) => void;
    caracter: string;
}

const Boton: FC<BotonProps> = ({ NoActivo, OnClick, caracter }) => {
    /*
            const esOperador = (texto) => {
                return (isNaN(+texto) && (texto !== '.') && (texto !== '='))
            }*/

    return (
        <button
            className={`text-white cuerpo btn ${esOperador(caracter) ? "btn-success" : "btn-primary"
                }`}
            disabled={NoActivo}
            onClick={() => OnClick(caracter)}
        >
            {caracter}
        </button>
    );
};

export default Boton;
