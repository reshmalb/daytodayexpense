import './App.css';
import LoginForm from './pages/LoginForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import ExpenseForm from './pages/ExpenseForm';
import store from './store/ReduxStore';
import { useSelector } from 'react-redux';

function App() {
  const isAuth=useSelector((state)=>state.author.isAuthenticated)
  console.log("is auth",isAuth)

  return (
    <div>
       <Switch>
      <Route path="/login" exact><LoginForm/></Route>
      <Route path="/addexpense" exact><ExpenseForm/></Route>
       </Switch>
      

    </div>
  );
}

export default App;