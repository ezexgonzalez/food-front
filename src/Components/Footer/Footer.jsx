import s from "./Footer.module.css";
import Logo from "../home/Nav-Logo.png";


export default function Footer() {


    return (

        <footer className={s.footer}>
            <div className={s.containerMain}>
                <div className={s.containerLogo}>
                    <img className={s.logo} src={Logo} alt="" />
                    <span className={s.des}>Enjoy the best recipes in our app.</span>
                </div>
            </div>
            <div className={s.text}>
                <span>©2022 Henry. All rights reserved.</span>
                <span>Ezequiel Gonzalez</span>
            </div>
        </footer>

    )

}