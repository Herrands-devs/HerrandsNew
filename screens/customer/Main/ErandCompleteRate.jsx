import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { TouchableOpacity } from "react-native";
import Hamburger from "../../../assets/icons/black-hamburger.png";
import { useState } from "react";
import Sidebar from "../../components/customer-home-screen/Sidebar";
import Collins from "../../../assets/collins.png";
import { Dimensions } from "react-native";
import ErrandProgressComp from "../../components/common/ErrandProgressComp";
import { TextInput } from "react-native";
import { RoundedButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import Right from "../../../assets/icons/right.png";

const { width, height } = Dimensions.get("window");

const ErandCompleteRate = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SafeAreaComponent classes={`px-[20px]`}>
      <View className={`flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Image source={Hamburger} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>

        <View>
          <View className={`items-center`}>
            <Image source={Collins} className={`w-[24px] h-[24px]`} />
          </View>
          <Text className={`text-[8px] font-montserratSemiBold mt-[4px]`}>
            Collins
          </Text>
        </View>
      </View>

      <View style={{ marginTop: height * 0.052 }}>
        <ErrandProgressComp />
      </View>

      <View style={{ marginTop: height * 0.085 }}>
        <Text className={`text-[14px] font-montserratSemiBold text-center`}>
          How would you rate your experience?
        </Text>
        <Text className={`my-[24px] text-center`}>
          Rating bar design goes here
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          className={`w-[100%] h-[112px] rounded-[16px] p-[16px] text-[16px] font-montserratMedium shadow-md bg-[#D5D7DA]`}
          placeholder="Add a comment about the quality of service you received (optional):"
        />
        <View className={`mt-[8px]`}>
          <RoundedButton
            text={"Submit"}
            styles={{ backgroundColor: colors.primaryColor }}
            onPress={() => navigation.navigate("ThankYouScreen")}
          />
        </View>

        <TouchableOpacity
          className={`flex-row items-center justify-center`}
          style={{ marginTop: height * 0.032 }}
        >
          <Text>I will do this later</Text>
          <Image source={Right} className={`w-[16px] h-[16px]`} />
        </TouchableOpacity>
      </View>
      <Sidebar
        isOpen={isOpen}
        onClose={handleCloseSidebar}
        navigation={navigation}
      />
    </SafeAreaComponent>
  );
};

export default ErandCompleteRate;

const styles = StyleSheet.create({});
