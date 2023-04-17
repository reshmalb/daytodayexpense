import { createSlice } from "@reduxjs/toolkit";

const initialTheme={theme: 'light',}

const themeSlice=createSlice({
    name:'Toggle-Theme',
    initialState:initialTheme,
    reducers:{
             toggleTheme(state){
               state.theme= state.theme === 'light' ? 'dark' : 'light'
               console.log("theme",state.theme)

            }
        }
})


export const themeActions=themeSlice.actions;
export default themeSlice.reducer;
