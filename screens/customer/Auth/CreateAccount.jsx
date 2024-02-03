import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { RoundedButton, SquareButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { colors } from "../../../themes/colors";
import KeyboardAvoidingContainer from "../../components/common/KeyboardAvoidingContainer";
import isEmpty from "../../components/isEmpty";

const { width, height } = Dimensions.get("window");

const CreateAccount = ({ navigation }) => {
  const [tempPhone, setPhone] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [empty , setEmpty] = useState(false)
  const [values, setValues] = useState({
    phone_number: "",
    first_name: "",
    last_name: "",
  });
  useEffect(() => {
    if(isEmpty(values.phone_number) && isEmpty(values.first_name) || isEmpty(values.last_name)) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  },[values.phone_number , values.first_name , values.last_name ])
  console.log(values)

  const continueToNext = () => {
    setLoading(true)
    setTimeout(() => {
      navigation.navigate("OneMoreStep", {
        phone_number: values.phone_number,
        first_name: values.first_name,
        last_name: values.last_name,
      });
      setLoading(false)
    }, 3000)
  };

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaComponent classes={`h-screen mb-50`}>
        <View className={``} style={{ marginBottom: height * 0.0877 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className={`absolute ${
              Platform.OS == "ios" ? "ml-[20px]" : "ml-[10px] "
            }  z-20`}
          >
            <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>
          <View className={`mt-[40px] w-[100%] p-4`}>
            <View className="flex w-full">
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[24px]" : "text-[18px]"
                } font-montserratBold text-center text-black`}
              >
                Create an account
              </Text>
              <Text
                className={`text-[14px] font-montserratRegular text-center text-black mt-[8px]`}
              >
                It's easy, quick and safe!
              </Text>
            </View>

            <View className={`flex pt-[40px]`}>
              <View className="flex gap-y-5">
                <View>
                  <PhoneNumberInput
                    style={"w-full"}
                    type={"phone-pad"}
                    label={"Mobile Number"}
                    placeHolder={"Enter Phone Number"}
                    value={tempPhone}
                    onChangeText={(text) =>
                      setPhone(text) ||
                      setValues({ ...values, phone_number: "+234" + text })
                    }
                    onBlur={() => {
                      const phoneNumber = values.phone_number;
                      if (values.phone_number === "") {
                        return;
                      } else if (values.phone_number.includes("+234")) {
                        return;
                      } else {
                        setValues({ ...values, phone_number: "+234" + tempPhone });
                      }
                    }}
                    bgColor={true}
                  />
                  <Text className=""></Text>
                </View>
                <View>
                  <PrimaryInput
                    label={"First name"}
                    classes={``}
                    placeHolder={"Enter your first name"}
                    value={values.first_name}
                    onChangeText={(text) =>
                      setValues({ ...values, first_name: text })
                    }
                    bgColor={true}
                  />
                </View>
                <View>
                  <PrimaryInput
                    label={"Last name"}
                    placeHolder={"Enter your last name"}
                    value={values.last_name}
                    onChangeText={(text) =>
                      setValues({ ...values, last_name: text })
                    }
                    bgColor={true}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          className={`items-center px-4`}
        >
          <SquareButton
            text={"Continue"}
            onPress={continueToNext}
            // styles={{
            //   backgroundColor: colors.primaryColor,
            //   // width: "80%",
            // }}
            disabled={empty}
            loading={isLoading}
          />
          <View className={`flex-row items-center gap-x-1 mt-[18px]`}>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
              } font-montserratMedium  text-subTitle`}
            >
              Already have an account?
            </Text>
            <TouchableOpacity>
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                } font-montserratMedium  text-primaryColor`}
                onPress={() => navigation.navigate("SignInPhone")}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className={`items-center mt-10`}>
          <Text
            className={`font-montserratMedium ${
              Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
            } text-center text-subTitle`}
            style={{ width: width * 0.7 }}
          >
            Send us your errands and enjoy more quality time in your day.
          </Text>
        </View>
      </SafeAreaComponent>
    </KeyboardAvoidingContainer>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
