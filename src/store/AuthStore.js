import {createSlice}  from '@reduxjs/toolkit'

const initialAuth =
 { isAuthenticated : false,
    token:null,
    userId:null}

const authSlice = createSlice({
    name:'authorization',
    initialState:initialAuth,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.payload.token;
            state.userId=action.payload.userId;
            // console.log("token",state.token)
            // console.log("userid",state.userId);
        },
        logout(state){
            state.isAuthenticated=false;
            state.token=null;
            state.userId=null;
        },

    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;