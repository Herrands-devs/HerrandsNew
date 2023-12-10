import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (token !== null) {
    console.log("Availble token is :::",token);
    return token;
  } else {
    console.log("There's no token here");
  }
};

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem("user_id");

  if (userId !== null) {
    console.log("Availble token is :::", userId);
    return userId;
  } else {
    console.log("There's no id here");
  }
};