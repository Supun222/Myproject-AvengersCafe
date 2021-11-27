import './App.css';
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import CustomerRegister from './Onboarding/CustomerRegister.js';
import Home from './Home';
import FoodOrder from './FoodOrder';
import KitchenMainComponent from "./Components/Kitchen/KitchenMain.jsx"
import DashboardMainComponent from "./Components/Dashboard/DashboardMain.jsx"

function App() {
  return (
    <Router>
      <div className="App bg-red-500">
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
          <Route path="/kitchen">
            <KitchenMainComponent/>
          </Route>
          <Route path="/dashboard/:userType">
            <DashboardMainComponent/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
