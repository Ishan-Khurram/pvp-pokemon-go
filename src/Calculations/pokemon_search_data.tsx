import React, { useState } from 'react'
import pokemon_info from "data/pokemon_info.json"
import SearchBar from 'Components/search_bar';

interface PokemonDataProps {
    poke_name: string;

}

const PokemonSearchInfo: React.FC<PokemonDataProps> = ({ poke_name }) => {
    const pokemon = pokemon_info.find(item => item.speciesId === poke_name);
    const pokedex = pokemon ? pokemon.dex : 'Pokedex number not found';
    const type = pokemon ? pokemon.types : 'Type not found';
    const fast_moves = pokemon ? pokemon.fastMoves: 'Moves not found';
    const charged_moves = pokemon ? pokemon.chargedMoves: 'Moves not found';
  
    return (
      <div>
        <p>
          Pokedex #: {pokedex}, 
          <br></br>
          Name: {poke_name} 
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
  
  export default PokemonSearchInfo;
    