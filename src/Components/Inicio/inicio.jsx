import s from "./inicio.module.css";
import logo from "./Cooking-logo.png";
import { Link } from "react-router-dom";



export default function Inicio(){


    return(

        <div className={s.container}>
            <img  className={s.logo} src={logo} alt="cooking" />
            <Link to="/home">
             <button className={s.boton}>Entrar</button>
            </Link>
        </div>

    )



}