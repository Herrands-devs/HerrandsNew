// reducers/dataReducer.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
   name: "data",
   initialState: {
      categories: [],
      subcategories : [],
      subcategory : [],
      vehicles : [],
      isLoading : false,
      connectedSocket : false
   },
   reducers: {
      storeCategories: (state, { payload }) => {
        state.categories = payload.data;
      },
      storeSubCategories: (state, { payload }) => {
         state.subcategories = payload.data;
      },
      storeSubCategory: (state, { payload }) => {
         state.subcategory = payload.data;
      },
      storeVehincle : (state, { payload }) => {
         state.vehicles = payload.data;
      },
      toggleIsLoading : (state , {payload}) => {
         state.isLoading = payload.data
      },
      toggleIsSocketConnected : (state , {payload}) => {
         state.connectedSocket = payload.data
      }
       
   },
});


export const { storeCategories , storeSubCategories , storeVehincle , toggleIsLoading , toggleIsSocketConnected , storeSubCategory} = dataSlice.actions;
export const DataSelector = (state) => state.data;
export default dataSlice.reducer;
