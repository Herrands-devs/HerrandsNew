import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { LayeredBtn, SquareButton } from "../common/Button";
import { colors } from "../../../themes/colors";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Sidebar = ({ isOpen, onClose, navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [logoutModal, setLogoutModal] = useState(false);

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
      icon: require("../../../assets/icons/user-icon.png"),
      href: "MyErrandsCustomer",
    },
    {
      title: "Payments",
      icon: require("../../../assets/icons/payments-icon.png"),
      href: "CustomerPayments",
    },
    {
      title: "Report an issue",
      icon: require("../../../assets/icons/report-icon.png"),
      href: "",
    },
    {
      title: "Safety",
      icon: require("../../../assets/icons/safety-icon.png"),
      href: "",
    },
    {
      title: "Rate us",
      icon: require("../../../assets/icons/rate-icon.png"),
      href: "",
    },
    {
      title: "Log out",
      icon: require("../../../assets/icons/logout-icon.png"),
      href: "",
    },
  ];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <View
        className={`bg-white h-full flex-column relative`}
        style={styles.innerContainer}
      >
        <View
          className={`flex-row items-center space-x-4 justify-start w-full px-[18px] relative`}
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CustomerEditProfile");
              }}
            >
              <Text
                className={`text-primaryColor font-montserratRegular text-[12px]`}
              >
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="left" size={24} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        <View className={`mt-[28px] bg-[#F7F7F7]`}>
          {sidebarItems.map((item) => (
            <TouchableOpacity
              className={`flex-row items-center space-x-[6px] p-[18px]`}
              key={item.title}
              onPress={() => {
                if (item.title === "Log out") {
                  setLogoutModal(true);
                } else if (item.href !== "") {
                  navigation.navigate(item.href);
                }
              }}
            >
              <Image source={item.icon} className={`w-[24px] h-[24px]`} />
              <Text className={`font-montserratBold text-sidebarText`}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          className={`flex-row w-full justify-center bottom-[30px] absolute px-[5px]`}
        >
          <LayeredBtn
            text={"Become an agent"}
            subText={"Get paid for your time"}
            styles={{
              backgroundColor: colors.primaryColor,
              justifyContent: "flex-start",
              width: "100%",
            }}
          />
        </View>
      </View>

      <Modal visible={logoutModal} transparent={true} animationType="none">
        <View className={`bg-[#00419b64] justify-center items-start flex-1`}>
          <View
            className={`bg-white p-[16px] rounded-[16px] ml-[16px]`}
            style={{ width: width * 0.6389 }}
          >
            <Text className={`text-center text-[16px] font-montserratMedium`}>
              Do you want to log out?
            </Text>
            <View
              className={`flex-row justify-end items-center space-x-5 mt-[16px]`}
            >
              <TouchableOpacity onPress={() => setLogoutModal(false)}>
                <Text
                  className={`text-primaryColor text-[14px] font-montserratMedium`}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignInPhone");
                  setLogoutModal(false);
                }}
              >
                <Text className={`text-red  text-[14px] font-montserratMedium`}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
  },
  innerContainer: {
    width: width * 0.8,
    paddingTop: 50,
  },
  closeButton: {
    padding: 20,
    position: "absolute",
    right: 18,
    top: 0,
  },
  closeButtonText: {
    color: "blue",
    textAlign: "center",
  },
  content: {},
});

export default Sidebar;
