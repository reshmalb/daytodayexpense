import React, { useState,useEffect,useMemo } from 'react';
import './ExpenseForm.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../store/ExpenseStore';

const fetchData=async()=>{
    try{
      const response= await axios.get('https://fir-login-aea12-default-rtdb.firebaseio.com/expense.json')
      const data = response.docs.map((doc) => doc.data());
        return data;
    }catch(error){
        console.log(error)
    }
}



function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [data,setData]=useState([])
  const [editId,setEditId]=useState(null)
  //redux state update
  const dispatch=useDispatch();
  


  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://fir-login-aea12-default-rtdb.firebaseio.com/expense.json'
      );
      const data = response.data;
      dispatch(expenseActions.addExpenses(data))
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
   

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const newExpenses = Object.keys(data).map((key) => ({
        id: key,
        amount: data[key].amount,
        description: data[key].title,
        category: data[key].category,
      }));

      setExpenses(newExpenses);
    }
  }, [data]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
//SUBMIT HANDLER
  const handleSubmit = async(event) => {
    event.preventDefault();  

  try{
    let response;
   
    if(editId!=null){
        response=await axios.put(`https://fir-login-aea12-default-rtdb.firebaseio.com/expense/${editId}.json`,{
            title:description,
            category:category,
            amount:amount
           })
           setEditId(null);
     
    }else{       
        response=await axios.post(`https://fir-login-aea12-default-rtdb.firebaseio.com/expense.json`,{
            title:description,
            category:category,
            amount:amount
           }) 

    }

    
    console.log(response.data)
    if(response.status===200){
        fetchData();
    // const newExpense = { 
    //     id:response.data.name,
    //     amount:amount,
    //     description:description,
    //     category:category
    //  };

    // setExpenses([...expenses, newExpense]);


    }
     
  }catch(error){
    console.log(error.message)
  }
    setAmount('');
    setDescription('');
    setCategory('');
  };


  //EDIT BUTTON HANDLER
  const editButtonHandler= (expense)=>{
    setEditId(expense.id)
    console.log("editid",editId)
    setAmount(expense.amount)
    setDescription(expense.description)
    setCategory(expense.category)


  

  }
//EDIT HANDLER ENDS HERE
//DELETE BUTTON HANDLER
const deleteButtonHandler= async (id)=>{
    try {
        const response=await axios.delete(`https://fir-login-aea12-default-rtdb.firebaseio.com/expense/${id}.json`);
        if(response.status===200){
            alert ("expense deleted")
            fetchData();
        }
       
      } catch (error) {
        console.log(error);
      }
    
}

//DELETE BUTTON HANDLER ENDS HERE





  return (
    <div className="expense-form-container">
      <form className="expense-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          min="0"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          {/* Add more options here */}
        </select>
        <button type="submit">Add expense</button>
      </form>
      <div className="expense-list">
        <h2>Expenses</h2>
        <table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {expenses.map((expense, index) => (
      <tr key={expense.id}>
        <td>{expense.category}</td>
        <td>{expense.description}</td>
        <td>{expense.amount}</td>
        <td>
          <button onClick={editButtonHandler.bind(null,expense)}>Edit</button>
        </td>
        <td>
          <button onClick={deleteButtonHandler.bind(null,expense.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}


export default ExpenseForm;