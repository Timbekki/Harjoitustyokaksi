import React, { useEffect, useState } from "react";
import '../components/Coctail.css';

function Coctail() {
  const [coctail, setCoctail] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        setCoctail(data.drinks[0]);
        setIngredients(extractIngredients(data.drinks[0]));
      });
  }, []);

  const extractIngredients = (drink) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push({ ingredient, measure });
      } else {
        break;
      }
    }
    return ingredients;
  };

  return (
    <div className="center-content">
      <h1>Random Coctail of the day!</h1>
      {coctail && (
        <div>
          <h2>{coctail.strDrink}</h2>
          <p>{coctail.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.ingredient}: {item.measure}
              </li>
            ))}
          </ul>
          <img src={coctail.strDrinkThumb} alt={coctail.strDrink} className="coctail-image" />
        </div>
      )}
    </div>
  );
}

export default Coctail;
