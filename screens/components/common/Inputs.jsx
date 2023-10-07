import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export const PrimaryInput = ({
  type,
  placeHolder,
  value,
  onChangeText,
  style,
  label,
  iconName,
  iconSize,
  iconColor,
  disabled,
  classes,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className={`w-[100%] ${classes}`}>
      {/* if Icon */}
      <View className="flex flex-row items-center gap-2">
        {iconName && (
          <TouchableOpacity>
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
          {label}
        </Text>
      </View>
      <View className={`${style} h-[45px] bg-[#F7F7F7] rounded-[4px]`}>
        <TextInput
          keyboardType={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-full h-full flex justify-center border text-[14px] px-2 font-montserratRegular"
          style={[
            isFocused && {
              borderWidth: 2,
              borderRadius: 4,
              borderColor: "#0066F5",
            },
            !isFocused && {
              borderRadius: 4,
              borderColor: "#E9E9E9",
            },
            disabled && { backgroundColor: "#C6C6C6", color: "white" },
          ]}
          editable={!disabled}
        />
      </View>
    </View>
  );
};



export const DoubleInput = ({
  type,
  placeHolder,
  value,
  onChangeText,
  style,
  label,
  iconName,
  iconSize,
  iconColor,
  disabled,
  classes,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className={`w-[100%] ${classes}`}>
      {/* if Icon */}
      <View className="flex flex-row items-center gap-2">
        {iconName && (
          <TouchableOpacity>
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
          {label}
        </Text>
      </View>
      <View className={`${style} h-[45px] bg-[#F7F7F7] rounded-[4px]`}>
        <TextInput
          keyboardType={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-full h-full flex justify-center border text-[14px] px-2 font-montserratRegular"
          style={[
            isFocused && {
              borderWidth: 2,
              borderRadius: 4,
              borderColor: "#0066F5",
            },
            !isFocused && {
              borderRadius: 4,
              borderColor: "#E9E9E9",
            },
            disabled && { backgroundColor: "#C6C6C6", color: "white" },
          ]}
          editable={!disabled}
        />
      </View>
    </View>
  );
};

export const PhoneNumberInput = ({
  type,
  placeHolder,
  value,
  onChangeText,
  style,
  label,
  iconName,
  iconSize,
  iconColor,
  disabled,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className="w-[100%] mb-3">
      {/* if Icon */}
      <View className="flex flex-row items-center gap-2">
        <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
          {label}
        </Text>
      </View>
      <View
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${style} h-[45px] bg-[#F7F7F7] border  rounded-[4px] flex flex-row items-center px-2 ${
          isFocused && "shadow-sm"
        }`}
        style={[
          isFocused && {
            borderWidth: 2,
            borderRadius: 4,
            borderColor: "#0066F5",
          },
          !isFocused && {
            borderColor: "#E9E9E9",
          },
        ]}
      >
        <TouchableOpacity className="w-[6%] h-[20px] mx-2">
          <Image source={require("../../../assets/flag.png")} className="w-full h-full"/>
        </TouchableOpacity>

        <View className="w-[10%] h-full flex justify-center items-center">
          <Text className="text-[#082552] font-medium text-[12px] font-montserratRegular">
            +234
          </Text>
        </View>
        <TextInput
          keyboardType={type}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-[70%] h-full flex justify-center text-[14px] 
          px-2 font-montserratRegular bg-[#F7F7F7]"
        />
      </View>
    </View>
  );
};

export const OtpInputs = ({ otpValues, onOtpChange, onOtpComplete }) => {
  const [isFocused, setFocused] = useState(false);
  const inputRefs = useRef(new Array(4).fill(null));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleInputChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = text;
      onOtpChange(newOtpValues);

      if (text !== "" && index < otpValues.length - 1) {
        inputRefs.current[index + 1].focus();
        setFocusedIndex(index + 1);
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    if (otpValues.every((value) => value !== "")) {
      onOtpComplete();
    }
  }, [otpValues]);

  return (
    <View className="w-[80%]">
      <View className="flex flex-row justify-between">
        {otpValues.map((digit, i) => (
          <TextInput
            key={i}
            className="w-[76px] h-[64px] rounded-[5px] flex justify-center 
          items-center  text-center text-xl font-bold bg-[#D5D7DA]"
            style={[
              i === focusedIndex && {
                borderWidth: 2,
                borderColor: "#0066F5",
                backgroundColor: "white",
              },
            ]}
            onFocus={() => setFocusedIndex(i)}
            keyboardType="phone-pad"
            value={digit}
            onChangeText={(text) => handleInputChange(text, i)}
            maxLength={1}
            ref={(ref) => (inputRefs.current[i] = ref)}
          />
        ))}
      </View>
    </View>
  );
};



export const CheckBox = ({
  label,
  onPress
}) => {
  return (
    <View className="flex flex-row gap-2 mb-3 items-center">
      <TouchableOpacity className="w-[20px] h-[20px] border-2 border-[#D5D7DA]" onPress={onPress}>
      </TouchableOpacity>
      <Text className="text-[#6B7C97] text-[16px]">
        {label}
      </Text>
    </View>
  )
}
