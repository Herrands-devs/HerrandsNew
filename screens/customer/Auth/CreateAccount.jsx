import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { RoundedButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const CreateAccount = ({ navigation }) => {
  const [values, setValues] = useState({
    phone_number: "",
    first_name: "",
    last_name: "",
  });

  const continueToNext = () => {
    navigation.navigate("OneMoreStep", {
      phone_number: values.phone_number,
      first_name: values.first_name,
      last_name: values.last_name,
    });
  };

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
              value={values.phone_number}
              onChangeText={(text) =>
                setValues({ ...values, phone_number: text })
              }
              onBlur={() => {
                const phoneNumber = values.phone_number;
                if (values.phone_number === "") {
                  return;
                } else if (values.phone_number.includes("+234")) {
                  return;
                } else {
                  setValues({ ...values, phone_number: "+234" + phoneNumber });
                }
              }}
            />
            <PrimaryInput
              label={"First name"}
              classes={`my-[22px]`}
              placeHolder={"Enter your first name"}
              value={values.first_name}
              onChangeText={(text) =>
                setValues({ ...values, first_name: text })
              }
            />
            <PrimaryInput
              label={"Last name"}
              placeHolder={"Enter your last name"}
              value={values.last_name}
              onChangeText={(text) => setValues({ ...values, last_name: text })}
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
          onPress={continueToNext}
          styles={{
            backgroundColor: colors.primaryColor,
            // width: "80%",
          }}
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
