import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { TouchableOpacity } from "react-native";
import { OtpInputs } from "../../components/common/Inputs";
import { ResendModal, SuccessErrorModal } from "../../components/common/Modals";
import Loading from "../../components/common/Loading";
import { API_URl } from "@env";
import axios from "axios";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";
import { GlobalContext } from "../../../context/context.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OtpScreen = ({ navigation, route }) => {
  const [moveup, setMoveup] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [resend, setResend] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { phone_number } = route.params;
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const { setIsAuthenticated } = useContext(GlobalContext);
  const [error , setError] = useState(false);

  const handleOtpChange = (newValues) => {
    setError(false)
    setOtpValues(newValues);
  };

  const handleOtpComplete = () => {
    setLoading(true);
    console.log("Otp:::", otpValues.toString().replace(/,/g, ""));
    const strippedOtp = otpValues.toString().replace(/,/g, "");

    const data = {
      contact: phone_number,
      otp: strippedOtp,
    };

    console.log("otp data:::", data);

    axios
      .post(`${API_URl}/accounts/validate-otp/`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setIsAuthenticated(true);
          AsyncStorage.setItem("userType", response.data.user.user_type);
          AsyncStorage.setItem("userId", response.data.user.id);
          AsyncStorage.setItem("token", response.data.token);
        } else {
          setLoading(false);
          console.log("response error:::", response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setOtpValues(["", "", "", ""])
        if (err.response) {
          console.log("Error response data:::", err.response.data);
          setIsModal(true);
          setError(true)
          setMessage(err.response.data.error);
          setMessageType("error");
        } else if (err.request) {
          console.log("No response received:", err.request);
          setIsModal(true);
          setMessage("Server downtime");
          setMessageType("error");
        } else {
          console.log("Request error:", err.message);
        }
      });

    // setLoading(false);
    // navigation.replace("CustomerHome");
  };

  const resendCodeBySms = () => {
    closeModal();
    setLoading(true);
    const data = { contact: phone_number };

    console.log("hitting endpoint:::", `${API_URl}/accounts/login-with-otp/`);

    axios
      .post(`${API_URl}/accounts/login-with-otp/`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          console.log(response.data);
          setCountdown(20);
          setResend(false);
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setMoveup(true);
        setKeyboardHeight(e.endCoordinates.height);
        _keyboardDidShow(e);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setMoveup(false);
        setKeyboardHeight(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = (event) => {
    console.log("Keyboard height is: ", event.endCoordinates.height);
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setResend(true);
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return (
    <>
      <SafeAreaComponent classes={`px-[16px] py-[18px]`}>
        <View style={{ height: height * 0.05 }}>
          <Text className={`text-[16px] font-montserratBold`}>Enter Code</Text>
        </View>

        <View className={``} style={{ height: height * 0.2 }}>
          <Text className={`text-[14px] font-montserratBold text-subTitle`}>
            A code was sent to
          </Text>
          <Text className={`text-[16px] font-montserratBold mt-[4px]`}>
            {phone_number}
          </Text>
          <TouchableOpacity
            className={`mt-[4px]`}
            onPress={() => navigation.navigate("EnterYourNumber")}
          >
            <Text
              className={`text-primaryColor text-[14px] font-montserratMedium`}
            >
              Edit phone number
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className={``}
          style={{
            height: moveup
              ? Platform.OS === "android"
                ? height * 0.25
                : height * 0.3
              : height * 0.6,
          }}
        >
          <OtpInputs
            otpValues={otpValues}
            onOtpChange={handleOtpChange}
            onOtpComplete={handleOtpComplete}
            error={error}
          />
        </View>

        {!resend ? (
          <View className={`flex-row items-center space-x-1`}>
            <Text
              className={`text-subTitle text-[16px] font-montserratSemiBold`}
            >
              Resend code in
            </Text>
            <Text className={`text-black text-[16px] font-montserratSemiBold`}>
              {countdown}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            className={`flex-row items-center space-x-1 py-[16px]`}
            onPress={toggleModal}
          >
            <Text
              className={`text-primaryColor text-[16px] font-montserratSemiBold`}
            >
              Resend code
            </Text>
          </TouchableOpacity>
        )}
        <ResendModal
          isVisible={isModalVisible}
          closeModal={closeModal}
          resendAction={resendCodeBySms}
          navigation={navigation}
          contact={phone_number}
        />
      </SafeAreaComponent>
      {loading && <Loading />}
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
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
