import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import { Platform } from "react-native";
import axios from "axios";
import { API_URl } from "../../../../config";
import { GlobalContext } from "../../../../context/context.store";

const ChatBoard = ({ navigation, route }) => {
  const { userId } = useContext(GlobalContext);
  const { chat } = route.params;
  console.log(chat);
  return (
    <View className="relative">
      <View className="w-full h-screen absolute">
        <Image
          source={require("../../../../assets/chatbg.png")}
          className="w-full h-full"
        />
      </View>
      <SafeAreaView className="h-screen">
        <View className="relative z-10 p-3 flex gap-5 bg-[#1f2227c8]  flex-row">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-[48px] w-[18px] fle justify-center items-center"
          >
            <FontAwesome name="angle-left" size={34} color="white" />
          </TouchableOpacity>
          <View className="relative w-[48px] h-[48px]">
            <Image
              source={require("../../../../assets/herrand-profile.png")}
              className="rounded-full object-cover w-full h-full"
            />
            <View
              className="bg-[#1FF30C] border-2 border-white w-[14px] h-[14px] rounded-full"
              style={styles.badge}
            ></View>
          </View>
          <View className="flex justify-around">
            <Text className="font-montserratSemiBold text-white">
              {/* {message.customer.first_name} */}
              {chat?.customer?.first_name} {chat?.customer?.last_name}
              {/* Kelly otewo */}
            </Text>
            <Text className="text-sm font-montserratRegular text-[#AEAEAE]">
              {chat?.customer?.status}
            </Text>
          </View>
          <View className="flex justify-between top-6 items-end absolute right-5">
            <Entypo name="phone" size={22} color="white" />
          </View>
        </View>
        <KeyboardAvoidingView
          // style={{flex : 1}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex justify-between h-[95%]"
        >
          <ScrollView className="flex gap-y-4 p-3 mt-4">
            {/* Left chat */}
            {chat &&
              chat.message_set.map((item, index) => {
                return item.sender === userId ? (
                  <View className="w-full flex flex-row">
                    <View
                      className="bg-[#CCE0FD] max-w-[70%] p-2 flex rounded-br-sm rounded-md"
                      key={index}
                    >
                      <Text>{item.text}</Text>
                      <View className="flex w-full justify-end flex-row h-[20px] items-end">
                        <Text className="text-xs font-montserratMedium">
                          {new Date(item.timestamp)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}
                          :
                          {new Date(item.timestamp)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}{" "}
                          {new Date(item.timestamp)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0") > 12
                            ? "PM"
                            : "AM"}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    className="w-full flex flex-row justify-end"
                    key={index}
                  >
                    <View className="bg-[#0066F5] max-w-[70%] p-2 flex rounded-br-sm rounded-md">
                      <Text className="text-white">{item.text}</Text>
                      <View className="flex w-full justify-end flex-row h-[20px] items-end">
                        <Text className="text-white text-xs font-montserratMedium">
                          {new Date(item.timestamp)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}
                          :
                          {new Date(item.timestamp)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}{" "}
                          {new Date(item.timestamp)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0") > 12
                            ? "PM"
                            : "AM"}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          <View className="bg-[#1f2227] flex flex-row justify-between  p-5 align-baseline z-20 relative bottom-0">
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Type your message"
              placeholderTextColor={"#ffffff"}
              className="font-montserratRegular w-[90%]"
            />
            <View className="w-[10%] flex justify-center items-end">
              <Ionicons name="send-sharp" size={24} color="#6B7C97" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ChatBoard;
