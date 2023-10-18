import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import ThankYouImage from "../../../assets/icons/thank-you.png";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import ThankYouClose from "../../../assets/icons/thank-you-close.png";
import Hamburger from "../../../assets/icons/black-hamburger.png";
import { useState } from "react";
import Sidebar from "../../components/customer-home-screen/Sidebar";
import { RoundedButton } from "../../components/common/Button";
import { color } from "@rneui/base";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const PaymentSuccess = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SafeAreaComponent classes={`px-[16px]`}>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Image source={Hamburger} className={`w-[24px] h-[24px]`} />
      </TouchableOpacity>
      <View style={{ marginTop: height * 0.17 }}>
        <View className={`items-center`}>
          <Image source={ThankYouImage} className={`w-[150px] h-[150px]`} />
        </View>
        <View className={`mt-[32px] items-center`}>
          <Text
            className={`text-[28px] uppercase font-montserratBold text-green`}
          >
            Payment Successful
          </Text>
        </View>
      </View>

      <View style={{ marginTop: height * 0.379 }}>
        <RoundedButton
          text={"Track my errand"}
          styles={{ backgroundColor: colors.primaryColor }}
          onPress={() => navigation.navigate("ErrandCompleteRate")}
        />
      </View>
      <Sidebar
        isOpen={isOpen}
        onClose={handleCloseSidebar}
        navigation={navigation}
      />
    </SafeAreaComponent>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({});
