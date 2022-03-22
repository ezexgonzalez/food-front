import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRecipe , clearArrayResponse } from "../../reducer/actions";
import s from "./newRecipe.module.css";



function NewRecipe(props) {

  const [formState, setFormState] = useState({
    title: "",
    summary: "",
    punctuation: "",
    healtyLevel: "",
    image: "",
    steps: [],
    types: []
  });

  const [stepState, setStepState] = useState({
    steps: "",
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  });

  const [typeState, setTypeState] = useState({
    value: "1",
    types: []
  })

  const [errorState, setErrorState] = useState({
    error: null,
    created: null,
    loader: false
  });


  useEffect(()=>{
    error();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.response])


  function close(number) {
    stepState.id.push(number);
    setFormState(prevState => {
      return {
        ...prevState,
        steps: formState.steps.filter(step => step.number !== number)
      }
    });
    setStepState(prevState => {
      return {
        ...prevState,
        id: stepState.id.sort(function (a, b) { return a - b })
      }
    })
  }

  function orderSteps() {
    return formState.steps.sort(function (a, b) { return a.number - b.number })
  }


  function handleOnChange(e) {
    if (e.target.name !== "steps") {
    
      setFormState(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        }

      });

      
    
    }
    setStepState(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  async function addStep(e) {

    if (stepState.id.length > 0) {
      await setFormState(prevState => {
        return {
          ...prevState,
          steps: [...formState.steps, {
            number: stepState.id[0],
            step: stepState.steps
          }]
        }
      });
      setStepState(prevState => {
        return {
          ...prevState,
          steps: ""
        }
      })
      stepState.id.shift()
    }
  }

  function handleOnChangeType(e) {

    setTypeState(prevState => {
      return {
        ...prevState,
        value: e.target.value
      }
    })
  }

  function addType() {

    let typesNames = ["Gluten Free", "Laco-Ovo-Vegetarian", "Vegan", "Pescatarian", "Paleo", "Primal", "Low FODMAP", "Dairy Free", "Whole30"];

    for (let i = 0; i < typesNames.length; i++) {
      if (i + 1 === Number(typeState.value)) {
        setTypeState(prevState => {
          return {
            ...prevState,
            types: [...typeState.types, typesNames[i]]
          }
        })
      }
    }

    setFormState(prevState => {

      return {
        ...prevState,
        types: [...formState.types, Number(typeState.value)]
      }
    })
  }

  function typeClose(name) {

    setTypeState(prevState => {
      return {
        ...prevState,
        types: typeState.types.filter(t => t !== name)
      }
    });
    let typesNames = ["Gluten Free", "Laco-Ovo-Vegetarian", "Vegan", "Pescatarian", "Paleo", "Primal", "Low FODMAP", "Dairy Free", "Whole30"];

    typesNames.forEach((n, i) => {

      if (name === n) {

        setFormState(prevState => {
          return {
            ...prevState,
            types: formState.types.filter(t => t !== i + 1)
          }
        })
      }
    })
  }

  async function submmit(e) {
    e.preventDefault();
    if (formState.title.length > 0 &&
      formState.summary.length > 0 &&
      formState.punctuation.length > 0 &&
      formState.healtyLevel.length > 0
    ) {
      setErrorState(prevState => {
        return{
          ...prevState,
          error: false
        }
      });

      await props.createRecipe(formState);

    } else {
      setErrorState(prevState => {
        return{
          ...prevState,
          error: true
        }
      });
    }
   
  }

  function error(){

    if(props.response.msg && props.response.msg === "Error"){

    setErrorState(prevState => {
      return{
        ...prevState,
        created: false
      }
    });
    
   }else if(props.response.msg && props.response.msg === "Ok"){

    setErrorState(prevState => {
      return{
        ...prevState,
        created: true
      }
    });
   }

  }

  function deleteText() {

    setFormState(prevState => {

      return {
        ...prevState,
        image: ""
      }
    })
  }

  async function clearResponse(){

    setErrorState(prevState => {
      return{
        ...prevState,
        created: null
      }
    });
    await props.clearArrayResponse();
  }

  return (
    <form className={s.full} onSubmit={submmit}>
      <span className={s.title}>Create recipe.</span>
      <div className={s.main}>
        <div className={s.container}>
          <div className={s.form}>
            <input value={formState.title} onClick={handleOnChange} className={s.input } placeholder="Name" onChange={handleOnChange} name="title" type="text" />
            <span className={s.msg}>* Este campo es obligatorio(Solo letras)</span>
            <textarea value={formState.summary} placeholder="Summary" className={s.textarea} onChange={handleOnChange} name="summary" id="" cols="30" rows="10"></textarea>
            <span className={s.msg}>* Este campo es obligatorio</span>
            <input value={formState.punctuation} className={s.input} placeholder="Punctuation" onChange={handleOnChange} name="punctuation" type="number" max="100" min="0" />
             <span className={s.msg}>* Este campo es obligatorio(Numero del 0 al 100)</span>
            <input value={formState.healtyLevel} className={s.input} placeholder="Healty level" onChange={handleOnChange} name="healtyLevel" type="number" max="100" min="0" />
            <span className={s.msg}>* Este campo es obligatorio(Numero del 0 al 100)</span>
          </div>

        </div>
        <div className={s.stepsContainer}>

          <div className={s.steps}>
            {
              formState.steps.length > 0 ? orderSteps().map(step => (
                <div className={s.stepNumber} key={step.number}>
                  Step {step.number}
                  <button onClick={() => close(step.number)} className={s.close}>X</button>
                </div>
              )) : ""
            }
          </div>
          <textarea onChange={handleOnChange} value={stepState.steps} className={s.textarea} placeholder="Steps" name="steps" id="" cols="30" rows="10"></textarea>
          <button onClick={addStep} type="button" className={s.addButton}>Add</button>
        </div>
        <div className={s.typesContainer}>
          <div className={s.imgContainer}>
            <img className={s.image} src={formState.image} alt="FoodImg" />
            <div>
              <input value={formState.image} className={s.input} onChange={handleOnChange} placeholder="Url Image" type="text" name="image" id="" />
              <button onClick={deleteText} className={s.closebutton} type="button">X</button>
            </div>
          </div>
          <div className={s.types}>
            {
              typeState.types.length > 0 ? typeState.types.map(type => (
                <div className={s.typeName} key={type}>
                  {type}
                  <button type="button" onClick={() => typeClose(type)} className={s.close}>X</button>
                </div>
              )) : ""
            }
          </div>
          <select onChange={handleOnChangeType} className={s.options} name="type" id="type">
            <option value={1}>Gluten Free</option>
            <option value={2}>Lacto-Ovo-Vegetarian</option>
            <option value={3}>Vegan</option>
            <option value={4}>Pescatarian</option>
            <option value={5}>Paleo</option>
            <option value={6}>Primal</option>
            <option value={7}>Low FODMAP</option>
            <option value={8}>Dairy Free</option>
            <option value={9}>Whole30</option>
          </select>
          <button type="button" onClick={addType} className={s.addButton}>Add</button>

        </div>
      </div>
      {
        errorState.error ? <div className={s.errorContainer}>
          <span>Error when creating the recipe, check the information</span>
        </div> : ""
      }
      {
        errorState.created ? <div className={s.createdContainer}>
          <span>Recipe Created!</span>
        </div> : errorState.created === false ? <div className={s.errorContainer}>
          <span>Error when creating the recipe</span>
        </div> : ""
      }
      <button type="submit" className={s.button}>Create</button>
      <Link onClick={clearResponse} to="/home">
        <span className={s.buttonBack}>Back to Home</span>
      </Link>

    </form>

  )
}

function mapStateToProps(state) {
  return {
    response: state.responseCreate
  }
}

export default connect(mapStateToProps, { createRecipe, clearArrayResponse })(NewRecipe)