import React, { useState, useContext, useEffect } from "react";
import { useCallback, createContext } from "react";

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [meals, setMeals] = useState([]);

  const fetchDrinks = useCallback(async () => {
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      //console.log(data);
      const { meals } = data;
      if (meals) {
        const newMeals = meals.map((item) => {
          const {
            idMeal,
            strMeal,
            strCategory,
            strArea,
            strInstructions,
            strMealThumb,
          } = item;
          return {
            id: idMeal,
            name: strMeal,
            category: strCategory,
            instructions: strInstructions,
            area: strArea,
            image: strMealThumb,
          };
        });
        setMeals(newMeals);
      } else {
        setMeals([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
