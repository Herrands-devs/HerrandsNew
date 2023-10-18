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

const { width, height } = Dimensions.get("window");

const ThankYou = ({ navigation }) => {
  return (
    <SafeAreaComponent classes={`px-[16px]`}>
      <TouchableOpacity onPress={() => navigation.navigate("CustomerHome")}>
        <Image source={ThankYouClose} className={`w-[24px] h-[24px]`} />
      </TouchableOpacity>
      <View style={{ marginTop: height * 0.17 }}>
        <View className={`items-center`}>
          <Image source={ThankYouImage} className={`w-[150px] h-[150px]`} />
        </View>
        <View className={`mt-[32px] items-center`}>
          <Text
            className={`text-[28px] uppercase font-montserratBold text-primaryColor`}
          >
            Thank You
          </Text>
          <Text className={`text-[12px] font-montserratMedium mt-[8px]`}>
            Your feedback helps us perform better!
          </Text>
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default ThankYou;

const styles = StyleSheet.create({});
