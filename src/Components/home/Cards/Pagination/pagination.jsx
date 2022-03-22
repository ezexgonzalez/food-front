import React, {useState} from "react";
import s from "./pagination.module.css";
import Search from "./search";



export default function Pagination(props){


    const [page , setPage] = useState(1);
    

    function nextPage(){
        
        if(props.pages < props.data.length - 9){
            props.setPages(props.pages + 9);
            setPage(page + 1);
        }
    }

    function previusPage(){
        if(props.pages > 1){

            props.setPages(props.pages - 9);
            setPage(page - 1);
        }
    }
    function start(){
        props.setPages(0);
        setPage(1);
    }
    function end(){
        if(props.data.length > 9) {
            
            let pages = String(Math.ceil(props.data.length / 9));
            console.log(pages);

            props.setPages((pages - 1) * 9);
            setPage(pages);
            

        }else{
            props.setPages(0);
            setPage(1);
        }
        
    }

    return(

        <div className={s.container}>
            
            <Search
                setPages ={props.setPages}
                setPage = {setPage}
                search = {props.search}
            
            />
            <div className={s.buttonsContainer}>
                <button className={s.button} onClick={start}>Start</button>
                <button className={s.button} onClick={previusPage}>Prev</button>
                <span>{page}</span>
                <button className={s.button} onClick={nextPage}>Next</button>
                <button className={s.button} onClick={end}>End</button>
            </div>
        </div>
    )
}



