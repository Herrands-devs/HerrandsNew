import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const FirstSlide = () => {
  const firstImage = require("../../../../assets/first-bg.png");
  return (
    <ImageBackground source={firstImage}>
      <View
        className={`flex-col justify-end h-[100%] items-center space-y-3 bg-[#000000a9]`}
      >
        <View className={`flex-col items-center bottom-[145px]`}>
          <Text className={`text-white text-[16px] font-montserratBold`}>
            Embrace the era of limitless hours
          </Text>
          <Text
            className={`text-white text-[12px] font-montserratRegular max-w-[216px] text-center mt-[8px]`}
          >
            Experience time freedom and enjoy limitless schedules, all from your
            time-sharing app
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FirstSlide;

const styles = StyleSheet.create({});
