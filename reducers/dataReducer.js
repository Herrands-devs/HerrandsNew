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
      connectedSocket : false,
      isModal : false,
      Authentication : {
         isBoard : false,
         isAuth : false,
         isNew : true,
         userId : "",
         user_type : ""
      }
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
      },
      storeAuthentication : (state , {payload}) => {
         state.Authentication = payload.data
      },
      toggleModal : (state , {payload}) => {
         state.isModal = payload.data
      }
       
   },
});


export const { storeCategories , storeSubCategories , storeVehincle , toggleIsLoading , toggleIsSocketConnected , storeSubCategory , storeAuthentication , toggleModal} = dataSlice.actions;
export const DataSelector = (state) => state.data;
export default dataSlice.reducer;
