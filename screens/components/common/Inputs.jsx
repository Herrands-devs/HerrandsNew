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
  isError,
  maxLength,
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
        <Text
          className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
          style={labelStyle}
        >
          {label}
        </Text>
      </View>
      <View className={`${style} h-[45px] rounded-[4px]`}>
        <TextInput
          keyboardType={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          maxLength={maxLength}
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
            isError && {
              borderWidth: 2,
              borderRadius: 4,
              borderColor: "red",
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
      <View className={`${style} h-[40px] rounded-full`}>
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
        className={`${style} h-[45px]  border  rounded-[4px] flex flex-row items-center px-2 ${
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
          <Image
            source={require("../../../assets/flag.png")}
            className="w-full h-full"
          />
        </TouchableOpacity>

        <View className="w-[10%] h-full flex justify-center items-center">
          <Text className="text-[#082552] font-medium text-[12px] font-montserratRegular">
            +234
          </Text>
        </View>
        <TextInput
          keyboardType={type}
          value={value}
          maxLength={10}
          placeholder={placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-[70%] h-full flex justify-center text-[14px] 
          px-2 font-montserratRegular"
          onChangeText={onChangeText}
          {...rest}
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
    <View className="w-[100%]">
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
      const filePath = Platform.OS === 'android' ? url : url.replace("file://" , "");
      const base64 = await FileSystem.readAsStringAsync(filePath, {encoding : FileSystem?.EncodingType?.Base64})
      setSelectedFile("data:"+type+";base64,"+base64);
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
        className={`${style} h-[45px] border rounded-[4px] flex flex-row items-center ${
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
        onPress={handleDocumentSelection}
      >
        <View className="w-[30%] h-full flex justify-center items-center">
          <View className="bg-[#F1F1F1] h-[35px] flex justify-center items-center p-2 font-medium text-[12px] font-montserratRegular">
            <Text>Choose files</Text>
          </View>
        </View>
        <TextInput
          keyboardType={type}
          value={value}
          placeholder={fileName || placeHolder}
          placeholderTextColor="#C6C6C6"
          className="w-[70%] h-full flex justify-center text-[14px] 
          px-2 font-montserratRegular"
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
        className={`w-[20px] h-[20px] flex justify-center ${
          check && idType == value ? "bg-[#0066F5] border-[#0066F5]" : "border-[#D5D7DA]"
        } items-center border-2`}
        onPress={handleClick}
      >
        <Ionicons name="checkmark-sharp" size={15} color="white" />
      </TouchableOpacity>
      <Text className="text-[#6B7C97] text-[16px]">{label}</Text>
    </View>
  );
};
