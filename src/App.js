import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainNav from "./components/MainNav/MainNav";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
const App = () => {
  return (
    <div>
      <Router>
        <MainNav />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/blog" component={Blog} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
