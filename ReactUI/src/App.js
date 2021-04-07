import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Statistics from './components/pages/Statistics';
import SignUp from './components/pages/SignUp';


function App() {
  localStorage.setItem("username", "guest")
  
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/statistics" component={Statistics} />
        <Route path="/sign-up" component={SignUp} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
