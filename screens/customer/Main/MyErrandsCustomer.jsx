import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import BackIcon from "../../../assets/icons/back-icon-black.png";

const { width, height } = Dimensions.get("window");

const MyErrandsCustomer = ({ navigation }) => {
  const [errandState, setErrandState] = useState("Progress");
  return (
    <SafeAreaComponent>
      <View
        className={`flex-row items-center justify-between px-[16px] space-x-2`}
        style={{ marginBottom: height * 0.032 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`flex-1`}
        >
          <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
        <Text className={`text-[24px] font-montserratBold w-full text-center`}>
          My errands
        </Text>
      </View>

      <View className={`px-[16px]`} style={{ marginBottom: height * 0.032 }}>
        <View
          className={`bg-[#D5D7DA] flex flex-row py-[7px] rounded-full px-[7px] items-center`}
        >
          <TouchableOpacity
            className={`flex-1 py-[10px] ${
              errandState === "Progress"
                ? `bg-[#F7F7F7] rounded-[8px]`
                : `bg-transparent`
            }`}
            onPress={() => setErrandState("Progress")}
          >
            <Text
              className={`text-center text-[14px] font-montserratMedium text-black`}
            >
              In progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-[10px] ${
              errandState === "Complete"
                ? `bg-[#F7F7F7] rounded-[8px]`
                : `bg-transparent`
            }`}
            onPress={() => setErrandState("Complete")}
          >
            <Text
              className={`text-center text-[14px] font-montserratMedium text-black`}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaComponent>
  );
};

export default MyErrandsCustomer;

const styles = StyleSheet.create({});
