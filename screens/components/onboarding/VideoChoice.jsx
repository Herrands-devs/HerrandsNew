import React, { useContext, useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import { LayeredBtn } from "../common/Button";
import { colors } from "../../../themes/colors";
import { GlobalContext } from "../../../context/context.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function VideoChoice({ navigation }) {
  const videoRef = useRef(null);
  const { setUserType } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      await videoRef.current.loadAsync(
        require("../../../assets/illustration.mp4")
      );
      await videoRef.current.playAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
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
        className={`absolute top-0 left-0 w-full h-full bg-[#000000a9] flex-col justify-end`}
      >
        <View
          className={`flex-col items-center bottom-[100px] justify-evenly px-[16px]`}
        >
          <LayeredBtn
            text={"Start as a customer"}
            styles={{
              backgroundColor: colors.primaryColor,
              alignItems: "center",
              width: "100%",
            }}
            subTextTop={8}
            onPress={() => {
              navigation.navigate("CreateAccountCustomer");
              AsyncStorage.setItem("userType", "Customer");
              setUserType("Customer")
            }}
            textClass={`text-white`}
          />
          <LayeredBtn
            text={"Join as an agent"}
            styles={{
              backgroundColor: "#99C2FB",
              alignItems: "center",
              width: "100%",
              marginTop: 27,
            }}
            subTextTop={8}
            onPress={() => {
              navigation.navigate("AuthScreen");
              AsyncStorage.setItem("userType", "Agent");
              setUserType("Agent")
            }}
            textClass={`text-black`}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoChoice;
