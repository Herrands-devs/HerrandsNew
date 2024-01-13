import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Platform } from "react-native";
import axios from "axios";
import { GlobalContext } from "../../../context/context.store";
import isEmpty from "../../components/isEmpty";
import useSocket from "../../../helpers/socket.service";
import { API_URl } from "@env";

const ChatBoardCustomer = ({ navigation, route }) => {
  const { userId, isToken, setSocketUrl } = useContext(GlobalContext);
  const [message, setMessage] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { chat, agent } = route.params;
  const [textInput, setText] = useState("");
  const { sendMessage, handleButtonClick, isConnected } = useSocket();

  useEffect(() => {
    setSocketUrl("ws/chat/" + chat);
    setLoading(true);
    axios
      .get(`${API_URl}/api/conversations/` + chat, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
      .then((response) => {
        setMessage(response.data[0].message_set);
        setLoading(false);
        scrollToBottom();
        // setChat(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, [API_URl]);

  const handleSendMessage = () => {
    if (isEmpty(textInput)) {
      return;
    } else {
      if (isConnected) {
        sendMessage({
          message: textInput,
        });
        setMessage((prev) => [
          ...prev,
          {
            id: 20,
            text: textInput,
            attachment: null,
            timestamp: new Date(),
            sender: userId,
            conversation_id: 1,
          },
        ]);
        setText("");
      } else {
        handleButtonClick();
      }
    }
  };
  const scrollViewRef = useRef();

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  
  return (
    <View className="relative">
      <View className="w-full h-screen absolute">
        <Image
          source={require("../../../assets/chatbg.png")}
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
              source={require("../../../assets/herrand-profile.png")}
              className="rounded-full object-cover w-full h-full"
            />
            <View
              className="bg-[#1FF30C] border-2 border-white w-[14px] h-[14px] rounded-full"
              style={styles.badge}
            ></View>
          </View>
          <View className="flex justify-around">
            <Text className="font-montserratSemiBold text-white">
              {/* {message.agent.first_name} */}
              {agent?.first_name} {agent?.last_name}
              {/* Kelly otewo */}
            </Text>
            <Text className="text-sm font-montserratRegular text-[#AEAEAE]">
              {agent?.status}
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
          <ScrollView
            className="flex gap-y-4 p-3 mt-4"
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            ref={scrollViewRef}
          >
            <View className="flex justify-center items-center">
              <View className="bg-slate-200 p-1 rounded-md">
                <Text>Start Conversation</Text>
              </View>
            </View>
            {isLoading ? (
              <View className="flex justify-center items-center">
                <View className="bg-black opacity-60 flex rounded-full w-[40px] h-[40px]  justify-center items-center">
                  <ActivityIndicator />
                </View>
              </View>
            ) : (
              // Left chat
              !isEmpty(message) &&
              message.map((item, index) => {
                return item.sender !== userId ? (
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
              })
            )}
            <View className="h-[60px] w-full" />
          </ScrollView>
          <View
            className="bg-[#1f2227] flex flex-row justify-between  p-5 align-baseline z-20 relative bottom-0"
            onPress={scrollToBottom}
          >
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={textInput}
              placeholder="Type your message"
              placeholderTextColor={"#ffffff"}
              className="font-montserratRegular w-[90%] text-white"
              onChangeText={(text) => {
                setText(text);
              }}
              onFocus={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            />
            <Pressable
              onPress={() => {
                handleSendMessage();
                scrollToBottom();
              }}
              className="w-[10%] flex justify-center items-end"
            >
              <Ionicons name="send-sharp" size={24} color="#6B7C97" />
            </Pressable>
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

export default ChatBoardCustomer;
