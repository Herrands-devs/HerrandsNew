import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { SquareButton } from "../common/Button";
import { colors } from "../../../themes/colors";

const { width } = Dimensions.get("window");

const Sidebar = ({ isOpen, onClose }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen, animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 1, 0],
  });

  const sidebarItems = [
    {
      title: "My errands",
      icon: require("../../../assets/user-icon.png"),
    },
    {
      title: "Payments",
      icon: require("../../../assets/payments-icon.png"),
    },
    {
      title: "Report an issue",
      icon: require("../../../assets/report-icon.png"),
    },
    {
      title: "Safety",
      icon: require("../../../assets/safety-icon.png"),
    },
    {
      title: "Rate us",
      icon: require("../../../assets/rate-icon.png"),
    },
    {
      title: "Log out",
      icon: require("../../../assets/logout-icon.png"),
    },
  ];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <View
        className={`bg-white h-full flex-column relative`}
        style={styles.innerContainer}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <View
          className={`flex-row items-center space-x-4 justify-start w-full px-[18px]`}
        >
          <Image
            source={require("../../../assets/herrand-profile.png")}
            width={100}
            height={100}
            className={`rounded-full w-[60px] h-[60px]`}
          />
          <View className={`space-y-1`}>
            <Text className={`text-sidebarText font-montserratBold`}>
              John doe
            </Text>
            <TouchableOpacity>
              <Text
                className={`text-primaryColor font-montserratRegular text-[12px]`}
              >
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className={`mt-[28px] bg-[#F7F7F7]`}>
          {sidebarItems.map((item) => (
            <TouchableOpacity
              className={`flex-row items-center space-x-[6px] p-[18px]`}
              key={item.title}
            >
              <Image source={item.icon} className={`w-[24px] h-[24px]`} />
              <Text className={`font-montserratBold text-sidebarText`}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          className={`flex-row w-full justify-center bottom-[30px] absolute`}
        >
          <SquareButton
            text={"Become an agent"}
            styles={{
              backgroundColor: colors.primaryColor,
              justifyContent: "flex-start",
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: width,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
  },
  innerContainer: {
    width: width * 0.8,
    paddingTop: 36,
  },
  closeButton: {
    padding: 20,
  },
  closeButtonText: {
    color: "blue",
    textAlign: "center",
  },
  content: {},
});

export default Sidebar;