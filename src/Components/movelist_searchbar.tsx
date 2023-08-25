import React, { useState } from 'react';
import fast_moves_data from 'data/fast_moves.json'
import charged_moves_data from 'data/charged_moves.json'
import pokemon_info from 'data/pokemon_info.json'

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


const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<BasicPokemonInfo | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSelectedPokemon(null); // Clear selectedPokemon when input changes
  };

  const handleSearch = () => {
    // Search for a matching speciesName
    const matchedPokemon = pokemon_info.find(pokemon =>
      pokemon.speciesName.toLowerCase() === searchInput.toLowerCase()
    );

    // If a match is found, set selectedPokemon
    setSelectedPokemon(matchedPokemon || null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a Pokémon"
        value={searchInput}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.speciesName}</h2>
          <p>Types: {selectedPokemon.types.map(capitalizeFirstLetter).join(', ')}</p>

          {/* Display fast moves and charged moves information */}
          <h3>Fast Moves:</h3>
          <ul>
            {fast_moves_data
              .filter(move => move.pokemon === selectedPokemon.speciesName)
              .map((move, index) => (
                <li key={index}>
                  Move: {move.move}, (Energy Gained Per Use: {move.energy_gain})
                </li>
              ))}
          </ul>

          <h3>Charged Moves:</h3>
          <ul>
            {charged_moves_data
              .filter(move => move.pokemon === selectedPokemon.speciesName)
              .map((move, index) => (
                <li key={index}>
                  Move: {move.move}, (Energy Required: {move.energy})
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
