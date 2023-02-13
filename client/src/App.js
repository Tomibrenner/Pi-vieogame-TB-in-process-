import { Home, Landing, Detail, Form } from "./views";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import About from "./views/About/About";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/videogames" component={Home} />

        <Route exact path="/creategame" component={Form} />

        <Route exact path="/videogame/:idVideogame" component={Detail} />

        <Route exact path="/about" component={About} />

      </Switch>
    </div>
  );
}

export default App;
