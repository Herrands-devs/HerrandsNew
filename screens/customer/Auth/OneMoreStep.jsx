import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryInput } from "../../components/common/Inputs";
import { colors } from "../../../themes/colors";
import { RoundedButton, SquareButton } from "../../components/common/Button";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { RegisterUser } from "../../../api/customer/auth.service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { GlobalContext } from "../../../context/context.store";
import { API_URl } from "@env";
import { SuccessErrorModal } from "../../components/common/Modals";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";
import KeyboardAvoidingContainer from "../../components/common/KeyboardAvoidingContainer";
import isEmpty from "../../components/isEmpty";

const { width, height } = Dimensions.get("window");

const OneMoreStep = ({ navigation, route }) => {
  const { phone_number, first_name, last_name } = route.params;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsNewUser, setIsAuthenticated } = useContext(GlobalContext);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [empty , setEmpty] = useState(false)

  useEffect(() => {
    if(isEmpty(email)) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  },[email])
  const registerUser = async () => {
    setLoading(true);
    console.log("email:::", email);

    const data = {
      phone_number: phone_number,
      email: email,
      first_name: first_name,
      last_name: last_name,
      user_type: "Customer",
    };
    console.log(`${API_URl}/accounts/register/`);

    axios
      .post(`${API_URl}/accounts/register/`, data)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          console.log(response.data);
          const userId = response.data.user.id;
          AsyncStorage.setItem("user_id", userId);
          AsyncStorage.setItem("user_data", JSON.stringify(response.data.user));
          setIsAuthenticated(true);
          navigation.navigate("OtpScreen", {
            phone_number: phone_number,
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
          if (err.response.data.phone_number) {
            setIsModal(true);
            setMessage(err.response.data.phone_number);
            setMessageType("error");
          }
          if (err.response.data.email) {
            setIsModal(true);
            setMessage(err.response.data.email);
            setMessageType("error");
          }
        } else if (err.request) {
          console.log("No response received:", err.request);
          setIsModal(true);
          setMessage("Server downtime");
          setMessageType("error");
        } else {
          console.log("Request error:", err.message);
        }
      });
  };

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaComponent classes={`h-screen`}>
        <View style={{}}>
          <Text
            className={`text-[24px] font-montserratBold text-center text-black`}
            style={{ marginTop: height * 0.2 }}
          >
            One more step!
          </Text>

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
              value={email}
              onChangeText={(text) => setEmail(text)}
              bgColor={true}
            />
          </View>
          <View className={`items-center p-4 mt-[70px]`}>
            <SquareButton
              text={"Let's Rock"}
              onPress={registerUser}
              loading={loading}
              disabled={empty}
            />
          </View>
        </View>

        <View className={`space-y-1 mt-10`}>
          <View className={`flex-row items-center space-x-1 justify-center`}>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
              } font-montserratMedium text-subTitle`}
            >
              By continuing,
            </Text>
            <TouchableOpacity>
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                } font-montserratMedium text-primaryColor`}
              >
                terms of service
              </Text>
            </TouchableOpacity>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
              } font-montserratMedium text-subTitle`}
            >
              and{" "}
            </Text>
          </View>
          <View className={`items-center flex-row justify-center space-x-1`}>
            <TouchableOpacity>
              <Text
                className={`${
                  Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                } font-montserratMedium text-primaryColor`}
              >
                privacy policy
              </Text>
            </TouchableOpacity>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
              } font-montserratMedium text-subTitle`}
            >
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
    </KeyboardAvoidingContainer>
  );
};

export default OneMoreStep;

const styles = StyleSheet.create({});
