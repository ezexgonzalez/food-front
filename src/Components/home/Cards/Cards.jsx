import React,{useEffect, useState} from 'react';
import Card from './Card.jsx';
import { connect} from 'react-redux';
import { getRecipes, clearArrayRecipe } from '../../../reducer/actions.js';
import s from "./cards.module.css";
import Pagination from "./Pagination/pagination";
import Loader from '../../Loader/loader.jsx';


export function Cards(props) {
   
    
    useEffect(()=>{
        props.getRecipes();
        props.clearArrayRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.getRecipes]);


    console.log("Data",props.recipes);

    const [recipesPage, setRecipesPage] = useState(0);
    const [search, setSearch] = useState({
        search: "",
        type:"All",
        order: "-"
    });

    

    function orderPages(){

        let recipes = props.recipes.slice();

        if(search.order ==="Asc"){

            return recipes.sort((a,b)=> a.spoonacularScore - b.spoonacularScore);

        }
        if(search.order ==="Des"){
          
            return recipes.sort((a,b)=> b.spoonacularScore - a.spoonacularScore);
        }
        if(search.order ==="A-Z"){
           return recipes.sort((a,b)=> a.title.localeCompare(b.title));
        
        }
        if(search.order ==="Z-A"){
            return recipes.sort((a,b)=> b.title.localeCompare(a.title));
         
         }
        if(search.order === "-"){
            return props.recipes
        }
        
    }

    function filterTypes(r){
    
        const array = [];
        r.types.forEach(e => {  
            array.push(e.name);
        });

        if(array.includes(search.type)){
            return true
        }
    }
    
    function recipesPages(){

        /* OPCION BUSQUEDA Y TIPO */
        if(search.search.length > 0 && search.type !== "All"){
            let filter = orderPages().filter(r => r.title.toLowerCase().includes(search.search.toLowerCase()));
            filter = filter.filter(r => r.diets ? r.diets.includes(search.type) : filterTypes(r));
            
            return {
                page: filter.slice(recipesPage, recipesPage + 9),
                allResults: filter
            }
               
        }

        /* OPCION BUSQUEDA ALL */
        
        if(search.search.length > 0 && search.type === "All"){
            
            const filter = orderPages().filter(r => r.title.toLowerCase().includes(search.search.toLowerCase()));
            return {
                page: filter.slice(recipesPage, recipesPage + 9),
                allResults: filter
            }
        }

        /* OPCION SOLO POR TIPO */

        if(search.search.length === 0 && search.type !== "All"){

            const filter = orderPages().filter(r => r.diets ? r.diets.includes(search.type) : r.types.map(r => r.name.includes(search.type)));
        
            return {
                page: filter.slice(recipesPage, recipesPage + 9),
                allResults: filter
            }
        }

        return {page: orderPages().slice(recipesPage, recipesPage + 9),
                allResults: props.recipes
        }
    }

    if(props.recipes && props.recipes.length > 0){

    return( 
        <div>
            <Pagination 
            data={recipesPages().allResults}
            pages={recipesPage}
            setPages={setRecipesPage}
            search={setSearch}
            searchState={search}
            />
            <div className={s.cardsContainer}>
            {
                recipesPages().page.map(r => (
                <Card
                    title = {r.title}
                    image={r.image}
                    key={r.id ? r.id : r.code}
                    likes={r.aggregateLikes}
                    diets={r.diets}
                    types = {r.types}
                    id={r.id ? r.id : r.code}
                />
                ))
            }
            </div>
        </div>
    )
    }else{
        return (
            <Loader/>
        )
    }
  
};

function mapStateToProps(state){

    return{
        recipes: state.recipes
    }
}


export default connect(mapStateToProps, {getRecipes, clearArrayRecipe})(Cards);


