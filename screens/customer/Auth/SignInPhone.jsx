import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import { PhoneNumberInput } from "../../components/common/Inputs";
import {
  DisabledRoundedBtn,
  RoundedButton,
} from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import { useState } from "react";
import axios from "axios";
import { API_URl } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SuccessErrorModal } from "../../components/common/Modals";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";

const { width, height } = Dimensions.get("window");

const SignInPhone = ({ navigation }) => {
  const [phone_number, setPhone_number] = useState();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [contact, setContact] = useState();

  const signinIn = async () => {
    setLoading(true);
    const data = { contact: contact };

    console.log("hitting endpoint:::", `${API_URl}/accounts/login-with-otp/`);
    console.log("number to send to:::", data);

    if (phone_number === undefined || phone_number === "") {
      setLoading(false);
      return;
    } else {
      axios
        .post(`${API_URl}/accounts/login-with-otp/`, data)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setLoading(false);
            navigation.navigate("OtpScreen", { phone_number: contact });
            console.log(response.data);
          } else {
            setLoading(false);
            console.log("response error:::", response.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            console.log("Error response data::", err.response.data);
            setIsModal(true);
            setMessage(err.response.data.error);
            setMessageType("error");
          } else if (err.request) {
            console.log("No response received:", err.request);
          } else {
            console.log("Request error:", err.message);
          }
        });
    }
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
                setContact("+234" + phone_number);
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
          {phone_number === undefined || phone_number === "" ? (
            <DisabledRoundedBtn text={"Sign in"} />
          ) : (
            <RoundedButton
              text={"Sign in"}
              onPress={signinIn}
              styles={{
                backgroundColor: colors.primaryColor,
              }}
              loading={loading}
            />
          )}
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

      <SuccessErrorModal
        isVisible={isModal}
        closeModal={() => setIsModal(false)}
        message={message}
        image={
          (messageType !== null && messageType) === "error"
            ? ErrorIcon
            : SuccessIcon
        }
        title={
          (messageType !== null && messageType) === "error"
            ? "Oops!"
            : "Success!"
        }
        btnTxet={
          (messageType !== null && messageType) === "error"
            ? "Try again"
            : "Okay"
        }
      />
    </SafeAreaComponent>
  );
};

export default SignInPhone;

const styles = StyleSheet.create({});
