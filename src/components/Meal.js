import React from "react";
import { Link } from "react-router-dom";

const Meal = ({ id, name, category, instructions, image, area }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h1>{name}</h1>
        <h4>Category: {category}</h4>
        <h4>Region: {area}</h4>
        <Link to={`/meal/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Meal;
