import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BackIcon from "../../../../assets/icons/back-icon.png";

const SecondSlide = ({ handlePrevious }) => {
  const secondImage = require("../../../../assets/second-bg.png");
  return (
    <ImageBackground source={secondImage}>
      <View
        className={`flex-col justify-end h-[100%] items-center space-y-3 bg-[#000000a9]`}
      >
        <View className={`flex-col items-center bottom-[180px]`}>
          <Text className={`text-white text-[16px] font-montserratBold`}>
            Take charge of your day
          </Text>
          <Text
            className={`text-white text-[12px] font-montserratRegular 
            max-w-[216px] text-center mt-[8px]`}
          >
            Conquer your time barrier and run all of your errands - easy, quick
            and safe
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SecondSlide;

const styles = StyleSheet.create({});
