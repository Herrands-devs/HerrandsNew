import {
   Dimensions,
   Platform,
   StyleSheet,
   Text,
   View,
   Keyboard,
 } from "react-native";
 import React, { useEffect, useState } from "react";
 import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
 import { TouchableOpacity } from "react-native";
 import { OtpInputs } from "../../../components/common/Inputs";
 import { ResendModal } from "../../../components/common/Modals";
 import Loading from "../../../components/common/Loading";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import { iconsPack } from "../../../components/icons";
import { Image } from "react-native";
import { SquareButton } from "../../../components/common/Button";
import { colors } from "../../../../themes/colors";
 
 const { width, height } = Dimensions.get("window");
 
 const OtpScreenAgent = ({ navigation }) => {
   const [moveup, setMoveup] = useState(false);
   const [countdown, setCountdown] = useState(20);
   const [resend, setResend] = useState(false);
   const [isModalVisible, setModalVisible] = useState(false);
   const [otpValues, setOtpValues] = useState(["", "", "", ""]);
   const [loading, setLoading] = useState(false);
   const [keyboardHeight, setKeyboardHeight] = useState(0);
   const { angleLeft } = iconsPack();
 
   const handleOtpChange = (newValues) => {
     setOtpValues(newValues);
   };
   const handleOtpComplete = () => {
     setLoading(true);
     setTimeout(() => {
       setLoading(false);
       navigation.replace("HomeScreen");
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
       <KeyboardAvoidingContainer classes={`px-[16px] py-[18px]`}>
          <View className="p-4 font-montserratRegular flex flex-row items-center gap-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={angleLeft} />
            </TouchableOpacity>
          </View>
          <View className="flex justify-center items-center py-12 gap-6">
            <Text className="text-[30px] font-montserratBold">OTP Verification</Text>
            <Text className="text-[#0066F5] font-montserratMedium">A code was sent to 090345******4</Text>
          </View>
          <View
            className={`p-6`}
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
            />

            <View className="w-full">
              <SquareButton
                text="Verify otp"
                styles={{
                  backgroundColor: colors.primaryColor,
                  width: "100%",
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("CompleteScreen")}
              />
            </View>
            <View className="w-full">
                <View className="flex flex-row gap-1 justify-center items-center m-6 font-montserratMedium">
                  <Text className="text-[#6B7C97]">
                    Didnt Receive a code ?
                  </Text>
                  <Text className="text-[#0066F5] font-montserratSemiBold">Resend</Text>
                </View>
            </View>
          </View>
       </KeyboardAvoidingContainer>
       {loading && <Loading />}
     </>
   );
 };
 
 export default OtpScreenAgent;
 
 const styles = StyleSheet.create({});
 