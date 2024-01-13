// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataReducer'; // Create your own reducer

const store = configureStore({
  reducer: {
    data: dataReducer,
    // Add other reducers as needed
  },
});

export default store;
