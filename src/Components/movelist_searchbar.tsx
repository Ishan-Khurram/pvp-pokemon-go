import React, { useState, useEffect, useRef } from "react";
import fast_moves_data from "data/fast_moves.json";
import charged_moves_data from "data/charged_moves.json";
import pokemon_info from "data/pokemon_info.json";
import "styles/styles.css";

// Define the typing for a single pokemon
interface BasicPokemonInfo {
  dex: number;
  speciesName: string;
  speciesId: string;
  fastMoves: string[];
  chargedMoves: string[];
  // ... other properties
}

// Define all fastmoves and all the data attributed to said fast move
interface FastMove {
  pokemon: string;
  move: string;
  type: string;
  damage: number;
  energy_gain: number;
  // ... other properties
}

// Define all charged moves and all the data attributed to said charged move.
interface ChargedMove {
  pokemon: string;
  move: string;
  type: string;
  damage: number;
  energy: number;
  effect: string;
  archetype: string;
}

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    BasicPokemonInfo[]
  >([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<BasicPokemonInfo | null>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  // On user click outside of drop down menu, the menu with close.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setFilteredPokemonList([]);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter the Pokemon list based on user input
    const filteredList = pokemon_info.filter((pokemon) =>
      pokemon.speciesName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  };

  // allow the search to be completed when the enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (filteredPokemonList.length > 0) {
        // If dropdown is visible, select the first item and hide dropdown
        handleSelectPokemon(filteredPokemonList[0]);
        setFilteredPokemonList([]);
      } else {
        // If dropdown is not visible, perform search
        handleSearch();
      }
    }
  };

  //Convert the user search to lowercase to match it to the speciesName
  const handleSearch = () => {
    const selected = pokemon_info.find(
      (pokemon) =>
        pokemon.speciesName.toLowerCase() === searchInput.toLowerCase()
    );
    if (selected) {
      setSelectedPokemon(selected);
    }
  };

  const handleSelectPokemon = (pokemon: BasicPokemonInfo) => {
    setSelectedPokemon(pokemon);
  };

  const calculateFastMoveCountForChargedMove = (
    pokemonName: string,
    fastMoveNames: string[],
    chargedMoveEnergy: number
  ): { movesNeeded: number; remainder: number } => {
    const fastMoves: FastMove[] = fast_moves_data.filter(
      (move) =>
        move.pokemon === pokemonName && fastMoveNames.includes(move.move)
    );
  
    if (fastMoves.length === 0) {
      // No matching fast moves found
      return { movesNeeded: -1, remainder: -1 }; // Use -1 to indicate no matching moves were found
    }
  
    // Calculate total energy gained
    const totalEnergyGained: number = fastMoves.reduce(
      (total, move) => total + move.energy_gain,
      0
    );
  
    if (totalEnergyGained === 0) {
      // No energy gained from fast moves
      return { movesNeeded: -1, remainder: -1 }; // Use -1 to indicate no energy gained from fast moves
    }
  
    let remainder = chargedMoveEnergy;
    let movesNeeded = 0;
  
    for (let i = 0; i < 5; i++) {
      if (remainder >= totalEnergyGained) {
        const moves = Math.floor(remainder / totalEnergyGained);
        movesNeeded += moves;
        remainder %= totalEnergyGained;
      } else {
        break;
      }
    }
  
    return { movesNeeded, remainder };
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a Pokemon"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {/* drop down list */}
      {filteredPokemonList.length > 0 && (
        <ul className="dropdown-list" ref={dropDownRef}>
          {filteredPokemonList.map((pokemon) => (
            <li
              key={pokemon.speciesId}
              onClick={() => handleSelectPokemon(pokemon)}
            >
              {pokemon.speciesName}
            </li>
          ))}
        </ul>
      )}

{selectedPokemon && (
  <div className="result-container">
    {/* Display Pokémon name */}
    <h2>{selectedPokemon.speciesName}</h2>

    {/* Display fast moves */}
    <h3 className="result-details">Fast Moves:</h3>
    <ul>
      {fast_moves_data.filter((move) => move.pokemon === selectedPokemon.speciesName).map((move, index) => (
          <li key={index} className="list-item">
            {move.move}, Energy Gain: {move.energy_gain}
          </li>
        ))}
    </ul>

    {/* Display Charged moves */}
    <h3 className="result-details">Charged Moves:</h3>
    <ul>
      {charged_moves_data.filter((move) => move.pokemon === selectedPokemon.speciesName).map((move, index) => (
          <li key={index} className="list-item">
            {move.move}, Energy Needed: {move.energy}
          </li>
        ))}
    </ul>

    {/* Display amount of moves it takes to execute charged move in a table */}
    <h3>Amount of moves it takes to execute one charged move:</h3>
    <ul>
      {charged_moves_data.filter((move) => move.pokemon === selectedPokemon.speciesName).map((move, index) => (
          <table key={index} className="moves-table">
                <thead>
                  <tr>
                    <th>{selectedPokemon.speciesName}</th>
                    {fast_moves_data.filter((fastMove) => fastMove.pokemon === selectedPokemon.speciesName).map((fastMove, index) => (
                        <th key={index} className="table-item">
                          {fastMove.move}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {charged_moves_data.filter((cmMove) => cmMove.pokemon === selectedPokemon.speciesName).map((cmMove, cmIndex) => (
                      <tr key={cmIndex} className="table-item">
                        <td>{cmMove.move}</td>
                        {fast_moves_data.filter((fastMove) => fastMove.pokemon === selectedPokemon.speciesName).map((fastMove, fastIndex) => {
                            const { movesNeeded, remainder } = calculateFastMoveCountForChargedMove(
                              selectedPokemon.speciesName,
                              [fastMove.move],
                              cmMove.energy
                            );
                            return (
                              <td key={fastIndex} className="table-item">
                                {movesNeeded === -1
                                  ? 'No matching moves'
                                  : `${movesNeeded} (${remainder} remainder)`}
                              </td>
                            );
                          })}
                      </tr>
                    ))}
                </tbody>
          </table>
        ))}
    </ul>
  </div>
)}
    </div>
  );
};
export default Search;
