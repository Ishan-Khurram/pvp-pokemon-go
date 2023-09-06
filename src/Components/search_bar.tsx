import React, { useState, useEffect, useRef } from 'react';
import fast_moves_data from 'data/fast_moves.json'
import charged_moves_data from 'data/charged_moves.json'
import pokemon_info from 'data/pokemon_info.json'
import 'styles/styles.css'

// define the typing for a single pokemon

interface BasicPokemonInfo {
    dex: number;
    speciesName: string;
    speciesId: string;
    baseStats: {
        atk: number;
        def: number;
        hp: number;
    };
    types: string[];
    fastMoves: string[];
    chargedMoves: string[];
    tags?: string[]; // Make 'tags' optional
    defaultIVs: {
        cp500: number[];
        cp1500: number[];
        cp2500: number[];
        // ... other properties
    };
}

// define all fastmoves and all the data attributed to said fast move 

interface FastMove{
    pokemon:string;
    move: string;
    type: string;
    damage: number;
    energy_gain: number;
    turns: number;
    damage_per_turn: number | string;
    energy_per_turn: number | string;
    archetype: string;
}

// define all charged moved and all the data arrtributed to said charged move.

interface ChargedMove {
    pokemon: string;
    move: string;
    type: string;
    damage: number;
    energy: number;
    effect: string;
    archetype: string;
}

function capitalizeFirstLetter (str:string):string{
    return str.toLowerCase().replace(/^.|\s\S/g, (match) => match.toUpperCase());
}


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredPokemonList, setFilteredPokemonList] = useState<BasicPokemonInfo[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<BasicPokemonInfo | null>(null);
    const dropDownRef = useRef<HTMLUListElement>(null);

// On user click outside of drop down menu, the menu with close.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setFilteredPokemonList([]);
          }
        };
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setSearchInput(inputValue);
  
      // Filter the Pokemon list based on user input
      const filteredList = pokemon_info.filter(pokemon =>
        pokemon.speciesName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredPokemonList(filteredList);
    };
    
  // allow the search to be completed when the enter key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
      const selected = pokemon_info.find(pokemon => pokemon.speciesName.toLowerCase() === searchInput.toLowerCase());
      if (selected) {
        setSelectedPokemon(selected);
      }
    };
  
    const handleSelectPokemon = (pokemon: BasicPokemonInfo) => {
      setSelectedPokemon(pokemon);
    };


    const calculateFastMoveCountForChargedMove = (pokemonName: string, fastMoveNames: string[], chargedMoveEnergy: number) => {
      const fastMoves = fast_moves_data.filter(move => move.pokemon === pokemonName && fastMoveNames.includes(move.move));
  
      const totalEnergyGained = fastMoves.reduce((total, move) => total + move.energy_gain, 0);
      const movesNeeded = Math.floor(chargedMoveEnergy / totalEnergyGained);
    
      return movesNeeded;
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a Pokémon"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
  
        {/* Dropdown list */}
        {filteredPokemonList.length > 0 && (
          <ul className="dropdown-list" ref={dropDownRef}>
            {filteredPokemonList.map(pokemon => (
              <li key={pokemon.speciesId} onClick={() => handleSelectPokemon(pokemon)}>
                {pokemon.speciesName}
              </li>
            ))}
          </ul>
        )}
  
  {selectedPokemon && (
        <div className="result-container">
          {/* ... (species name and types) */}
 
          {/* Display fast moves and charged moves information */}
          <h2>{selectedPokemon.speciesName}</h2>
          <h3 className="result-details">Fast Moves:</h3>
          <ul>
            {fast_moves_data.filter(move => move.pokemon === selectedPokemon.speciesName).map((move, index) => (
              <li key={index} className="list-item">
                Move: {move.move}: (Energy Gained Per Use: {move.energy_gain})
              </li>
            ))}
          </ul>

          <h3 className="result-details">Charged Moves:</h3>
          <ul>
            {charged_moves_data.filter(move => move.pokemon === selectedPokemon.speciesName).map((move, index) => (
              <li key={index} className="list-item">
                Move: {move.move}: (Energy Required: {move.energy})
                <ul className="fast-move-list">
                  {selectedPokemon.fastMoves.map((fastMoveName, index) => (
                    <li key={index}>
                      {capitalizeFirstLetter(fastMoveName)}: {calculateFastMoveCountForChargedMove(selectedPokemon.speciesName, selectedPokemon.fastMoves, move.energy)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
