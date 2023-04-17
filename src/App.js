import './App.css';
import LoginForm from './pages/LoginForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import ExpenseForm from './pages/ExpenseForm';
import store from './store/ReduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from './store/ThemeReducer';
import Papa from 'papaparse';

function App() {
  const isAuth=useSelector((state)=>state.author.isAuthenticated)
  const theme=useSelector((state)=>state.toggletheme.theme)
  const expenses=useSelector((state)=>state.expense.expensedetails)
  const  isShowPremium=useSelector((state)=>state.expense.showActivatePremium)

  console.log("theme",theme)

  const dispatch=useDispatch();
  console.log("is auth",isAuth)
  const togglethemeHandler=()=>{
    dispatch(themeActions.toggleTheme())

  }
  const activePremiumHandler=()=>{
    console.log("premium button clicked")
  }
  const downloadExpenses = () => {
    const data = expenses.map(expense => [expense.value.title, expense.value.amount, expense.value.category]);
  console.log("data",data)

    const csv = Papa.unparse(data, {
      fields: ["key", "amount", "description", "category"],
    });

    
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'expenses.csv');
    link.click();
  };

  return (
    <div className={`App ${theme}`}>
      <button onClick={togglethemeHandler}>toggle theme</button>
      <button onClick={downloadExpenses}>Download Expenses</button>
      { isShowPremium &&  <button onClick={activePremiumHandler}>Acivate Premium</button> }
       <Switch>
      <Route path="/login" exact><LoginForm/></Route>
      <Route path="/addexpense" exact><ExpenseForm/></Route>
       </Switch>
      

    </div>
  );
}

export default App;