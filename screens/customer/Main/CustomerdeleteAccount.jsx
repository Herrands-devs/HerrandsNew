import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import CloseIcon from "../../../assets/icons/resend-close.png";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import { GlobalContext } from "../../../context/context.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URl } from "../../../config";

const { width, height } = Dimensions.get("window");

const CustomerdeleteAccount = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setIsOnboarded } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem("token");

      if (userToken !== null) {
        setToken(userToken);
      } else {
        console.log("There's no user token yet!!");
      }
    })();
  }, []);

  const deleteAccount = () => {
    setLoading(true);

    console.log(token);
    axios
      .delete(`${API_URl}/accounts/delete-user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        AsyncStorage.removeItem("user_id");
        AsyncStorage.removeItem("user_data");
        AsyncStorage.removeItem("token");
        setIsAuthenticated(false);
        setIsOnboarded(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log("Error response data:", err.response.data);
          // setIsModal(true);
          // setMessage(err.response.data.error);
          // setMessageType("error");
        } else if (err.request) {
          console.log("No response received:", err.request);
        } else {
          console.log("Request error:", err.message);
        }
      });
  };

  return (
    <SafeAreaComponent classes={`px-[16px]`}>
      <View
        className={`flex-row items-center justify-between`}
        style={{ marginBottom: height * 0.061 }}
      >
        <Text className={`text-[24px] font-montserratBold text-black`}>
          Delete account
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={CloseIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: height * 0.58 }}>
        <Text
          className={`text-[16px] font-montserratRegular text-black leading-[21px]`}
        >
          We wish you wouldn't leave us 💔 Deleting your account means all your
          data will be erased. Are you sure you want to delete your account?
        </Text>
      </View>

      <View>
        <SquareButton
          text={"Delete account"}
          styles={{ backgroundColor: colors.red }}
          onPress={deleteAccount}
          loading={loading}
        />
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerdeleteAccount;

const styles = StyleSheet.create({});
