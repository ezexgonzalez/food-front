import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import Inicio from './Components/Inicio/inicio';
import Home from "./Components/home/home";
import RecipeDetail from './Components/RecipeDetail/recipeDetail';
import NewRecipe from './Components/NewRecipe/newRecipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipes/:id" element={<RecipeDetail/>}/>
      <Route path="/recipes/create" element={<NewRecipe/>}/>
    </Routes>
  );
}

export default App;
