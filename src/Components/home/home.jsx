
import Nav from "./nav"
import Cards from "./Cards/Cards";
import s from "./home.module.css";
import Footer from "../Footer/Footer";

export default function Home (){


    return (

        <div className={s.background}>
            <Nav/>
            <div className={s.textContainer}>
                <span className={s.title}>Look for your recipes!</span>
                <span className={s.description}>Look for your favorite recipes, we have more than 100 available!</span>
              <Cards /> 
            </div>
            <Footer/>
        </div>
    )

}