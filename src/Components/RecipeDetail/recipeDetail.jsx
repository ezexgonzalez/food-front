import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getRecipeById } from "../../reducer/actions";
import Nav from "../home/nav";
import { useEffect } from "react";
import s from "./recipeDetail.module.css";
import tick from "./tick2.png";
import Loader from "../Loader/loader";
import Footer from "../Footer/Footer";



function RecipeDetail(props) {



    useEffect(() => {
        props.getRecipeById(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.getRecipeById])

    console.log(props)

    let params = useParams();

    let diets = props.recipe.diets ? props.recipe.diets : props.recipe.types;

    console.log(props.recipe.analyzedInstructions);

    let instrunctions = props.recipe.analyzedInstructions && props.recipe.analyzedInstructions.length > 0 ? props.recipe.analyzedInstructions[0].steps : props.recipe.steps ;
    
    if(props.recipe.hasOwnProperty("title")){
        return (
            <div>
                <Nav />
                <div className={s.card}>
                    <div className={s.mainContainer}>
                        <img className={s.imgRecipe} src={props.recipe.image} alt="recipeImage" />
                        <div className={s.infoContainer}>
                            <span className={s.title}>{props.recipe.title}</span>
                            <div className={s.pContainer}>
                                <div>
                                    <span className={s.subtitle}>Type Diets</span>
                                    {
                                        diets ? diets.map(d => (
                                            <div key={d.name ? d.name : d}>
                                                <span className={s.typeText}>{d.name ? d.name : d}</span>
                                                <img className={s.tick} src={tick} alt="tick" />
                                            </div>
                                        )) : ""
                                    }
                                </div>
                                <div>
                                    {props.recipe.dishTypes ? <span className={s.subtitle}>Type Dish</span>:""}
                                    {
                                        props.recipe.dishTypes ? props.recipe.dishTypes.map(d => (
                                            <div key={d.name ? d.name : d}>
                                                <span className={s.typeText}>{d.name ? d.name : d}</span>
                                                <span>🧆</span>
                                            </div>
                                        )) : ""
                                    }
    
                                </div>
                                <div className={s.punctuation}>
                                    <span className={s.subtitle2}>Score</span>
                                    <span className={s.number}>{props.recipe.spoonacularScore}</span>
                                    <span className={s.subtitle2}>Helthy Level</span>
                                    <span className={s.number}>{props.recipe.healthScore}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className={s.summary}>Summary</span>
                        <div className={s.summaryContainer}>
                            <div dangerouslySetInnerHTML={{ __html: props.recipe.summary }} />
                        </div>
    
    
                        <span className={s.summary}>Instructions</span>
                        {
                            
                            instrunctions && instrunctions.length > 0 ? instrunctions.map(step =>(
                                <div className={s.steps} key={step.number}>
                                    <span className={s.step}>Step: {step.number}</span>
                                    {step.ingredients && step.ingredients.length > 0 ? <span className={s.textIng}>Ingredients</span> : ""}
                                    <div>
                                    {
                                        step.ingredients && step.ingredients.length > 0 ? step.ingredients.map(i =>(
                                            <span key={i.id} className={s.ingredients}>{i.name}</span>
                                        )) : ""
                                    }
                                    </div>
                                    <p className={s.parrafo}>{step.step}</p>
                                </div> 
    
                            )) : ""
                        }
                    </div>                
                </div>
                <Footer/>
            </div>
        )
    }else{
        return(
            <Loader/>
        )
    }
    

}

function mapStateToProps(state) {

    return {
        recipe: state.recipeDetail
    }

}


export default connect(mapStateToProps, { getRecipeById })(RecipeDetail);