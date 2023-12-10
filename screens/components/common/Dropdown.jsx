import { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalContext } from "../../../context/context.store";
import { Feather } from "@expo/vector-icons";

export const DropDownPicker = ({
  style,
  type,
  placeHolder,
  disabled,
  label,
  defaultOption,
  options,
  labelStyles,
  selectState,
  setSelectedState,
}) => {
  const viewRef = useRef();
  useEffect(() => {
    setIsActive(false);
  }, [viewRef]);
  const [isFocused, setFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(selectState);
  const [filter, setFilter] = useState("");
  return (
    <View className="relative w-[100%] mb-6" ref={viewRef}>
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
        className={`${style} border h-[45px]  -z-1 rounded-[4px] flex flex-row items-center px-2`}
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
            <Text className="text-[#6B7C97] font-montserratRegular">
              {value ? value : defaultOption}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            onBlur={() => setIsActive(false)}
            type={type}
            value={value}
            placeholder={placeHolder}
            placeholderTextColor="#C6C6C6"
            className="w-full h-full flex justify-center text-[14px] px-2"
            style={[disabled && { backgroundColor: "#C6C6C6", color: "white" }]}
            editable={!disabled}
            onChangeText={(text) => {
              if (text === "") {
                setSelectedState("");
                setValue("");
                setFilter("");
              } else {
                setValue(text);
                setFilter(text);
              }
            }}
          />
        )}
      </View>
      {isActive && (
        <View className="absolute top-[100%] w-full">
          <ScrollView className="w-full h-[150px] z-[100]  border border-[#c4c4c463] rounded-b-sm px-1 py-3 bg-white">
            {options
              .filter((opt) => opt.title.includes(filter))
              .map((option) => (
                <TouchableOpacity
                  onPress={() => {
                    setValue(option.title);
                    setIsActive(false);
                    setSelectedState(option.id ? option.id : option.title);
                  }}
                  className={`mb-[10px] text-[#6B7C97]`}
                >
                  <Text className="p-2 text-[#6B7C97]">{option.title}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const DropDownPickerMultiple = ({
  style,
  type,
  placeHolder,
  disabled,
  label,
  defaultOption,
  options,
  labelStyles,
  selectState,
  setSelectedState,
}) => {
  const viewRef = useRef();
  useEffect(() => {
    setIsActive(false);
  }, [viewRef]);
  const [isFocused, setFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const { setSelectedcategory, setCategoryId, selectedCategory } =
    useContext(GlobalContext);

  const handleSelect = (value, text) => {
    if (selectState.includes(value)) {
      const newSelected = [];
      for (let i = 0; i < selectState.length; i++) {
        if (selectState[i] != value) {
          newSelected.push(selectState[i]);
        }
      }
      setSelectedState(newSelected);
    } else {
      setSelectedState((prev) => [...prev, value]);
      setValue(text);
    }
  };
  console.log(selectState);
  return (
    <View className="relative w-[100%] mb-6" ref={viewRef}>
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
        className={`${style} border h-[45px]  -z-1 rounded-[4px] flex flex-row items-center px-2`}
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
            <Text className="text-[#6B7C97] font-montserratRegular">
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
            placeholderTextColor="#C6C6C6"
            className="w-full h-full flex justify-center text-[14px] px-2"
            style={[disabled && { backgroundColor: "#C6C6C6", color: "white" }]}
            editable={!disabled}
            onChangeText={(text) => {
              if (text === "") {
                setSelectedcategory("");
                setValue("");
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
                  handleSelect(option.id, option.title);
                }}
                className={`mb-[10px] flex flex-row items-center text-[#6B7C97]`}
              >
                <Text className="p-2 text-[#6B7C97]">{option.title}</Text>
                <View>
                  {selectState.includes(option.id) && (
                    <Feather name="check" size={14} color="green" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
