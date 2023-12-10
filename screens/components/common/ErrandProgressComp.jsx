import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/context-agent.store";
import InactiveTrack from "../../../assets/inactive-track.png";
import OngoingTrack from "../../../assets/ongoing-track.png";
import CompletedTrack from "../../../assets/completed-track.png";
import ChatWithAgent from "../../../assets/icons/chat-with-agent.png";

const ErrandProgressComp = () => {
  const { errandStates } = useContext(GlobalContext);

  return (
    <View style={styles.modalContent}>
      <View className={`flex-row items-center space-x-[8px] px-[16px]`}>
        <Image
          source={
            errandStates.orderPlaced === "completed"
              ? CompletedTrack
              : errandStates.orderPlaced === "ongoing"
              ? OngoingTrack
              : InactiveTrack
          }
          className={`w-[42px] h-[42px]`}
        />
        <View
          className={`${
            errandStates.orderPlaced === "completed"
              ? "bg-[#66A3F9]"
              : errandStates.orderPlaced === "ongoing"
              ? "bg-[#0066F5]"
              : "bg-[#C6C6C6]"
          } p-1 rounded-[4px]`}
        >
          <Text
            className={`${
              errandStates.orderPlaced === "completed"
                ? "text-white"
                : errandStates.orderPlaced === "ongoing"
                ? "text-white"
                : "text-[#6B7C97]"
            } text-[16px] font-montserratRegular`}
          >
            Order Placed
          </Text>
        </View>
      </View>

      <View
        className={`${
          errandStates.wayToPick === "completed" ||
          errandStates.wayToPick === "ongoing"
            ? "bg-[#66A3F9]"
            : "bg-[#C6C6C6]"
        } h-[32px] w-[1.5px] ml-[35px]`}
      />

      <View className={`flex-row items-center space-x-[8px] px-[16px]`}>
        <Image
          source={
            errandStates.wayToPick === "completed"
              ? CompletedTrack
              : errandStates.wayToPick === "ongoing"
              ? OngoingTrack
              : InactiveTrack
          }
          className={`w-[42px] h-[42px]`}
        />
        <View
          className={`${
            errandStates.wayToPick === "completed"
              ? "bg-[#66A3F9]"
              : errandStates.wayToPick === "ongoing"
              ? "bg-[#0066F5]"
              : "bg-[#C6C6C6]"
          } p-1 rounded-[4px]`}
        >
          <Text
            className={`text-[16px] font-montserratRegular ${
              errandStates.wayToPick === "completed"
                ? "text-white"
                : errandStates.wayToPick === "ongoing"
                ? "text-white"
                : "text-[#6B7C97]"
            }`}
          >
            Agent on their way to pickup
          </Text>
        </View>
      </View>

      <View
        className={`${
          errandStates.wayToDeliver === "completed" ||
          errandStates.wayToDeliver === "ongoing"
            ? "bg-[#66A3F9]"
            : "bg-[#C6C6C6]"
        } h-[32px] w-[1.5px] ml-[35px]`}
      />

      <View className={`flex-row items-center space-x-[8px] px-[16px]`}>
        <Image
          source={
            errandStates.wayToDeliver === "completed"
              ? CompletedTrack
              : errandStates.wayToDeliver === "ongoing"
              ? OngoingTrack
              : InactiveTrack
          }
          className={`w-[42px] h-[42px]`}
        />
        <View
          className={`${
            errandStates.wayToDeliver === "completed"
              ? "bg-[#66A3F9]"
              : errandStates.wayToDeliver === "ongoing"
              ? "bg-[#0066F5]"
              : "bg-[#C6C6C6]"
          } p-1 rounded-[4px]`}
        >
          <Text
            className={`text-[16px] font-montserratRegular ${
              errandStates.wayToPick === "completed"
                ? "text-white"
                : errandStates.wayToPick === "ongoing"
                ? "text-white"
                : "text-[#6B7C97]"
            }`}
          >
            Agent on their way to deliver
          </Text>
        </View>
      </View>

      <View
        className={`${
          errandStates.delivered === "completed" ||
          errandStates.delivered === "ongoing"
            ? "bg-[#66A3F9]"
            : "bg-[#C6C6C6]"
        } h-[32px] w-[1.5px] ml-[35px]`}
      />

      <View className={`flex-row items-center space-x-[8px] px-[16px]`}>
        <Image
          source={
            errandStates.delivered === "completed"
              ? CompletedTrack
              : errandStates.delivered === "ongoing"
              ? OngoingTrack
              : InactiveTrack
          }
          className={`w-[42px] h-[42px]`}
        />
        <View
          className={`${
            errandStates.delivered === "completed"
              ? "bg-[#66A3F9]"
              : errandStates.delivered === "ongoing"
              ? "bg-[#0066F5]"
              : "bg-[#C6C6C6]"
          } p-1 rounded-[4px]`}
        >
          <Text
            className={`text-[16px] font-montserratRegular ${
              errandStates.delivered === "completed"
                ? "text-white"
                : errandStates.delivered === "ongoing"
                ? "text-white"
                : "text-[#6B7C97]"
            }`}
          >
            Pacel delivered
          </Text>
        </View>
      </View>

      <TouchableOpacity className={`absolute right-[26px] bottom-[0px]`}>
        <View className={`items-center`}>
          <Image source={ChatWithAgent} className={`w-[42px] h-[42px]`} />
        </View>
        <Text className={`text-[12px] font-montserratRegular max-w-[78px]`}>
          Chat with your agent
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrandProgressComp;

const styles = StyleSheet.create({});
