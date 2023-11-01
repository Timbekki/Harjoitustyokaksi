import React, { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const [receipt, setReceipt] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          setReceipt(data.drinks);
          setError(null);
        } else {
          setReceipt([]);
          setError("Ei hakutuloksia.");
        }
      })
      .catch((error) => {
        setReceipt([]);
        setError("Hakuvirhe: " + error.message);
      });
  };

  return (
    <div>
      <h1>Find Coctails Name</h1>
      <input
        type="text"
        id="searchField"
        placeholder="Find drinks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {receipt.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {receipt.map((drink) => (
              <li key={drink.idDrink}>{drink.strDrink}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
