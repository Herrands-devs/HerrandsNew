import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { storeCategories, storeSubCategories, storeSubCategory, storeVehincle, toggleIsSocketConnected } from "../reducers/dataReducer";
import useSocket from "./socket.service";

export const fetchCategoriesAction = async (dispatch) => {
  try {
    await axios
    .get(`https://jellyfish-app-gd9q8.ondigitalocean.app/api/categories`)
    .then((res) => {
      // console.log("categories responseeee", res.data);
      dispatch(storeCategories({
        data : res.data
      }));
    })
    .catch((err) => {
      console.log(err);
    });
  } catch(err) {
    console.log(err)
  }
};

export const fetchAllSubCategories = async (dispatch) => {
  try {
    await axios
    .get(`https://jellyfish-app-gd9q8.ondigitalocean.app/api/all-subtypes`)
    .then((res) => {
      // console.log("sub-categories responseeee", res.data);
      dispatch(storeSubCategories({
        data : res.data
      }));
    })
    .catch((err) => {
      console.log(err);
    });
  } catch(err) {
    console.log(err)
  }
};


export const fetchSubCategories = async (dispatch, id) => {
  try {
    await axios
    .get(`https://jellyfish-app-gd9q8.ondigitalocean.app/api/subtypes/?category_id=${id}`)
    .then((res) => {
      console.log("sub-categories responseeee", res.data);
      dispatch(storeSubCategory({
        data : res.data
      }));
    })
    .catch((err) => {
      console.log(err);
    });
  } catch(err) {
    console.log(err)
  }
};

export const fetchVehicleTypes = (dispatch) => {
  axios
    .get("https://jellyfish-app-gd9q8.ondigitalocean.app/api/vehicle-metric/")
    .then((res) => {
      // console.log("Vehicle type:::", res.data);
      dispatch(storeVehincle({
        data : res.data
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};


export const connectToSocket = (dispatch) => {
  try {
    initializeSocket()
    if(isConnected) {
      dispatch(toggleIsSocketConnected({
        data : isConnected
      }))

      console.log(isConnected);
    }
  }
  catch (err) {
    console.log(err)
  }
};
