import s from "./nav.module.css";
import Logo from "./Nav-Logo.png";
import {Link} from "react-router-dom"

export default function Nav (){

    return( 

        <nav className={s.nav}>
             <Link to="/home">
                <img className={s.logo} src={Logo} alt="logo" />
             </Link>
            <Link to="/recipes/create">
                <button className={s.button}>New recipe</button>
            </Link>
        </nav>
    )
}