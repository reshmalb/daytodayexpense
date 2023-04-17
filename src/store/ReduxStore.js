import { configureStore } from "@reduxjs/toolkit";

import ExpenseReducer  from './ExpenseStore'
import AuthorizationReducer  from './AuthStore'
import ThemeReducer from './ThemeReducer'

const store=configureStore({
    reducer:{expense:ExpenseReducer,
              author: AuthorizationReducer,
              toggletheme:ThemeReducer,
            }  
});


export default store;

