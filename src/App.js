import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SingleNews from "./Components/NewsList/SingleNews/SingleNews";
import Layout from "./Components/Menubar/Layout/Layout"
import NewsList2 from "./Components/NewsList2/NewsList2";
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={'News#'}>
      <Layout/>
        <Switch>
        <Route exact path="/News/" render={() => (<Redirect to="#/Home" />)} />
          <Route path="/:category" exact component={NewsList2}></Route>
          <Route path="/:category/:id" component={SingleNews}></Route>
          <Route exact path="/" render={() => (<Redirect to="/Home" />)} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
