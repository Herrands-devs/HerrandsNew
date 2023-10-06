import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import Hamburger from "../../../assets/icons/hamburger.png";
import Sidebar from "../../components/customer-home-screen/Sidebar";
import { DropDownPicker } from "../../components/common/Dropdown";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";

const CustomerHome = () => {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await videoRef.current.loadAsync(
        require("../../../assets/illustration.mp4")
      );
      await videoRef.current.playAsync();
    })();
  }, []);

  return (
    <View className={`flex-1`}>
      <Video
        ref={videoRef}
        source={require("../../../assets/illustration.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View
        className={`absolute bottom-[30%] top-0 left-0 right-0 bg-[#00000077]`}
      />
      <View
        className={`absolute bottom-0 h-[30%] bg-white w-full px-[16px] py-[8.5px]`}
      >
        <Text className={`text-[16px] font-montserratBold`}>
          Where are you going?
        </Text>

        <View className={`z-10`}>
          <DropDownPicker
            placeHolder={"Select your city"}
            defaultOption={"Select your city"}
            options={[
              { label: "Within Ogun", value: "" },
              { label: "Within Abuja", value: "" },
              { label: "Within Ogun", value: "" },
              { label: "Within Abuja", value: "" },
              { label: "Within Ogun", value: "" },
              { label: "Within Abuja", value: "" },
              { label: "Within Ogun", value: "" },
              { label: "Within Abuja", value: "" },
            ]}
          />
        </View>

        <View className={`mt-[28px]`}>
          <SquareButton
            text={"Let's go"}
            styles={{ backgroundColor: colors.primaryColor, width: "100%" }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Image
          source={Hamburger}
          className={`w-[24px] h-[24px] absolute top-[60px] left-[30px]`}
        />
      </TouchableOpacity>
      <Sidebar isOpen={isOpen} onClose={handleCloseSidebar} />
    </View>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: "30%",
    right: 0,
  },
});
