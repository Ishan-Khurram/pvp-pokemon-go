import React from 'react';
import PokemonSearchBar  from 'Components/movelist_searchbar';


const Movelist: React.FC = () => {
  return (
    <div>
            <h1>Pokémon Data Search</h1>
            <PokemonSearchBar />
    </div>
);
};

export default Movelist;