import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import DescriptionIcon from "../../../assets/icons/description.png";
import TimeIcon from "../../../assets/icons/time.png";
import AgentSeenIcon from "../../../assets/icons/agent-seen.png";
import StarIcon from "../../../assets/icons/star.png";
import { formatCurrency } from "../../../helpers/CurrencyFormatter";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import TurnOverIcon from "../../../assets/icons/turnover-icon.png";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const CustomerVirtualProcess = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(0);
  
  const agentsList = [
    {
      image: require("../../../assets/matty.png"),
      name: "Matty Johnson",
      status: "Active",
      rating: "4.5",
      turnOverTime: "3 hrs",
      amount: 3500,
      id: 1,
    },
    {
      image: require("../../../assets/derick.png"),
      name: "Derrick Samson",
      status: "Offline",
      rating: "4.2",
      turnOverTime: "1 hrs",
      amount: 4000,
      id: 2,
    },
    {
      image: require("../../../assets/bolaji.png"),
      name: "Bolaji Desmond",
      status: "Active",
      rating: "4.2",
      turnOverTime: "1 hrs",
      amount: 5400,
      id: 3,
    },
    {
      image: require("../../../assets/chineye.png"),
      name: "Chinenye Amadi",
      status: "Active",
      rating: "4.7",
      turnOverTime: "90 mins",
      amount: 5100,
      id: 4,
    },
  ];

  const chooseAgent = (id) => {
    setSelectedId(id);
  };

  return (
    <SafeAreaComponent classes={`px-[16px]`}>
      <View
        className={`bg-[#CCE0FD] px-[8px] py-[16px] rounded-[4px] shadow-md`}
        style={{ marginTop: height * 0.056 }}
      >
        <Text className={`text-[12px] font-montserratSemiBold text-center`}>
          Looking for offers
        </Text>

        <View className={`mt-[41px]`}>
          <Text className={`text-[12px] font-montserratSemiBold`}>
            Order Summary
          </Text>

          <View className={`w-full h-[1px] bg-[#9CA8BA] my-[8px]`} />

          <View className={`flex-row items-center justify-between`}>
            <View className={`flex-row items-center space-x-[8px]`}>
              <Image source={DescriptionIcon} className={`w-[24px] h-[24px]`} />
              <Text className={`text-[12px] font-montserratSemiBold`}>
                Description
              </Text>
            </View>

            <Text className={`text-[12px] font-montserratMedium`}>Typing</Text>
          </View>

          <View className={`w-full h-[1px] bg-[#9CA8BA] my-[8px]`} />

          <View className={`flex-row items-center justify-between`}>
            <View className={`flex-row items-center space-x-[8px]`}>
              <Image source={TimeIcon} className={`w-[24px] h-[24px]`} />
              <Text className={`text-[12px] font-montserratSemiBold`}>
                Time
              </Text>
            </View>

            <Text className={`text-[12px] font-montserratMedium`}>
              3 hrs (180 mins.)
            </Text>
          </View>

          <View className={`w-full h-[1px] bg-[#9CA8BA] my-[8px]`} />

          <View className={`flex-row items-center justify-between`}>
            <View className={`flex-row items-center space-x-[8px]`}>
              <Image source={AgentSeenIcon} className={`w-[24px] h-[24px]`} />
              <Text className={`text-[12px] font-montserratSemiBold`}>
                Agent seen
              </Text>
            </View>

            <Text className={`text-[12px] font-montserratMedium`}>
              Over 20 agents
            </Text>
          </View>
        </View>
      </View>

      <View className={`mt-[4px] bg-[#F7F7F7]`}>
        {agentsList.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            className={`p-[8px] ${selectedId === agent.id && `bg-[#CCE0FD]`}`}
            onPress={() => chooseAgent(agent.id)}
          >
            <View className={`flex-row items-center justify-between`}>
              <View className={`flex-row items-center space-x-[8px]`}>
                <Image source={agent.image} className={`w-[24px] h-[24px]`} />
                <Text className={`text-[8px] font-montserratSemiBold`}>
                  {agent.name}
                </Text>
              </View>

              <Text
                className={`${
                  agent.status === "Active"
                    ? `text-[#27AE60]`
                    : `text-[#C6C6C6]`
                } text-[8px] font-montserratSemiBold`}
              >
                {agent.status}
              </Text>
            </View>

            <View className={`flex-row space-x-2 mt-[6px]`}>
              <Text className={`text-[8px] font-montserratRegular`}>
                Rating
              </Text>
              <Text className={`text-[8px] font-montserratRegular`}>|</Text>
              <Text className={`text-[8px] font-montserratRegular`}>
                Turnover time
              </Text>
            </View>

            <View className={`my-[8px] flex-row items-center space-x-3`}>
              <View className={`flex-row items-center space-x-1`}>
                <Image source={StarIcon} className={`w-[8px] h-[8px]`} />
                <Text className={`text-[8px] font-montserratRegular`}>
                  {agent.rating}
                </Text>
              </View>
              <View />
              <View className={`flex-row items-center space-x-1`}>
                <Image source={TurnOverIcon} className={`w-[8px] h-[8px]`} />
                <Text className={`text-[8px] font-montserratRegular`}>
                  {agent.turnOverTime}
                </Text>
              </View>
            </View>

            <View>
              <Text className={`text-[12px] font-montserratSemiBold`}>
                {formatCurrency(agent.amount)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <SquareButton
          text={"Complete your order"}
          styles={{ backgroundColor: colors.primaryColor, marginTop: 7 }}
          onPress={() => navigation.navigate("PaymentSuccess")}
        />
      </View>
    </SafeAreaComponent>
  );
};

export default CustomerVirtualProcess;

const styles = StyleSheet.create({});
