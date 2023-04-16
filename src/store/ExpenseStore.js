import { createSlice } from "@reduxjs/toolkit";

const initialExpense={expensedetails:[]}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpense,
    reducers:{
              addExpenses(state,action){
                state.expensedetails=[action.payload]
                console.log("expensedetails",state.expensedetails)
              }
            }
})
export const  expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;