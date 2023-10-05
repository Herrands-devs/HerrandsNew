import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View
      className={`absolute z-10 top-0 left-0 bg-[#000000da] h-full w-full justify-center items-center`}
    >
      <ActivityIndicator size={40} color={"#fff"} />
      <Text className={`text-[16px] font-montserratSemiBold text-white`}>
        Loading
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
