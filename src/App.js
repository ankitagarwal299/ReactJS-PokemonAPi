import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [pokeList, setPokeList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [pokeDetials, setpokeDetials] = useState({});
  const [pokeId, setPokeId] = useState(null);

  function getId(url) {
    const split = url.split("/");
    return split[split.length - 2];
  }

  useEffect(() => {
    async function getPokeMon() {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`
      );
      let list = await response.json();

      setPokeList(
        list.results.map((item) => ({ name: item.name, id: getId(item.url) }))
      );
    }
    getPokeMon();
  }, [offset]);

  function handlePrevious() {
    if (offset <= 4) {
      setDisabledPrev(true);
      return;
    }
    setDisabledPrev(false);
    setOffset(offset - 5);
  }

  useEffect(() => {
    async function getPokeDetails(pokeId) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
      let pokDetails = await response.json();

      console.log("pokDetails", pokDetails);

      setpokeDetials({ ...pokDetails });
    }
    getPokeDetails(pokeId);
  }, [pokeId]);

  function pokemondetails(pokeMonObject) {
    console.log(pokeMonObject);
    setPokeId(pokeMonObject.id);
  }

  return (
    <div className="container">
      <PokemonList pokeList={pokeList} handlePokeMonclicked={pokemondetails} />
      <div className="button-row">
        <button type="button" onClick={handlePrevious} disabled={disabledPrev}>
          Prev
        </button>
        <button type="button" onClick={() => setOffset(offset + 5)}>
          Next
        </button>
      </div>
    </div>
  );
}

// function PokeMonDetails({ pokeMonObject }) {
//   return (
//     <div>
//       <pre>pokeMonObject | json</pre>
//     </div>
//   );
// }

function PokemonList({ pokeList, handlePokeMonclicked }) {
  // function handlePokeMonclicked(pokeMonObject) {
  //   console.log(pokeMonObject);
  // }

  return (
    <div className="pokemonList">
      {pokeList.map((pokeMonObject, index) => (
        <Pokemon
          key={index}
          pokemonObject={pokeMonObject}
          handlePokeMonclicked={handlePokeMonclicked}
        />
      ))}
    </div>
  );
}

function Pokemon({ pokemonObject, handlePokeMonclicked }) {
  // console.log(pokemonObject);
  const upperCaseName =
    pokemonObject.name.charAt(0).toUpperCase() + pokemonObject.name.slice(1);
  const idString = pokemonObject.id.padStart(3, "0");
  return (
    <div
      className="pokemon"
      onClick={() => handlePokeMonclicked(pokemonObject)}
    >
      <div className="name">{upperCaseName}</div>
      <div className="id">{idString}</div>
    </div>
  );
}

//https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

/*
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "defense",
        "url": "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      "base_stat": 65,
      "effort": 1,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 65,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
*/

//APIs: PokeAPI (https://pokeapi.co)
/*
1. Create skeleton of UI to list Pokemon (5 minutes)
  * Setup state/variables that will hold the list of currently displayed Pokemon (5 minutes)
  * Write simple rendering code that will iterate over Pokemon and render rows using default components (that look vaguely like the mock). Don't worry about the Next/Prev buttons. (10 minutes)
2.  Integrate SDK and API calls (15 minutes)
  * Integrate SDK into your application (5 minutes)
  * Add am empty helper function/callback that is intended to fetch a batch of Pokemon from the API. Make sure it will run on load to initialize the list, and as a callback when fetching more pages of data (5 minutes)
  * Figure out the correct API call to make, add the API call to your helper function, and print/log the output on page load to confirm you can see correct data (10 minutes)
  * Process the resulting response and store necessary data in your local state/variables (5 minutes)
 3. Integrate Data into your UI, and add Pagination (15 minutes)
  * It's possible that after 2. your UI kind of works already. The next step is to make sure all the correct data is displayed in the UI, even if it doesn't look perfect. (10 minutes)
  * Add Previous and Next buttons, with default/imperfect styling (5 minutes)
  * Hook up the buttons to callbacks that will call your handler function appropriately and fetch next/previous batch of data (10 minutes)
  * Test various combinations of next and previous and make sure everything looks good (5 minutes)
 4. Create Pokemon detail Dialog and show when a Pokemon is clicked (20 m)
  * Create an empty dialog that is opened when a Pokemon is clicked, and closed appropriately (15 minutes)
  * Fetch the detailed data of a Pokemon using an API call when the dialog is opened, and store it temporarily (5 minutes)
  * Render the information using default components, roughly similar to the mock (20 minutes)
  * Test clicking on several Pokemon and making sure everything is working (5 minutes)
 5. Finish rough UI, polish and improve code (5 minutes)

 */
