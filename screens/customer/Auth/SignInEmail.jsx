import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { RoundedButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const SignInEmail = ({ navigation }) => {
  return (
    <SafeAreaComponent>
      <View style={{ height: height * 0.75 }}>
        <View className={`items-center`}>
          <Text
            className={`text-[24px] font-montserratBold text-center text-black`}
            style={{ marginTop: height * 0.2, maxWidth: width * 0.5 }}
          >
            Enter your registered email
          </Text>
        </View>

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
    </SafeAreaComponent>
  );
};

export default SignInEmail;

const styles = StyleSheet.create({});
