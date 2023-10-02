import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyComponent = ({ message }) => {
  return (
    <View>
      <View className={`flex-row justify-center`}>
        <Image source={require("../../../assets/gifs/question.gif")} />
      </View>
      <Text className={`mt-[32px] text-[24px] font-montserratBold`}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({});
