import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'
import isEmpty from "../isEmpty";
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
  labelStyle,
  error,
  maxLength,
  mainType,
  bgColor,
  onFocus,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
// The empty dependency array ensures this effect runs only once on mount
  return (
    <View className={`w-[100%] ${classes}`}>
      {/* if Icon */}
      <View className="flex flex-row items-center gap-2">
        {iconName && (
          <TouchableOpacity>
            <Ionicons name={iconName} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        <Text
          className={`text-[#6B7C97] ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px]'} py-2 font-montserratSemiBold`}
          style={labelStyle}
        >
          {label}
        </Text>
      </View>
      <View className={`${style}  ${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'}  rounded-[4px]`}>
        <TextInput
          keyboardType={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          maxLength={maxLength}
          placeholder={placeHolder}
          placeholderTextColor="#6B7C97"
          className={`w-full h-full ${bgColor && 'bg-[#F7F7F7]'} bg-[#F7F7F7] text-[#1b1d20] font-montserratMedium flex justify-center ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px] '} px-2`}
          style={[
            isFocused && {
              borderWidth: 1.5,
              borderRadius: 4,
              borderColor: "#0066F5",
              backgroundColor : bgColor ? 'white' : ''
            },
            !isFocused && {
              borderRadius: 4,
              borderColor: "#E9E9E9",
            },
            disabled && { backgroundColor: "#C6C6C6", color: "white" },
            error && {
              shadowOffset: {
                width: 0,
                height: 0,
              },
              borderWidth: 1.5,
              backgroundColor: "white",
              shadowOpacity: 0.2, // Use 0.12 for 12% opacity
              shadowRadius: 10,
              elevation: 10, // This is for Android to achieve a similar effect
              borderColor: error && "#F44336",
              shadowColor: error && "#FF5309",
            }
          ]}
          editable={!disabled}
          onChangeText={onChangeText}
        />
        
      </View>
    </View>
  );
};

export const RoundedInput = ({
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
  labelStyle,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className={`w-[100%] ${classes}`}>
      {/* if Icon */}
      <View className={`${style}  ${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'} rounded-full`}>
        <TextInput
          keyboardType={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-full h-full flex justify-center text-[14px] px-2 font-montserratMedium"
          style={[
            isFocused && {
              borderWidth: 1.5,
              borderRadius: 100,
              borderColor: "#0066F5",
            },
            !isFocused && {
              borderRadius: 100,
              borderColor: "#E9E9E9",
            },
          ]}
          editable={!disabled}
          onChangeText={onChangeText}
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
        <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratMedium">
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
          className="w-full h-full flex justify-center  text-[14px] px-2 font-montserratMedium "
          style={[
            isFocused && {
              borderWidth: 1.5,
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
          onChangeText={onChangeText}
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
  bgColor,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  return (
    <View className="w-[100%]">
      {/* if Icon */}
      <View className="flex flex-row items-center gap-2">
        <Text className={`text-[#6B7C97] ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px]'} py-2 font-montserratSemiBold`}>
          {label}
        </Text>
      </View>
      <View
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${style}  ${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'} ${bgColor && 'bg-[#F7F7F7]'} bg-[#F7F7F7] rounded-[4px] flex flex-row items-center px-2 ${
          isFocused && "shadow-md"
        }`}
        style={[
          isFocused && {
            borderWidth: 1.5,
            borderRadius: 4,
            borderColor: "#0066F5",
            backgroundColor : bgColor ? 'white' : ''
          },
          !isFocused && {
            borderColor: "#E9E9E9",
          },
        ]}
      >
        <TouchableOpacity className="w-[6%] h-[20px] mx-2">
          <Image
            source={require("../../../assets/flag.png")}
            className="w-full h-full"
          />
        </TouchableOpacity>

        <View className="w-[10%] h-full flex justify-center items-center">
          <Text className="text-[#6B7C97] font-medium text-[12px] font-montserratMedium">
            +234
          </Text>
        </View>
        <TextInput
          keyboardType={type}
          value={value}
          maxLength={10}
          placeholder={placeHolder}
          placeholderTextColor="#6B7C97"
          className={`w-[70%] h-full flex text-[#6B7C97] justify-center ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px] '}
          px-2 font-montserratMedium`}
          onChangeText={onChangeText}
          {...rest}
          editable={disabled}
        />
      </View>
    </View>
  );
};

export const OtpInputs = ({ otpValues, onOtpChange, onOtpComplete , error }) => {
  const [isFocused, setFocused] = useState(false);
  const inputRefs = useRef(new Array(4).fill(null));
  const [focusedIndex, setFocusedIndex] = useState(0);
  console.log(error)

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

  useEffect(() => {
    if (error) {
      setFocusedIndex(0);
      inputRefs.current[0].focus();
    }
  },[error])



  return (
    <View className="w-[100%]">
      <View className="flex flex-row justify-between">
        {otpValues.map((digit, i) => (
          <TextInput
            key={i}
            className="w-[66px] h-[54px] rounded-[5px] flex justify-center 
          items-center  text-center text-xl font-bold bg-[#D5D7DA]"
            style={[
              i === focusedIndex && {
                borderWidth: 2,
                borderColor: error ? "#F44336" : "#0066F5",
                backgroundColor: "white",
              },
              error && {
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                borderWidth: 2,
                backgroundColor: "white",
                shadowOpacity: 0.2, // Use 0.12 for 12% opacity
                shadowRadius: 10,
                elevation: 10, // This is for Android to achieve a similar effect
                borderColor: error && "#F44336",
                shadowColor: error && "#FF5309",
              }
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

export const UploadInp = ({
  type,
  placeHolder,
  value,
  onChangeText,
  style,
  iconName,
  iconSize,
  iconColor,
  disabled,
  onPress,
  selectFile, 
  setSelectedFile,
  bgColor,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  const [fileName , setFileName] = useState("")
  const handleDocumentSelection = useCallback( async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        base64 : true,
        copyToCacheDirectory : false,
        type : "image/*"
      });
      // console.log(response)
      const url= response.assets[0]["uri"];
      const type= response.assets[0]["mimeType"];
      setFileName(response.assets[0]["name"])
      setSelectedFile(response.assets[0]["uri"]);
     
    } catch (err) {
      console.warn(err);
    }
  }, []);
  return (
    <View className="w-[100%] mb-3">
      {/* if Icon */}
      <TouchableOpacity
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${style}  ${Platform.OS == 'ios' ? 'h-[50px]' : 'h-[45px]'} ${bgColor && 'bg-[#F7F7F7]'}  rounded-[4px] flex flex-row items-center px-2 ${
          isFocused && "shadow-md"
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
        onPress={handleDocumentSelection}
      >
        <View className="w-[30%] h-full flex justify-center items-center">
          <View className="bg-[#0066F5] h-[35px] flex justify-center rounded-md items-center p-2">
            <Text className="font-montserratMedium text-[#ffffff] text-[12px]">Choose files</Text>
          </View>
        </View>
        <TextInput
          keyboardType={type}
          value={value}
          placeholder={fileName.replaceAll(fileName.slice(10,50) , '.....') && placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-[70%] h-full flex justify-center text-[14px] 
          px-2 font-montserratMedium"
          editable={!disabled}
        />
      </TouchableOpacity>
    </View>
  );
};

export const CheckBox = ({ label , idType , setIdType ,value  }) => {
  const [check, setCheck] = useState(false);
  const handleClick = () => {
    if(value == idType) {
      setCheck(false)
      setCheck(null)
    } 
    else {
      setIdType(value)
      setCheck(true)
    } 
  }
  return (
    <View className="flex flex-row gap-2 mb-6 items-center">
      <TouchableOpacity
        className={`w-[25px] h-[25px] flex justify-center ${
          check && idType == value ? "bg-[#0066F5]" : "bg-[#e0e0e0]"
        } items-center`}
        onPress={handleClick}
      >
        <Ionicons name="checkmark-sharp" size={15} color="white" />
      </TouchableOpacity>
      <Text className={`text-[#6B7C97] font-montserratMedium  ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px] '}`}>{label}</Text>
    </View>
  );
};
