import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import { PhoneNumberInput } from "../../components/common/Inputs";
import {
  DisabledRoundedBtn,
  RoundedButton,
  SquareButton,
} from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import { useState } from "react";
import axios from "axios";
import { API_URl } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SuccessErrorModal } from "../../components/common/Modals";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";
import KeyboardAvoidingContainer from "../../components/common/KeyboardAvoidingContainer";
import isEmpty from "../../components/isEmpty";

const { width, height } = Dimensions.get("window");

const SignInPhone = ({ navigation }) => {
  const [phone_number, setPhone_number] = useState();
  const [empty, setEmpty] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [tempPhone, setPhone] = useState("");

  useEffect(() => {
    if (isEmpty(phone_number) || phone_number === '+234') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [phone_number]);
  const signinIn = async () => {
    setLoading(true);
    const data = { contact: phone_number };

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
            navigation.navigate("OtpScreen", { phone_number: phone_number });
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
            setIsModal(true);
            setMessage("Internet connection error , Try again");
            setMessageType("error");
            console.log("No response received:", err.request);
          } else {
            console.log("Request error:", err.message);
          }
        });
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaComponent classes={`h-screen`}>
        <View style={""}>
          <View className={`mt-[40px]  w-[100%] p-4`}>
            <View className={`items-center w-full flex`}>
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[24px]" : "text-[18px]"
                } font-montserratBold text-center text-black`}
              >
                Enter your Registered number
              </Text>
            </View>

            <View className={`w-full items-center mt-[40px]`}>
              <View className="w-full">
                <PhoneNumberInput
                  style={"w-full"}
                  type={"phone-pad"}
                  label={"Mobile Number"}
                  placeHolder={"Enter Phone Number"}
                  value={tempPhone}
                  onChangeText={(text) =>
                    setPhone(text) || setPhone_number("+234" + text)
                  }
                  onBlur={() => {
                    const phoneNumber = phone_number;
                    if (phone_number === "") {
                      return;
                    } else if (phone_number.includes("+234")) {
                      return;
                    } else {
                      setPhone_number("+234" + tempPhone);
                    }
                  }}
                  bgColor={true}
                />
                <Text className=""></Text>
              </View>
            </View>
            <View className={`items-center mt-5`}>
              <SquareButton
                text={"Log In"}
                onPress={signinIn}
                // styles={{
                //   backgroundColor: colors.primaryColor,
                //   // width: "80%",
                // }}
                disabled={empty}
                loading={isLoading}
              />
            </View>
          </View>
        </View>

        <View className={`items-center`} style={""}>
          <View className={`flex-row items-center mt-10 space-x-1`}>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
              } font-montserratSemiBold text-subTitle`}
            >
              Don't have your phone number?
            </Text>
            <TouchableOpacity>
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                } font-montserratSemiBold text-primaryColor`}
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
    </KeyboardAvoidingContainer>
  );
};

export default SignInPhone;

const styles = StyleSheet.create({});
