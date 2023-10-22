import React, { useState } from 'react';
import SearchBar from 'Components/search_bar';
import Search from "Components/test-search";


const Pokemon: React.FC = () => {
  return(

  <section>
    <h1 className="page-title">Pokemon Data</h1>
    <SearchBar/>
  </section>
  )
};

export default Pokemon;