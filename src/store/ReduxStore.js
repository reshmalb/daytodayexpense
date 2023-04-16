import { configureStore } from "@reduxjs/toolkit";

import ExpenseReducer  from './ExpenseStore'
import AuthorizationReducer  from './AuthStore'

const store=configureStore({
    reducer:{expense:ExpenseReducer,
              author: AuthorizationReducer,
            }  
});


export default store;

