import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

const SearchBar = () => {
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

  const calculateFastMoveCountsForChargedMove = (
    pokemonName: string,
    fastMoveNames: string[],
    chargedMoveEnergy: number
  ): { movesNeeded: number[]; remainder: number } => {
    const fastMoves: FastMove[] = fast_moves_data.filter(
      (fm) => fm.pokemon === pokemonName && fastMoveNames.includes(fm.move)
    );

    // Calculate total energy gained
    const totalEnergyGained: number = fastMoves.reduce(
      (total, move) => total + move.energy_gain,
      0
    );

    let remainder = -0.1;
    let movesNeeded: number[] = [];

    for (let i = 0; i < 3; i++) {
      // Calculate how many times the charged move can be executed with the current energy
      let chargedMoveExecutions = Math.floor(
        (chargedMoveEnergy + remainder) / totalEnergyGained
      );

      // Calculate the remainder of energy after executing the charged move
      remainder = (chargedMoveEnergy + remainder) % totalEnergyGained;

      if (i === 0 && remainder > 0) {
        // For the first move, if there's a remainder, add one more fast move
        chargedMoveExecutions++;
      }

      movesNeeded.push(chargedMoveExecutions);
    }

    return { movesNeeded, remainder };
  };

  // Allowing the user to drag and drop the order of the fast moves or charged moves in a table.


  return (
    <body>
      <section className="search">
        <input
          type="search"
          placeholder="Pokemon Name"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="yes"
          list="yes"
        />
      </section>

      {/* Dropdown List here */}
      {filteredPokemonList.length > 0 && (
        <ul className="search-dropdown" ref={dropDownRef}>
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
        <section className="pokemon-basic-info">
          {/* Pokemon Name */}
          <h2 className="pokemon-name">{selectedPokemon.speciesName}</h2>
        </section>
      )}

      {selectedPokemon && (
        <section className="move-chart">
          {/* Display Amount of Fast Moves Needed to Execute a Charged Move */}
          <h3 className="move-heading">
            Amount of moves it takes to execute one charged move (3 Consecutive
            Times):
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {/* Pokemon Name in table head */}
                  <th>{selectedPokemon.speciesName}</th>
                  {/* Pokemon fast moves in the row */}
                  {fast_moves_data
                    .filter(
                      (fastMove) =>
                        fastMove.pokemon === selectedPokemon.speciesName
                    )
                    .map((fastMove, index) => (
                      <th 
                      key={index}
                      title={`Energy Gain: ${fastMove.energy_gain}`}
                      >
                      {fastMove.move}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {/* Pokemon charged moves in the columns */}
                {charged_moves_data
                  .filter(
                    (cmMove) => cmMove.pokemon === selectedPokemon.speciesName
                  )
                  .map((cmMove, cmIndex) => (
                    <tr key={cmIndex} 
                    title={`Energy Needed: ${cmMove.energy}`}
                    >
                      <td>{cmMove.move}</td>
                      {/* Pokemon fm needed for cm chart */}
                      {fast_moves_data
                        .filter(
                          (fastMove) =>
                            fastMove.pokemon === selectedPokemon.speciesName
                        )
                        .map((fastMove, fastIndex) => {
                          const { movesNeeded } =
                            calculateFastMoveCountsForChargedMove(
                              selectedPokemon.speciesName,
                              [fastMove.move],
                              cmMove.energy
                            );
                          return (
                            <td key={fastIndex}>
                              {movesNeeded.length === 0
                                ? "No matching moves"
                                : `${movesNeeded.join("  |  ")}`}
                            </td>
                          );
                        })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </body>
  );
};

export default SearchBar;
