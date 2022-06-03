import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [input, setInput] = useState();
  const [currentPokemon, setCurrentPokemon] = useState();
  const [validationError, setValidationError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate(input) === false) {
      setValidationError("Please input a number between 1-151");
      return;
    }
    const foundPokemon = data.find((pokemon) => pokemon.id === parseInt(input));
    setCurrentPokemon(foundPokemon);
  };

  const handleChange = (userInput) => {
    if (validate(userInput) === false) {
      setValidationError("Please input a number between 1-151");
      return;
    }
    setInput(userInput);
  };

  const getNextPokemon = () => {
    const nextPokemon = data[data.indexOf(currentPokemon) + 1];
    console.log(nextPokemon);
    return nextPokemon;
  };

  const getPrevPokemon = () => {
    const prevPokemon = data[data.indexOf(currentPokemon) - 1];
    console.log(prevPokemon);
    return prevPokemon;
  };

  const disableButton = (button) => {
    if (button === "previous") {
      if (currentPokemon.id === 1) return true;
    }

    if (button === "next") {
      if (currentPokemon.id === 151) return true;
    }

    return false;
  };

  const validate = (userInput) => {
    if (
      isNaN(userInput) ||
      userInput < 1 ||
      userInput > 151 ||
      userInput % 1 !== 0
    ) {
      return false;
    }

    setValidationError(null);
    return true;
  };

  useEffect(() => {
    const randomNumber = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    axios({
      method: "get",
      url: "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json",
    }).then(function (response) {
      setData(response.data.pokemon);
      setCurrentPokemon(response.data.pokemon[randomNumber(1, 151)]);
    });
  }, []);

  if (!currentPokemon) return null;
  return (
    <div className="h-full">
      <div className="relative w-screen h-screen min-h-screen p-6 bg-[#9CF7D8]/50 overflow-y-scroll">
        <div className="max-w-md flex flex-col items-center justify-center mx-auto bg-white rounded-md shadow-xl">
          <img
            className="w-full h-full bg-gradient-to-br from-[#9CF7D8] to-[#4FCFD9] rounded-t-md"
            src={currentPokemon.img}
            alt="a pokemon"
          />
          <div className="w-full p-6">
            <ul
              className="w-full min-h-[214px] flex flex-col items-left justify-evenly mb-6 p-6
         text-base text-[#5E5E5E] bg-[#F1F1F1] rounded-md shadow-lg"
            >
              <li>
                <span>Pokemon Number: {currentPokemon.num}</span>
              </li>
              <li>
                <span>Name: {currentPokemon.name}</span>
              </li>
              <li>
                <span>Height: {currentPokemon.height}</span>
              </li>
              <li>
                <span>Weight: {currentPokemon.weight}</span>
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <button
                className="w-full mr-9 bg-[#ff677d] rounded-3xl shadow-lg text-white text-xs p-3 py-4 cursor-pointer"
                disabled={disableButton("previous")}
                onClick={() => setCurrentPokemon(getPrevPokemon())}
              >
                Prev Pokemon
              </button>
              <button
                className="w-full bg-[#ff677d] rounded-3xl shadow-lg text-white text-xs p-3 py-4 cursor-pointer"
                disabled={disableButton("next")}
                onClick={() => setCurrentPokemon(getNextPokemon())}
              >
                Next Pokemon
              </button>
            </div>

            <form
              className="flex flex-col items-center justify-center mt-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="relative flex flex-col w-full">
                <span className="mr-auto mb-[16px]">Pokemon ID:</span>
                <span className="absolute top-[24px] mr-auto text-red-500 text-xs font-sans">
                  {validationError}
                </span>
                <input
                  className={
                    validationError
                      ? "w-full h-[50px] rounded-md bg-[#F1F1F1] shadow-lg mt-3 p-3 error"
                      : "w-full h-[50px] rounded-md bg-[#F1F1F1] shadow-lg mt-3 p-3"
                  }
                  type="text"
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Enter a Pokemon ID"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
