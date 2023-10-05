import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { TouchableOpacity } from "react-native";
import { OtpInputs } from "../../components/common/Inputs";
import { ResendModal } from "../../components/common/Modals";
import Loading from "../../components/common/Loading";

const { width, height } = Dimensions.get("window");

const OtpScreen = ({ navigation }) => {
  const [moveup, setMoveup] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [resend, setResend] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (newValues) => {
    setOtpValues(newValues);
  };

  const handleOtpComplete = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace("CustomerHome");
    }, 3000);
  };

  const resendCodeBySms = () => {
    closeModal();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
      () => {
        setMoveup(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setMoveup(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
            +234 7020304050
          </Text>
          <TouchableOpacity className={`mt-[4px]`}>
            <Text
              className={`text-primaryColor text-[14px] font-montserratMedium`}
            >
              Edit phone number
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className={``}
          style={{ height: moveup ? height * 0.3 : height * 0.6 }}
        >
          <OtpInputs
            otpValues={otpValues}
            onOtpChange={handleOtpChange}
            onOtpComplete={handleOtpComplete}
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
        />
      </SafeAreaComponent>
      {loading && <Loading />}
    </>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
