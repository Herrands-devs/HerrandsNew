import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../themes/colors";

const PaymentInput = ({
  label,
  iconName,
  helperText,
  helperPosition,
  style,
  ...inputProps
}) => {
  const [isFocusd, setIsFocused] = useState(false);

  return (
    <View className={``} style={style}>
      <View>
        <View className={`flex-row items-center justify-between`}>
          <Text
            className={`text-[14px] ${
              isFocusd ? `text-primaryColor` : `text-subTitle`
            } font-montserratRegular`}
          >
            {label}
          </Text>
          <AntDesign
            name={iconName}
            size={20}
            color={isFocusd ? colors.primaryColor : "black"}
          />
        </View>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`border-b ${
            isFocusd ? `border-b-primaryColor` : `border-b-black`
          } py-[5px] font-montserratRegular`}
          keyboardType="numeric"
          {...inputProps}
        />
        <View
          className={`${
            helperPosition === "start" ? `items-start` : `items-end`
          } mt-[4px]`}
        >
          <Text className={`text-[14px] text-subTitle font-montserratRegular`}>
            {helperText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentInput;

const styles = StyleSheet.create({});
