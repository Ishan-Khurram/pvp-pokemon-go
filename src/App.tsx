import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Favourites from "pages/Favourites";
import Home from "pages/home";
import DarkMode from "darkmode";
import Movelist from "pages/movelist";
import "styles/styles.css";

const App: React.FC = () => {


  
  return (
    <Router>
      <div>
        <DarkMode />
        <nav>
          <ul className="nav-links">
            <li>
              <Link className="nav-links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/favourites">
                Favourites
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/movelist">
                Movelist
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Define your routes */}
          <Route path="/" Component={Home} />
          <Route path="/pokemon" Component={Favourites} />
          <Route path="/movelist" Component={Movelist} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
