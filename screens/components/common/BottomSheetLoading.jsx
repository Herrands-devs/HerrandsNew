import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Modal, Easing } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../themes/colors";
import { AntDesign } from '@expo/vector-icons'; // You can replace this with your preferred icon library
import { GlobalContext } from "../../../context/context.store";


const BottomSheetLoading = () => {
  const {isAcceptingErrand, setIsAccepting} = useContext(GlobalContext)
  const spinValue = new Animated.Value(0);
  // Set up rotation animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal visible={isAcceptingErrand} className="">
      <View className="flex justify-center items-center h-screen w-full">
        <View style={styles.container}>
          <Animated.View className="w-[50px] h-[50px]  border-[12px] border-t-[12px] border-[#4e84d03e] border-r-[12px] border-r-[#b2ccf03e] border-t-[#07449964] border-b-[12px] border-b-[#065fdbc0] rounded-full" style={{ transform: [{ rotate: spin }] }}>

          </Animated.View>
          <Text style={styles.text}>Accepting Errand...Please wait</Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    color: '#065fdbc0',
  },
});

export default BottomSheetLoading;
