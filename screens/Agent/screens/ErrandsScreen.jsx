import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Text, View, ScrollView, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { API_URl } from "@env";
import axios from "axios";
import { GlobalContext } from "../../../context/context.store";
import isEmpty from "../../components/isEmpty";

const FirstRoute = (navigation, isLoading, errandsData, refreshing, handleRefresh) => {
  return (
    <ScrollView
      className="flex gap-[1px]"
      RefreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#333333"]} // Android
          tintColor={"#33333"} // iOS
        />
      }
    >
      {isLoading ? (
        <View className="h-[100px] flex justify-center items-center w-full">
          <ActivityIndicator />
        </View>
      ) : !isEmpty(errandsData) ? (
        errandsData.map((item, index) => {
          return (
            <TouchableOpacity
              className="bg-white pb-3 pr-2 border-b border-[#000e2320] flex gap-2"
              onPress={() =>
                navigation.navigate("InProgressBoard", { data: item })
              }
              key={index}
            >
              <View className="flex gap-2 flex-row justify-between items-center">
                <Text className="font-montserratRegular text-[#C6C6C6]">
                  {new Date(item.created).getDate() +
                    "/" +
                    new Date(item.created).getMonth() +
                    "/" +
                    new Date(item.created).getFullYear()}
                </Text>
                <View className="bg-[#34A853] py-[7px] px-[18px] rounded-full">
                  <Text className="font-montserratRegular text-white">
                    In Progress
                  </Text>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <Text className="text-[#000E23] text-[20px]">
                  {item?.subtype?.name}
                </Text>
                <Text className="text-[#C6C6C6] text-[14px] font-montserratRegular">
                  Duration : {item.estimated_drop_off_time}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2 font-montserratBold">
                <View className="w-[40px] h-[40px]">
                  <Image
                    source={require("../../../assets/herrand-profile.png")}
                    className="rounded-full object-cover w-full h-full"
                  />
                </View>
                <Text>
                  {item.customer.first_name} {item.customer.last_name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View className="flex items-center w-full h-screen  bg-white pt-24">
          <Image
            source={require("../../../assets/gifs/question.gif")}
            className={`w-[151px] h-[151px]`}
          />
          <Text className="font-montserratBold text-lg mt-3">
            No Errands yet!!
          </Text>
        </View>
      )}
      <View className="h-[150px] w-full"></View>
    </ScrollView>
  );
};

const SecondRoute = (navigation, isFetching, completedErrands, refreshing) => {
  return (
    <ScrollView
      className="flex gap-[1px]"
      RefreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={completedErrands}
          colors={["#333333"]} // Android
          tintColor={"#33333"} // iOS
        />
      }
    >
      {isFetching ? (
        <View className="h-[100px] flex justify-center items-center w-full">
          <ActivityIndicator />
        </View>
      ) : !isEmpty(completedErrands) ? (
        completedErrands.map((item, index) => {
          return (
            <TouchableOpacity
              className="bg-white pb-3 pr-2 border-b border-[#000e2320] flex gap-2"
              onPress={() =>
                navigation.navigate("InProgressBoard", { data: item })
              }
              key={index}
            >
              <View className="flex gap-2 flex-row justify-between items-center">
                <Text className="font-montserratRegular text-[#C6C6C6]">
                  {new Date(item.created).getDate() +
                    "/" +
                    new Date(item.created).getMonth() +
                    "/" +
                    new Date(item.created).getFullYear()}
                </Text>
                <View className="bg-[#C6C6C6] py-[7px] px-[18px] rounded-full">
                  <Text className="font-montserratRegular text-white">
                    Completed
                  </Text>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <Text className="text-[#000E23] text-[20px]">
                  {item?.subtype?.name}
                </Text>
                <Text className="text-[#C6C6C6] text-[14px] font-montserratRegular">
                  Duration : {item.estimated_drop_off_time}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2 font-montserratBold">
                <View className="w-[40px] h-[40px]">
                  <Image
                    source={require("../../../assets/herrand-profile.png")}
                    className="rounded-full object-cover w-full h-full"
                  />
                </View>
                <Text>
                  {item.customer.first_name} {item.customer.last_name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View className="flex items-center w-full h-screen  bg-white pt-24">
          <Image
            source={require("../../../assets/gifs/question.gif")}
            className={`w-[151px] h-[151px]`}
          />
          <Text className="font-montserratBold text-lg mt-3">
            No Errands yet!!
          </Text>
        </View>
      )}
      <View className="h-[150px] w-full"></View>
    </ScrollView>
  );
};

export const ErrandsScreen = ({ navigation }) => {
  const { isToken } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errandsData, setErrandsData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [completedErrands, setCompleted] = useState([]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "In Progress" },
    { key: "second", title: "Completed" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white", height: 5 }}
      style={{ backgroundColor: "#0066F5" }}
    />
  );

  const fetchErrands = () => {
    axios
      .get(`${API_URl}/api/user_errand_tasks/agent_errands/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
      .then((response) => {
        setErrandsData(response.data);
        setIsLoading(false);
      })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchErrands()
  }, []);

  const handleRefresh = () => {
    console.log('yes')
    setRefreshing(true); // Set refreshing to true to indicate that a refresh is in progress
    fetchErrands(); // Fetch data again
  };

  useEffect(() => {
    axios
      .get(`${API_URl}/api/user_completed_tasks/agent_errands/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
      .then((response) => {
        setCompleted(response.data.results);
        setIsFetching(false);
      })
      .catch((err) => console.log(err));
  }, [API_URl]);

  useEffect(() => {
    axios
      .get(`${API_URl}/api/user_errand_tasks/agent_errands/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
      .then((response) => {
        setErrandsData(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [API_URl]);
  return (
    <View className="h-full">
      <View
        className={`${
          Platform.OS == "ios" ? "h-[150px]" : "h-[130px]"
        } flex justify-end px-3 bg-[#0066F5]`}
      >
        <Text className="text-white h-[50px] text-[24px] font-montserratBold">
          Errands
        </Text>
      </View>
      <View className="flex flex-row w-full h-full justify-between">
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={({ route }) => {
            switch (route.key) {
              case "first":
                return FirstRoute(
                  navigation,
                  isLoading,
                  errandsData,
                  refreshing,
                  handleRefresh
                );
              case "second":
                return SecondRoute(
                  navigation,
                  isFetching,
                  completedErrands,
                  refreshing
                );
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  );
};
