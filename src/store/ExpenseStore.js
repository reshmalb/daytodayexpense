import { createSlice } from "@reduxjs/toolkit";

const initialExpense={expensedetails:[],totalExpenses:0,showActivatePremium:false}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpense,
    reducers:{
        fetchExpenses(state,action){
                  const fetchedExpenses = action.payload;
                  const expenseArray= Object.entries(fetchedExpenses).map(([key, value]) => ({ key, value }));

                  const fetchedTotalExpenses = expenseArray.reduce((total, expense) => 
                  total +parseInt( expense.value.amount), 0);
                  
                  const fetchedShowActivatePremium = fetchedTotalExpenses >= 10000;
                   
                       
                        state.expensedetails=expenseArray;
                        state.totalExpenses= fetchedTotalExpenses;
                      state.showActivatePremium = fetchedShowActivatePremium;
                                
                  },
        addExpenses(state,action){
                const newExpenses = [...state.expenses, action.payload];
                 const newTotalExpenses = state.totalExpenses + action.payload.amount;
                const newShowActivatePremium = newTotalExpenses >= 10000;
                   return {
                       ...state,
                 expensedetails: newExpenses,
                 totalExpenses: newTotalExpenses,
                 showActivatePremium: newShowActivatePremium,
                  };
                  }
               }
})
export const  expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;