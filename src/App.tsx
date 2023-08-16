import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemon from 'pages/pokemon'
import Home from 'pages/home'
import Movelist from 'pages/movelist'
import './App.css';

const Links: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/pokemon">Pokemon</Link>
            <Link to="/movelist">Movelist</Link>
        </nav>
        <Routes>
        {/* Define your routes */}
        <Route path="/" Component={Home} />
        <Route path="/pokemon" Component={Pokemon} />
        <Route path="/movelist" Component={Movelist} />
          </Routes>
          </div>
    </Router>
  );
};



export default Links;