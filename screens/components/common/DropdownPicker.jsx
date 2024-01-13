import { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalContext } from "../../../context/context.store";

export const DropDownPicker = ({
  style,
  type,
  placeHolder,
  disabled,
  label,
  defaultOption,
  options,
  labelStyles,
  bgColor
}) => {
  const viewRef = useRef();
  useEffect(() => {
    setIsActive(false);
  }, [viewRef]);
  const [isFocused, setFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const { setSelectedcategory, setSubTypeId, selectedCategory } =
    useContext(GlobalContext);

  return (
    <View className={`relative w-[100%] mb-6`}  ref={viewRef}>
      <View className="flex z-0 flex-row items-center gap-2">
        <Text
          className="text-[#6B7C97] text-[14px] font-montserratRegular py-2"
          style={labelStyles}
        >
          {label}
        </Text>
      </View>
      <View
        onPress={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${style} border h-[45px] bg-[${bgColor}]  -z-1 rounded-[4px] flex flex-row items-center px-2`}
        style={[
          isFocused && {
            borderWidth: 2,
            borderRadius: "4px",
            borderColor: "#0066F5",
          },
          !isFocused && {
            borderRadius: 4,
            borderColor: "#E9E9E9",
          },
        ]}
      >
        {!isActive ? (
          <TouchableOpacity
            onPress={() => setIsActive(!isActive)}
            className="w-full h-full flex justify-center cursor-pointer"
          >
            <Text className="text-[#6B7C97] font-montserratSemiBold">
              {value
                ? value
                : selectedCategory
                ? selectedCategory
                : defaultOption}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            onBlur={() => setIsActive(false)}
            type={type}
            value={value}
            placeholder={placeHolder}
            placeholderTextColor="#6B7C97"
            className="w-full h-full flex justify-center font-montserratSemiBold text-[14px] px-2"
            style={[disabled && { backgroundColor: "#C6C6C6", color: "white" }]}
            editable={!disabled}
            onChangeText={(text) => {
              if (text === "") {
                setSelectedcategory("");
              } else {
                setValue(text);
              }
            }}
          />
        )}
      </View>
      {isActive && (
        <View className="absolute top-[100%] w-full">
          <ScrollView className="w-full h-[150px] z-[100]  border border-[#c4c4c463] rounded-b-sm px-1 py-3 bg-white">
            {options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setValue(option.name);
                  setIsActive(false);
                  setSelectedcategory(option.category);
                  setSubTypeId(option.id);
                }}
                className={`mb-[10px]`}
              >
                <Text className="p-2 text-[#6B7C97]">{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
