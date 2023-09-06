import React, { useState } from 'react';
import PokemonSearchInfo from 'Calculations/pokemon_search_data';
import SearchBar from 'Components/search_bar';


const Pokemon: React.FC = () => {
  return(

  <div>
    <h1 className="page-title">Pokemon Data</h1>
    <SearchBar/>
  </div>
  )
};

export default Pokemon;