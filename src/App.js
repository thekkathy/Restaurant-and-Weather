import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home.js';
import WeatherApp from './components/weather/components/WeatherApp.js';
import RestaurantApp from './components/restaurant/RestaurantApp.js';
import AppPage from './components/AppPage';
import PositionProvider from './context/positionContext';

function App() {
  return (
    <PositionProvider>
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
                  <Link className="nav-link" to={`/weather/`}>Weather</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/restaurant/`}>Restaurant</Link>
                </li>
              </ul>
            </div>
          </nav>
        </main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/weather/"
            exact component={Weather} />
          <Route path="/restaurant/" exact component={Restaurant} />
        </Switch>
      </Router>
    </PositionProvider>
  );
}

const Weather = () => {
  return <AppPage ><WeatherApp /></AppPage>
}

const Restaurant = () => {
  return <AppPage ><RestaurantApp /></AppPage>
}

export default App;
