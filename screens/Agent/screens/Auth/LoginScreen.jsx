import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { iconsPack } from "../../../components/icons";
import { colors } from "../../../../themes/colors";
import {
  PhoneNumberInput,
  PrimaryInput,
} from "../../../components/common/Inputs";
import {
  DisabledRoundedBtn,
  DisabledSquareBtn,
  SquareButton,
} from "../../../components/common/Button";
import { SuccessErrorModal } from "../../../components/common/Modals";
const { width, height } = Dimensions.get("window");
import ErrorIcon from "../../../../assets/error-message.png";
import SuccessIcon from "../../../../assets/icons/thank-you.png";
import { API_URl } from "@env";
import axios from "axios";
import isEmpty from "../../../components/isEmpty";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation, route }) => {
  const [phone_number, setPhone_number] = useState();
  const { angleLeft } = iconsPack();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [contact, setContact] = useState();
  const signinIn = async () => {
    setLoading(true);
    const data = { contact: "+234" + phone_number };

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
            AsyncStorage.setItem("userType", "Agent");
            navigation.navigate("OtpScreenAgent", {
              phone_number: "+234" + phone_number,
            });
          } else {
            setLoading(false);
            console.log("response error:::", response.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            console.log("Error response data:", err.response.data);
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
    <SafeAreaView className="bg-white h-screen">
      <View className="p-4 font-montserratRegular flex flex-row items-center gap-5" style={{ marginBottom: height * 0.0377 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
      </View>
      <View className="p-4 w-full">
        <Text
          className={`${
            Platform.OS == "ios" ? "text-[24px]" : "text-[18px]"
          } font-montserratBold  mb-1 line-clamp-[43px]`}
        >
          Welcome Back !
        </Text>
        <Text style={{ color: colors.primaryColor }} className={`${
            Platform.OS == "ios" ? "text-[16px]" : "text-[12px]"
          } font-montserratRegular  text-black`}>
          Please enter your registered phone number
        </Text>
        <View className="flex w-full items-center  h-[150px] justify-between">
          <PhoneNumberInput
            style={"w-full"}
            placeHolder={"Enter Mobile Number"}
            type={"phone-pad"}
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
            bgColor={true}
          />
          {!isEmpty(phone_number) ? (
            phone_number === undefined ||
            phone_number === "" ||
            phone_number.toString().length < 10 ? (
              <DisabledSquareBtn text={"Sign in"} />
            ) : (
              <SquareButton
                text="Sign In"
                onPress={signinIn}
                loading={loading}
                styles={{ backgroundColor: colors.primaryColor, width: "100%" }}
              />
            )
          ) : (
            <DisabledSquareBtn text={"Sign in"} />
          )}
        </View>
        <View className={`items-center`} style={{ height: height * 0.35 }}>
          <View className={`flex-row items-center mt-[18px] space-x-1`}>
            <Text
             className={`${
              Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
            } font-montserratMedium  text-subTitle`}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity>
              <Text
                 className={`${
                  Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                } font-montserratMedium  text-primaryColor`}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
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
    </SafeAreaView>
  );
};

export default LoginScreen;
