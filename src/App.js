import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

// CSS
import 'materialize-css/dist/css/materialize.min.css';
import './App.scss';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBook from './components/AddBook';

const  App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={AddBook} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
