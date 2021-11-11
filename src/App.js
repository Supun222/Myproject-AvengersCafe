import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import CustomerRegister from './Onboarding/CustomerRegister.js';
import Home from './Home';
import FoodOrder from './FoodOrder';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/customer-safety">
            <CustomerRegister />
          </Route>
          <Route path="/order">
            <FoodOrder />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
