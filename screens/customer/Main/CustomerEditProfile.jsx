import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import Profile from "../../../assets/herrand-profile.png";
import EditIcon from "../../../assets/icons/edit-icon.png";
import { Dimensions } from "react-native";
import { PhoneNumberInput, PrimaryInput } from "../../components/common/Inputs";
import { colors } from "../../../themes/colors";
import WorldIcon from "../../../assets/icons/world-icon.png";
import DeleteIcon from "../../../assets/icons/delete-icon.png";
import { SquareButton } from "../../components/common/Button";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const CustomerEditProfile = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  return (
    <SafeAreaComponent>
      <View
        className={`flex-row items-center px-[16px] space-x-2`}
        style={{ marginBottom: height * 0.032 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
        <Text className={`text-[24px] font-montserratMedium`}>
          Edit Profile
        </Text>
      </View>

      <View
        className={`relative items-center`}
        style={{ marginBottom: height * 0.056 }}
      >
        <Image
          source={Profile}
          className={`rounded-full w-[120px] h-[120px]`}
        />
        <TouchableOpacity className={`absolute right-[33%] top-1`}>
          <Image source={EditIcon} className={`w-[40px] h-[40px]`} />
        </TouchableOpacity>
      </View>

      <View className={`px-[48px]`} style={{ marginBottom: height * 0.05 }}>
        <PrimaryInput
          label={"First name"}
          placeHolder={"John"}
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
        />
        <PrimaryInput
          label={"Last name"}
          placeHolder={"Doe"}
          value={lastname}
          onChangeText={(text) => setLastname(text)}
        />
        <PhoneNumberInput label={"Phone number"} placeHolder={"70984624"} />
        <PrimaryInput
          iconName={"mail"}
          label={"Email"}
          iconColor={colors.subTitle}
          placeHolder={"Enter your email"}
          type={"email-address"}
        />
      </View>

      <View className={`px-[48px]`} style={{ marginBottom: height * 0.0723 }}>
        <View className={`flex-row items-center justify-between mb-[16px]`}>
          <View className={`flex-row items-center space-x-5`}>
            <Image source={WorldIcon} className={`w-[16px] h-[16px]`} />
            <Text className={`text-[16px] font-montserratMedium text-subTitle`}>
              Language
            </Text>
          </View>

          <Text className={`text-[#C6C6C6] text-[14px] font-montserratMedium`}>
            ENG
          </Text>
        </View>
        <TouchableOpacity
          className={`flex-row items-center justify-between`}
          onPress={() => navigation.navigate("CustomerDeleteAccount")}
        >
          <View className={`flex-row items-center space-x-5`}>
            <Image source={DeleteIcon} className={`w-[16px] h-[16px]`} />
            <Text className={`text-[16px] font-montserratMedium text-subTitle`}>
              Delete my account
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className={`items-center px-[16px]`}>
        <SquareButton
          text={"Save"}
          styles={{ backgroundColor: colors.primaryColor }}
        />
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerEditProfile;

const styles = StyleSheet.create({});
