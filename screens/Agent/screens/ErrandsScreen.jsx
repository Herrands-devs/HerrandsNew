import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text, View, ScrollView, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

const FirstRoute = (navigation) => {
  return (
    <ScrollView className="flex gap-[1px]">
      <TouchableOpacity
        className="bg-white pb-3 pr-2 border-b border-[#000e2320] flex gap-2"
        onPress={() => navigation.navigate("InProgress")}
      >
        <View className="flex gap-2 flex-row justify-between items-center">
          <Text className="font-montserratRegular text-[#C6C6C6]">4/10/23</Text>
          <View className="bg-[#34A853] py-[7px] px-[18px] rounded-full">
            <Text className="font-montserratRegular text-white">
              In Progress
            </Text>
          </View>
        </View>

        <View className="flex flex-col gap-2">
          <Text className="text-[#000E23] text-[20px]">Send a Package</Text>
          <Text className="text-[#C6C6C6] text-[14px] font-montserratRegular">
            Duration : 45min{" "}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2 font-montserratBold">
          <View className="w-[40px] h-[40px]">
            <Image
              source={require("../../../assets/herrand-profile.png")}
              className="rounded-full object-cover w-full h-full"
            />
          </View>
          <Text>Ronke Titilayo</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SecondRoute = (navigation) => {
  return (
    <ScrollView className="flex gap-[1px]">
      <TouchableOpacity
        className="bg-white pb-3 pr-2 border-b border-[#000e2320] flex gap-2"
        onPress={() => navigation.navigate("IsCompleted")}
      >
        <View className="flex gap-2 flex-row justify-between items-center">
          <Text className="font-montserratRegular text-[#C6C6C6]">4/10/23</Text>
          <View className="bg-[#C6C6C6] py-[7px] px-[18px] rounded-full">
            <Text className="font-montserratRegular text-white">Completed</Text>
          </View>
        </View>

        <View className="flex flex-col gap-2">
          <Text className="text-[#000E23] text-[20px]">Send a Package</Text>
          <Text className="text-[#C6C6C6] text-[14px] font-montserratRegular">
            Herrand Completed
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2 font-montserratBold">
          <View className="w-[40px] h-[40px]">
            <Image
              source={require("../../../assets/herrand-profile.png")}
              className="rounded-full object-cover w-full h-full"
            />
          </View>
          <Text>Ronke Titilayo</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export const ErrandsScreen = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "In Progress" },
    { key: "second", title: "Completed" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "white",
        height: 5,
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
      style={{ backgroundColor: "#0066F5" }}
    />
  );
  return (
    <View className="h-full">
      <View className="h-[150px] flex justify-end px-3 bg-[#0066F5]">
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
                return FirstRoute(navigation);
              case "second":
                return SecondRoute(navigation);
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
