import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { iconsPack } from "../../components/icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "@rneui/themed";
const { width } = Dimensions.get("window");

const Profilescreen = ({ navigation }) => {
  const {
    angleLeft,
    webIcon,
    switchIcon,
    logoutIcon,
    supportIcon,
    angleRight,
  } = iconsPack();
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-6 font-montserratRegular flex flex-row items-center gap-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
        <Text className="text-[24px] text-[#000E23] font-semibold font-MontserratMedium">
          Profile
        </Text>
      </View>

      <View style={styles.container}>
        <View className="relative w-[118px] h-[118px]">
          <Image
            source={require("../../../assets/herrand-profile.png")}
            className="rounded-full object-cover w-full h-full"
          />
          <View
            className="bg-[#1FF30C] border-4 border-white w-[20px] h-[20px] rounded-full"
            style={styles.badge}
          >
            <View />
          </View>
        </View>
        <View>
          <Text className="text-center text-[#000E23] font-semibold text-[16px]">
            Kunle Afolayan
          </Text>
        </View>
        <View className="flex flex-row justify-center w-full text-center">
          <View className="w-[50%] flex flex-row justify-end pr-2">
            <Text className="text-end text-[#000E23] font-medium">
              12 Errands
            </Text>
          </View>
          <View className="flex flex-row w-[50%] pl-2 border-l border-[#000E23 justify-start">
            <Text className="mr-2 text-[#000E23] font-medium">
              Ranting : 4.5
            </Text>
            <Image
              source={require("../../../assets/icons/rate-icon.png")}
              className="w-[15px] h-[15px]"
            />
          </View>
        </View>

        <View>
          <TouchableOpacity className="flex flex-row gap-2 items-center">
            <Text
              className={`text-primaryColor font-montserratRegular text-[16px] font-bold`}
            >
              Edit profile
            </Text>
            <FontAwesome5 name="pencil-alt" size={13} color="#0066F5" />
          </TouchableOpacity>
        </View>

        <View className="border-t w-[90%] flex flex-col  py-4 border-[#F9F9F9]">
          <View className="flex flex-row justify-between pb-12 items-center w-full">
            <View className="flex flex-row gap-8 items-center">
              <Image source={webIcon} />
              <Text className="text-[18px] font-montserratRegular">
                Language
              </Text>
            </View>
            <Text className="text-[16px] text-[#C6C6C6]">ENG</Text>
          </View>
          <View className="flex flex-row justify-between pb-12 items-center w-full">
            <View className="flex flex-row gap-8 items-center">
              <Image source={switchIcon} />
              <Text className="text-[18px] font-montserratRegular">
                Out of office
              </Text>
            </View>
            <View style={styles.view}>
              <Switch
                value={checked}
                onValueChange={(value) => setChecked(value)}
              />
            </View>
          </View>

          <View className="flex flex-row justify-between pb-12 items-center w-full">
            <View className="flex flex-row gap-8 items-center">
              <Image source={webIcon} />
              <Text className="text-[18px] font-montserratRegular">
                Notifications
              </Text>
            </View>
            <View style={styles.view}>
              <Switch
                value={checked}
                onValueChange={(value) => setChecked(value)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Support")}
            className="flex flex-row justify-between pb-12 items-center w-full"
          >
            <View className="flex flex-row gap-8 items-center">
              <Image source={supportIcon} />
              <Text className="text-[18px] font-montserratRegular">
                Support
              </Text>
            </View>
            <Image source={angleRight} />
          </TouchableOpacity>

          <View className="flex flex-row justify-between pb-12 items-center w-full">
            <View className="flex flex-row gap-8 items-center">
              <Image source={logoutIcon} />
              <Text className="text-[18px] font-montserratRegular">
                Log out
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="flex flex-row justify-between pb-12 items-center w-full"
            onPress={() => navigation.navigate("CustomerDeleteAccount")}
          >
            <View className="flex flex-row gap-8 items-center">
              <MaterialCommunityIcons name="delete" size={24} color="#6B7C97" />
              <Text className="text-[18px] text-[#6B7C97] font-montserratRegular">
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  badge: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  view: {
    margin: 10,
  },
});

export default Profilescreen;
