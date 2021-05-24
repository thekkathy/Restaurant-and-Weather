import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home.js';
import WeatherApp from './components/weather/components/WeatherApp.js';
import RestaurantApp from './components/restaurant/RestaurantApp.js'

function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/weather">Weather</a></li>
            <li><a href="/restaurant">Restaurant</a></li>
          </ul>
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
