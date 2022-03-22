import React from 'react';
import {Link} from 'react-router-dom';
import s from "./card.module.css";
import tick from "./tick.png";


export default function Card(props) {
    // acá va tu código
  
  let types = [];

    if(props.types){

      props.types.forEach(type => types.push(type.name) )

    }

    let diets = types.length > 0 ? types : props.diets;
    


    return( 
      <div className={s.card} >
          <img className={s.image} src={props.image} alt="" />
          <div className={s.textContainer}>
            <Link className={s.link} to={`/recipes/${props.id}`}>
              <span className={s.text}>{props.title}</span>
            </Link>
            <div className={s.punctuation}>
              {
                diets ? diets.map(d =>(
                  <div key={d}>
                      <span  className={s.typeText}>{d}</span>
                      <img className={s.tick} src={tick} alt="tick" />
                   </div>
                )) : ""
              }
              
            </div>
          </div>
          
         
      </div>
    )
  };


