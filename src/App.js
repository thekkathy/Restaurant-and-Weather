import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home.js';
import WeatherApp from './components/weather/components/WeatherApp.js';
import RestaurantApp from './components/restaurant/RestaurantApp.js'

function App() {
  const [location, setLocation] = useState({ lat: 38.0293, lon: -78.5055744 });

  return (
    <Router>
      <main>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Miniapp</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/weather">Weather</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/restaurant">Restaurant</Link>
              </li>
            </ul>
          </div>
        </nav>
      </main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/weather" exact component={WeatherApp} />
        <Route path="/restaurant" exact component={RestaurantApp} />
      </Switch>
    </Router>


  );
}

export default App;
