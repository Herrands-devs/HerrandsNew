import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyComponent = ({ message }) => {
  return (
    <View>
      <View className={`flex-row justify-center mt-[38px]`}>
        <Image
          source={require("../../../assets/gifs/question.gif")}
          className={`w-[244px] h-[244px]`}
        />
      </View>
      <Text className={`mt-[32px] text-[24px] font-montserratBold text-center`}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({});
