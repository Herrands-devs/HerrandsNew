import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import { PhoneNumberInput } from "../../components/common/Inputs";
import { RoundedButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const SignInPhone = ({ navigation }) => {
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
            onPress={() => navigation.navigate("OtpScreen")}
            styles={{
              backgroundColor: colors.primaryColor,
              // width: "80%",
            }}
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
