import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoundedInput } from "../../components/common/Inputs";
import { Image } from "react-native";
import axios from "axios";
import { API_URl } from "../../../config";
import { GlobalContext } from "../../../context/context.store";
import Loading from "../../components/common/Loading";

const ChatsScreen = ({ navigation }) => {
  const [message, setMessage] = useState([]);
  const { isToken, setChat } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_URl}/api/conversations/e6d1250a-f4a6-4ee7-a4df-70290aaf6eb0/`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${isToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data[0]);
        setMessage(response.data[0]);
        setChat(response.data[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [API_URl]);
  return (
    <SafeAreaView className="bg-white">
      <Text className="text-[24px] p-6 text-[#000E23] font-semibold font-MontserratMedium">
        Chats
      </Text>
      <View className="mt-2 px-6 bg-white pb-4 z-50">
        <RoundedInput placeHolder={"Search for chat"} />
      </View>
      <ScrollView className="px-6 flex gap-y-5 h-screen">
        {isLoading ? (
          <View className="h-[100px] flex justify-center items-center w-full">
            <ActivityIndicator />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat", { chat: message });
            }}
            className="relative flex gap-5  flex-row"
          >
            <View className="relative w-[48px] h-[48px]">
              <Image
                source={require("../../../assets/herrand-profile.png")}
                className="rounded-full object-cover w-full h-full"
              />
              <View
                className="bg-[#1FF30C] border-2 border-white w-[14px] h-[14px] rounded-full"
                style={styles.badge}
              ></View>
            </View>
            <View className="flex justify-between">
              <Text className="font-montserratSemiBold">Ritilayo Ronko</Text>
              <Text className="text-sm font-montserratRegular text-[#AEAEAE]">
                Please i need help buying...
              </Text>
            </View>
            <View className="flex justify-between items-end absolute right-0">
              <Text className="font-montserratRegular text-[#AEAEAE]">
                Just Now
              </Text>
              <View className="h-[18px] w-[18px] flex justify-center mt-3 items-center bg-red rounded-full">
                <Text className="text-xs text-white">4</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ChatsScreen;
