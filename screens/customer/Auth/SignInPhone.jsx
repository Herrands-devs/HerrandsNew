import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import { PhoneNumberInput } from "../../components/common/Inputs";
import { RoundedButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import { useState } from "react";
import axios from "axios";
import { API_URl } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SignInPhone = ({ navigation }) => {
  const [phone_number, setPhone_number] = useState();
  const [loading, setLoading] = useState(false);

  const signinIn = async () => {
    setLoading(true);
    const data = { contact: phone_number };

    console.log("hitting endpoint:::", `${API_URl}/accounts/login-with-otp/`);

    axios
      .post(`${API_URl}/accounts/login-with-otp/`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          navigation.navigate("OtpScreen");
          console.log(response.data);
        } else {
          setLoading(false);
          console.log("response error:::", response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("catch error:::", err.message);
      });
  };

  return (
    <SafeAreaComponent>
      <View style={{ height: height * 0.75 }}>
        <View className={`items-center`}>
          <Text
            className={`text-[24px] font-montserratBold text-center text-black`}
            style={{ marginTop: height * 0.2, maxWidth: width * 0.6 }}
          >
            Enter your registered number
          </Text>
        </View>

        <View
          className={`items-center mt-[40px]`}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <PhoneNumberInput
            placeHolder={"Phone number"}
            type={"phone-pad"}
            label={"Phone number"}
            value={phone_number}
            onChangeText={(text) => setPhone_number(text)}
            onBlur={() => {
              if (phone_number === "") {
                return;
              } else if (phone_number.includes("+234")) {
                return;
              } else {
                setPhone_number((prevState) => "+234" + prevState);
              }
            }}
          />
        </View>
        <View
          className={`items-center mt-[70px]`}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <RoundedButton
            text={"Sign in"}
            onPress={signinIn}
            styles={{
              backgroundColor: colors.primaryColor,
            }}
            loading={loading}
          />
        </View>
      </View>

      <View className={`items-center`} style={{ height: height * 0.35 }}>
        <View className={`flex-row items-center mt-[18px] space-x-1`}>
          <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
            Don't have your phone number?
          </Text>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratSemiBold text-primaryColor`}
              onPress={() => navigation.navigate("SignInEmail")}
            >
              Sign in with email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default SignInPhone;

const styles = StyleSheet.create({});
