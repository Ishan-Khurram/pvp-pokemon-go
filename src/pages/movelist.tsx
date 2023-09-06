import React from 'react';
import Search from 'Components/movelist_searchbar'


const Movelist: React.FC = () => {
  return (
    <div>
            <h1 className="page-title">Pokémon Data Search</h1>
            <Search/>
    </div>
);
};

export default Movelist;