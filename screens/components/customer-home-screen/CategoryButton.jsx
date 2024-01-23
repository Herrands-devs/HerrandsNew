import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import React from "react";

const CategoryButton = ({ icon, title, onPress, style }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center bg-primaryColor p-2 py-3 gap-x-1 justify-center  rounded-[4px]`}
      style={style}
      onPress={onPress}
    >
      <Image source={icon} className={`w-[24px] h-[20px]`} />
      <Text className={`${Platform.OS == 'ios' ? 'text-[14px]' : 'text-[12px]'} font-montserratSemiBold text-white`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({});
