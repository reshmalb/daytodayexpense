import React, { useState,useEffect,useMemo } from 'react';
import './ExpenseForm.css';
import axios from 'axios';

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

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://fir-login-aea12-default-rtdb.firebaseio.com/expense.json'
        );
        const data = response.data;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newExpense = { amount, description, category };

  try{
    const response=await axios.post('https://fir-login-aea12-default-rtdb.firebaseio.com/expense.json',{
     title:description,
     category:category,
     amount,amount
    })
    console.log(response)
    if(response.status===200){
    setExpenses([...expenses, newExpense]);
    }
     
  }catch(error){
    console.log(error.message)
  }





    setAmount('');
    setDescription('');
    setCategory('');
  };

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
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <div>{`Amount: ${expense.amount}`}</div>
              <div>{`Description: ${expense.description}`}</div>
              <div>{`Category: ${expense.category}`}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default ExpenseForm;