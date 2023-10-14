import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryButton = ({ icon, title, onPress, style }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center bg-primaryColor p-[10px] space-x-[10px] rounded-[4px]`}
      style={style}
      onPress={onPress}
    >
      <Image source={icon} className={`w-[24px] h-[24px]`} />
      <Text className={`text-[14px] font-montserratSemiBold text-white`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({});
