import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { colors } from "../../../themes/colors";
import { RoundedButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { API_URl } from "../../../config";
import axios from "axios";
import { SuccessErrorModal } from "../../components/common/Modals";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";

const { width, height } = Dimensions.get("window");

const EnterYourNumber = ({ navigation }) => {
  const [phone_number, setPhone_number] = useState();
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  const signinIn = async () => {
    setLoading(true);
    const data = { contact: phone_number };

    console.log("hitting endpoint:::", `${API_URl}/accounts/login-with-otp/`);

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
  };

  return (
    <SafeAreaComponent>
      <View style={{ height: height * 0.85 }}>
        <Text
          className={`text-[24px] font-montserratBold text-center text-black`}
          style={{ marginTop: height * 0.2 }}
        >
          Enter your number
        </Text>

        <View
          className={`items-center mt-[40px] `}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <PhoneNumberInput
            placeHolder={"Phone number"}
            type={"phone-pad"}
            label={"Phone number"}
            value={phone_number}
            onChangeText={(text) => setPhone_number(text)}
            onBlur={() => {
              if (phone_number === "") {
                return;
              } else if (phone_number.includes("+234")) {
                return;
              } else {
                setPhone_number((prevState) => "+234" + prevState);
              }
            }}
          />
        </View>
        <View
          className={`items-center mt-[70px] `}
          style={{
            paddingHorizontal: width * 0.0569,
          }}
        >
          <RoundedButton
            text={"Continue"}
            onPress={signinIn}
            styles={{
              backgroundColor: colors.primaryColor,
            }}
            loading={loading}
          />
        </View>
      </View>

      <View className={`space-y-1`}>
        <View className={`flex-row items-center space-x-1 justify-center`}>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            By continuing,
          </Text>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              terms of service
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            and{" "}
          </Text>
        </View>
        <View className={`items-center flex-row justify-center space-x-1`}>
          <TouchableOpacity>
            <Text
              className={`text-[14px] font-montserratMedium text-primaryColor`}
            >
              privacy policy
            </Text>
          </TouchableOpacity>
          <Text className={`text-[14px] font-montserratMedium text-subTitle`}>
            apply
          </Text>
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
  );
};

export default EnterYourNumber;

const styles = StyleSheet.create({});
