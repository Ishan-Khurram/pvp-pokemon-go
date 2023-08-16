import React, { useState } from 'react'
import pokemon_info from "data/pokemon_info.json"
import SearchBar from 'Components/search_bar';

interface PokemonDataProps {
    speciesId: string;
    pokedex: number;

}

const PokemonInfo: React.FC<PokemonDataProps> = ({ pokedex }) => {
    const pokemon = pokemon_info.find(item => item.dex === pokedex);
    const name = pokemon ? pokemon.speciesName : 'Pokemon not found';
    const type = pokemon ? pokemon.types : 'Type not found';
    const fast_moves = pokemon ? pokemon.fastMoves: 'Moves not found';
    const charged_moves = pokemon ? pokemon.chargedMoves: 'Moves not found';
  
    return (
      <div>
        <p>
          Pokedex #: {pokedex}, 
          <br></br>
          Name: {name}, 
          <br></br>
          Type: {type}
          <br></br>
          Fast moves: {fast_moves}
          <br></br>
          Charged moves: {charged_moves}
        </p>
      </div>
    );
  };
  
  export default PokemonInfo;
    