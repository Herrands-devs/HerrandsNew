import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (token !== null) {
    console.log("Availble token is :::", token);
    return token;
  } else {
    console.log("There's no token here");
  }
};
