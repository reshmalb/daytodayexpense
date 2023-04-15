import './App.css';
import LoginForm from './pages/LoginForm';
import { Route } from 'react-router-dom';
import ExpenseForm from './pages/ExpenseForm';

function App() {
  return (
    <div>
       
     <Route path="/login"><LoginForm/></Route>
     <Route path="/addexpense"><ExpenseForm/></Route>

    </div>
  );
}

export default App;