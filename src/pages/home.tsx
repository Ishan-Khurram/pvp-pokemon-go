import React, { useState } from "react";
import SearchBar from "Components/search_bar";
import Search from "Components/test-search";

const Home: React.FC = () => {


  return (
    <header>
      <h1 className="page-title">Welcome to the Home page!</h1>
      <Search/>
    </header>
  );
};

export default Home;
