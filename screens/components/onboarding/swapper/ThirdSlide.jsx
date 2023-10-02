import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const ThirdSlide = () => {
  const thirdImage = require("../../../../assets/third-bg.png");
  return (
    <ImageBackground source={thirdImage}>
      <View
        className={`flex-col justify-end h-[100%] items-center space-y-3 bg-[#000000a9]`}
      >
        <View className={`flex-col items-center bottom-[180px]`}>
          <Text className={`text-white text-[16px] font-montserratBold`}>
            Don’t carry it all alone
          </Text>
          <Text
            className={`text-white text-[12px] font-montserratRegular max-w-[216px] text-center mt-[8px]`}
          >
            The more, the merrier! Connect with thousands of people who are
            eager to share their time with you and help you get things done
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ThirdSlide;

const styles = StyleSheet.create({});
