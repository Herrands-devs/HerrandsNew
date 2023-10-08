import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { Dimensions } from "react-native";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import RightIcon from "../../../assets/icons/right-icon.png";
import CollinsImage from "../../../assets/collins.png";
import ChatIcon from "../../../assets/icons/chat-icon.png";
import { formatCurrency } from "../../../helpers/CurrencyFormatter";
import EmptyComponent from "../../components/common/EmptyComponent";

const { width, height } = Dimensions.get("window");

const MyErrandsCustomer = ({ navigation }) => {
  const [errandState, setErrandState] = useState("Progress");
  const [errands, setErrand] = useState([]);

  const errandLists = [
    {
      title: "Send a package",
      status: "In progress",
      description: "58 inches smart TV",
      agentName: "Collins",
      agentImage: "",
      amount: 9000,
    },
    {
      title: "Take meeting notes",
      status: "In progress",
      description: "58 inches smart TV",
      agentName: "Bolaji",
      agentImage: "",
      amount: 6000,
    },
    {
      title: "Data entry",
      status: "In progress",
      description: "58 inches smart TV",
      agentName: "James",
      agentImage: "",
      amount: 3000,
    },
    {
      title: "Shop for groceries",
      status: "In progress",
      description: "58 inches smart TV",
      agentName: "Collins",
      agentImage: "",
      amount: 9000,
    },
    {
      title: "Send a package",
      status: "In progress",
      description: "58 inches smart TV",
      agentName: "mark",
      agentImage: "",
      amount: 5000,
    },
  ];

  const completedList = [
    // {
    //   title: "Send a package",
    //   status: "Completed",
    //   description: "58 inches smart TV",
    //   agentName: "Collins",
    //   agentImage: "",
    //   amount: 9000,
    // },
    // {
    //   title: "Take meeting notes",
    //   status: "Completed",
    //   description: "58 inches smart TV",
    //   agentName: "Bolaji",
    //   agentImage: "",
    //   amount: 6000,
    // },
    // {
    //   title: "Data entry",
    //   status: "Completed",
    //   description: "58 inches smart TV",
    //   agentName: "James",
    //   agentImage: "",
    //   amount: 3000,
    // },
    // {
    //   title: "Shop for groceries",
    //   status: "Completed",
    //   description: "58 inches smart TV",
    //   agentName: "Collins",
    //   agentImage: "",
    //   amount: 9000,
    // },
    // {
    //   title: "Send a package",
    //   status: "Completed",
    //   description: "58 inches smart TV",
    //   agentName: "mark",
    //   agentImage: "",
    //   amount: 5000,
    // },
  ];

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

      <ScrollView className={`px-[16px]`}>
        {errandState === "Progress" && (
          <>
            {errandLists.length > 0 ? (
              <>
                {errandLists.map((errands) => (
                  <View
                    className={`w-full border border-r-[2px] border-t-0 border-l-0 border-b-0 
              rounded-tr-[4px] rounded-br-[4px] border-r-primaryColor pr-[4px] bg-[#F7F7F7] mt-[14px]`}
                  >
                    <View className={`flex-row items-center justify-between`}>
                      <Text
                        className={`text-[16px] font-montserratSemiBold text-black`}
                      >
                        {errands.title}
                      </Text>
                      <TouchableOpacity
                        className={`flex-row items-center`}
                        onPress={() =>
                          navigation.navigate("CustomerErrandDetails", {
                            name: errands.agentName,
                            status: errands.status,
                            title: errands.title,
                            description: errands.description,
                            price: errands.amount,
                          })
                        }
                      >
                        <Text
                          className={`text-[14px] text-subTitle font-montserratMedium`}
                        >
                          {errands.status}
                        </Text>
                        <Image
                          source={RightIcon}
                          className={`w-[24px] h-[24px]`}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      className={`text-[12px] font-montserratRegular text-black mt-[7px]`}
                    >
                      <Text className={`text-[12px] font-montserratSemiBold`}>
                        description
                      </Text>{" "}
                      | {errands.description}
                    </Text>

                    <View
                      className={`flex-row items-center mt-[7px] justify-between`}
                    >
                      <TouchableOpacity
                        className={`flex-row items-center space-x-2 bg-[#D5D7DA] p-[8px] rounded-full`}
                      >
                        <Image
                          source={ChatIcon}
                          className={`w-[16px] h-[16px]`}
                        />
                        <Image
                          source={CollinsImage}
                          className={`w-[16px] h-[16px]`}
                        />
                        <Text className={`text-[12px] font-montserratSemiBold`}>
                          {errands.agentName}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        className={`text-green text-[20px] font-montserratSemiBold`}
                      >
                        {formatCurrency(errands.amount)}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <EmptyComponent message={"Nothing to see here!!"} />
            )}
          </>
        )}

        {errandState === "Complete" && (
          <>
            {completedList.length > 0 ? (
              <>
                {completedList.map((errands) => (
                  <View
                    className={`w-full border border-r-[2px] border-t-0 border-l-0 border-b-0 
             rounded-tr-[4px] rounded-br-[4px] 
             border-r-[#C6C6C6] pr-[4px] bg-[#F7F7F7] mt-[14px]`}
                  >
                    <View className={`flex-row items-center justify-between`}>
                      <Text
                        className={`text-[16px] font-montserratSemiBold text-black`}
                      >
                        {errands.title}
                      </Text>
                      <TouchableOpacity
                        className={`flex-row items-center`}
                        onPress={() =>
                          navigation.navigate("CustomerErrandDetails", {
                            name: errands.agentName,
                            status: errands.status,
                            title: errands.title,
                            description: errands.description,
                            price: errands.amount,
                          })
                        }
                      >
                        <Text
                          className={`text-[14px] text-subTitle font-montserratMedium`}
                        >
                          {errands.status}
                        </Text>
                        <Image
                          source={RightIcon}
                          className={`w-[24px] h-[24px]`}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      className={`text-[12px] font-montserratRegular text-black mt-[7px]`}
                    >
                      <Text className={`text-[12px] font-montserratSemiBold`}>
                        description
                      </Text>{" "}
                      | {errands.description}
                    </Text>

                    <View
                      className={`flex-row items-center mt-[7px] justify-between`}
                    >
                      <TouchableOpacity
                        className={`flex-row items-center space-x-2 
                    bg-[#D5D7DA] p-[8px] rounded-full`}
                      >
                        <Image
                          source={ChatIcon}
                          className={`w-[16px] h-[16px]`}
                        />
                        <Image
                          source={CollinsImage}
                          className={`w-[16px] h-[16px]`}
                        />
                        <Text className={`text-[12px] font-montserratSemiBold`}>
                          {errands.agentName}
                        </Text>
                      </TouchableOpacity>

                      <Text
                        className={`text-black text-[20px] font-montserratSemiBold`}
                      >
                        {formatCurrency(errands.amount)}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <EmptyComponent message={"Nothing to see here!!"} />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaComponent>
  );
};

export default MyErrandsCustomer;

const styles = StyleSheet.create({});
