import React, { useState } from 'react';
import PokemonInfo from 'Calculations/pokemon_data'
import SearchBar from 'Components/search_bar';




const Pokemon: React.FC = () => {
  return(
  <div>
    <SearchBar/>
    <PokemonInfo pokedex={1} />
  </div>
  )
};

export default Pokemon;