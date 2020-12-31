import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const SingleMeal = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getMeal() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.meals) {
          const {
            strMeal: name,
            strArea: area,
            strMealThumb: image,
            strCategory: category,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
          } = data.meals[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
          ];
          const newMeal = {
            name,
            image,
            area,
            category,
            instructions,
            ingredients,
          };
          setMeal(newMeal);
        } else {
          setMeal(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getMeal();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!meal) {
    return <h2 className="section-title">No Meal To Display!!</h2>;
  }
  const { name, image, area, category, instructions, ingredients } = meal;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Region: </span>
            {area}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item} </span> : null;
            })}
          </p>
          <p>
            <span className="drink-data">Instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleMeal;
