import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./DashboardScreen";
import { ErrandsScreen } from "./ErrandsScreen";
import { Image } from "react-native";
import { iconsPack } from "../../components/icons";
import Profilescreen from "./ProfileScreen";
import EarningsScreen from "./EarningsScreen";
import { Platform } from "react-native";
import ChatsScreen from "./ChatsScreen";
import BottomSheetLoading from "../../components/common/BottomSheetLoading";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const {
    homeIcon,
    homeHover,
    chatIcon,
    chatHoverIcon,
    errandsIcon,
    errandsHoverIcon,
    earningsIcon,
    profileIcon,
  } = iconsPack();
  return (
  <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? homeHover : homeIcon;
          } else if (route.name === "Errands") {
            iconName = focused ? errandsHoverIcon : errandsIcon;
          } else if (route.name === "Chats") {
            iconName = focused ? chatHoverIcon : chatIcon;
          } else if (route.name === "Earnings") {
            iconName = focused ? earningsIcon : earningsIcon;
          } else if (route.name === "Profile") {
            iconName = focused ? profileIcon : profileIcon;
          }
          // You can return any component that you like here!
          return <Image source={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0066F5",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: Platform.OS == "ios" ? 90 : 60,
          paddingBottom: Platform.OS == "android" ? 10 : 35,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "800" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Errands" component={ErrandsScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
    </Tab.Navigator>
    <BottomSheetLoading />
    </>
  );
};

export default HomeScreen;
