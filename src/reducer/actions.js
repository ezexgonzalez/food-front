

export function getRecipes() {
    return function(dispatch) {
      return fetch("https://foodappbackend-5ojb.onrender.com/recipes")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_RECIPES", payload: json });
        });
    };
  }
  
export function getRecipeById(id){
  return function(dispatch) {
    return fetch(`https://foodappbackend-5ojb.onrender.com/recipes/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_RECIPE_BY_ID", payload: json });
      });
  };
}

export function createRecipe(data){

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      title: data.title,
      summary: data.summary,
      spoonacularScore: data.punctuation,
      healthScore: data.healtyLevel,
      steps: data.steps,
      types: data.types,
      image: data.image
     })
  };
  return function(dispatch){
   return fetch('https://foodappbackend-5ojb.onrender.com/recipes', requestOptions)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: "CREATE_RECIPE", payload: data });
    });
  }
}


export function clearArrayRecipe(){

  return{
    type: "CLEAR_ARRAY_RECIPEDETAIL",
    payload: ""
  }
}

export function clearArrayResponse(){

  return{
    type: "CLEAR_ARRAY_RESPONSE",
    payload: ""
  }
}