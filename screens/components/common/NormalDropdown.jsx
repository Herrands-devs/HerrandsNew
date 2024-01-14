import { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { GlobalContext } from "../../../context/context.store";
import CarIcon from "../../../assets/icons/car.png";
import BikeIcon from "../../../assets/icons/bike.png";
import VanIcon from "../../../assets/icons/van.png";
import SomeoneIcon from "../../../assets/icons/someone.png";

export const NormalDropdown = ({
  style,
  type,
  placeHolder,
  disabled,
  label,
  defaultOption,
  options,
  labelStyles,
  onChangeText,
  value,
  onSelect,
}) => {
  const viewRef = useRef();
  useEffect(() => {
    setIsActive(false);
  }, [viewRef]);
  const [isFocused, setFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { vehicleType, setVehicleType, setVehicleId } =
    useContext(GlobalContext);

  return (
    <View className="relative w-[100%]" ref={viewRef}>
      <View className="flex z-0 flex-row items-center gap-2">
        <Text
          className={`text-[#6B7C97] ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[14px]'} py-2 font-montserratSemiBold`}
          style={labelStyles}
        >
          {label}
        </Text>
      </View>
      <View
        onPress={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${style} border h-[45px] ${Platform.OS == 'ios' ? 'h-[45px]' : 'h-[38px]'}  -z-1 rounded-[4px] flex flex-row items-center px-2`}
        style={[
          isFocused && {
            borderWidth: 2,
            borderRadius: "4px",
            borderColor: "#0066F5",
            backgroundColor : 'White'
          },
          !isFocused && {
            borderRadius: 4,
            borderColor: "#E9E9E9",
            backgroundColor : '#F7F7F7'
          },
        ]}
      >
        {!isActive ? (
          <TouchableOpacity
            onPress={() => setIsActive(!isActive)}
            className="w-full h-full flex justify-center cursor-pointer"
          >
            {value === "van" ? (
              <View className={`flex-row items-center`}>
                <Image source={VanIcon} />
                <Text className="p-2 text-[#6B7C97]">
                  i need a van for this errand
                </Text>
              </View>
            ) : value === "car" ? (
              <View className={`flex-row items-center`}>
                <Image source={CarIcon} />
                <Text className="p-2 text-[#6B7C97]">
                  i need a car for this errand
                </Text>
              </View>
            ) : value === "bike" ? (
              <View className={`flex-row items-center`}>
                <Image source={BikeIcon} />
                <Text className="p-2 text-[#6B7C97]">
                  i need a bike for this errand
                </Text>
              </View>
            ) : value === "someone" ? (
              <View className={`flex-row items-center`}>
                <Image source={SomeoneIcon} />
                <Text className="p-2 text-[#6B7C97]">
                  i need someone for this errand
                </Text>
              </View>
            ) : vehicleType ? (
              <></>
            ) : (
              <Text className={`text-[#6B7C97] ${Platform.OS == 'ios' ? 'text-[15px]' : 'text-[13px]'} font-montserratMedium`}>
                {defaultOption}
              </Text>
            )}
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
            onChangeText={onChangeText}
          />
        )}
      </View>
      {isActive && (
        <View className="absolute top-[100%] w-full">
          <ScrollView className="w-full z-[100]  border border-[#c4c4c463] rounded-b-sm px-1 py-3 bg-white">
            {options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`mb-[10px]`}
                onPress={() => {
                  // setValue(option.name);
                  setIsActive(false);
                  setVehicleType(option.vehicle_type);
                  setVehicleId(option.id);
                }}
              >
                {option.vehicle_type === "car" && (
                  <View className={`flex-row items-center`}>
                    <Image source={CarIcon} />
                    <Text className="p-2 text-[#6B7C97]">
                      i need a car for this errand
                    </Text>
                  </View>
                )}
                {option.vehicle_type === "bike" && (
                  <View className={`flex-row items-center`}>
                    <Image source={BikeIcon} />
                    <Text className="p-2 text-[#6B7C97]">
                      i need a bike for this errand
                    </Text>
                  </View>
                )}
                {option.vehicle_type === "van" && (
                  <View className={`flex-row items-center`}>
                    <Image source={VanIcon} />
                    <Text className="p-2 text-[#6B7C97]">
                      i need a van for this errand
                    </Text>
                  </View>
                )}
                {option.vehicle_type === "someone" && (
                  <View className={`flex-row items-center`}>
                    <Image source={SomeoneIcon} />
                    <Text className="p-2 text-[#6B7C97]">
                      i need someone for this errand
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
