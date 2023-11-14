import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingData = () => {
  return (
    <View
      className={`absolute z-10 top-0 left-0 bg-[#00000012] h-screen w-full justify-center items-center`}
    >
      <ActivityIndicator />
    </View>
  );
};

export default LoadingData;

const styles = StyleSheet.create({});