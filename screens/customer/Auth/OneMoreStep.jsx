import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PrimaryInput } from "../../components/common/Inputs";
import { colors } from "../../../themes/colors";
import { RoundedButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { RegisterUser } from "../../../api/customer/auth.service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { GlobalContext } from "../../../context/context.store";
import { API_URl } from "../../../config";

const { width, height } = Dimensions.get("window");

const OneMoreStep = ({ navigation, route }) => {
  const { phone_number, first_name, last_name } = route.params;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsNewUser, setIsAuthenticated } = useContext(GlobalContext);

  const registerUser = async () => {
    setLoading(true);
    console.log("email:::", email);

    const data = {
      phone_number: phone_number,
      email: email,
      first_name: first_name,
      last_name: last_name,
      user_type: "Customer",
    };
    console.log(`${API_URl}/accounts/register/`);

    axios
      .post(`${API_URl}/accounts/register/`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          console.log(response.data);
          const userId = response.data.user_id;
          AsyncStorage.setItem("user_id", userId);
          setIsNewUser(false);
          setIsAuthenticated(true);
        } else {
          setLoading(false);
          console.log("response error:::", response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log("Error response data:", err.response.data);
        } else if (err.request) {
          console.log("No response received:", err.request);
        } else {
          console.log("Request error:", err.message);
        }
      });
  };

  return (
    <SafeAreaComponent>
      <View style={{ height: height * 0.85 }}>
        <Text
          className={`text-[24px] font-montserratBold text-center text-black`}
          style={{ marginTop: height * 0.2 }}
        >
          One more step!
        </Text>

        <View
          className={`items-center mt-[40px]`}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <PrimaryInput
            iconName={"mail"}
            label={"Email"}
            iconColor={colors.subTitle}
            placeHolder={"Enter your email"}
            type={"email-address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          className={`items-center mt-[70px]`}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <RoundedButton
            text={"Let's Rock"}
            onPress={registerUser}
            styles={{
              backgroundColor: colors.primaryColor,
              // width: "80%",
            }}
            loading={loading}
          />
        </View>
      </View>

      <View className={`space-y-1`}>
        <View className={`flex-row items-center space-x-1 justify-center`}>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            By continuing,
          </Text>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              terms of service
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            and{" "}
          </Text>
        </View>
        <View className={`items-center flex-row justify-center space-x-1`}>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              privacy policy
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            apply
          </Text>
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default OneMoreStep;

const styles = StyleSheet.create({});
