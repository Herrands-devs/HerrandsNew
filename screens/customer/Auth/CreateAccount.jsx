import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { RoundedButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";

const { width, height } = Dimensions.get("window");

const CreateAccount = ({ navigation }) => {
  return (
    <SafeAreaComponent>
      <View className={``} style={{ marginBottom: height * 0.0877 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`absolute ml-[30px] z-20`}
        >
          <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
        <View className={`mt-[82px]`}>
          <View>
            <Text
              className={`text-[24px] font-montserratBold text-center text-black`}
            >
              Create an account
            </Text>
            <Text
              className={`text-[14px] font-montserratRegular text-center text-black mt-[8px]`}
            >
              It's easy, quick and safe
            </Text>
          </View>

          <View
            className={`items-center mt-[48px]`}
            style={{ paddingHorizontal: width * 0.0569 }}
          >
            <PhoneNumberInput
              placeHolder={"Phone number"}
              type={"phone-pad"}
              label={"Phone number"}
            />
            <PrimaryInput
              label={"First name"}
              classes={`my-[22px]`}
              placeHolder={"Enter your first name"}
            />
            <PrimaryInput
              label={"Last name"}
              placeHolder={"Enter your last name"}
            />
          </View>
        </View>
      </View>

      <View
        className={`items-center`}
        style={{
          marginBottom: height * 0.15,
          paddingHorizontal: width * 0.0569,
        }}
      >
        <RoundedButton
          text={"Continue"}
          onPress={() => navigation.navigate("OneMoreStep")}
        />
        <View className={`flex-row items-center mt-[18px]`}>
          <Text className={`text-[14px] font-montserratSemiBold text-subTitle`}>
            Already have an account?
          </Text>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratSemiBold text-primaryColor`}
              onPress={() => navigation.navigate("SignInPhone")}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className={`items-center`}>
        <Text
          className={`font-montserratMedium text-center text-subTitle`}
          style={{ width: width * 0.7 }}
        >
          Send us your errands and enjoy more quality time in your day.
        </Text>
      </View>
    </SafeAreaComponent>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
