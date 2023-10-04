import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Video } from "expo-av";
import { LayeredBtn } from "../common/Button";
import { colors } from "../../../themes/colors";

function VideoChoice({ navigation }) {
  const videoRef = useRef(null);

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
          className={`flex-row bottom-[100px] justify-evenly w-full space-x-5`}
        >
          <LayeredBtn
            text={"Become an agent"}
            subText={"run errands"}
            styles={{ backgroundColor: "#313943" }}
            subTextTop={8}
          />
          <LayeredBtn
            text={"Become an customer"}
            subText={"send errands"}
            styles={{ backgroundColor: colors.primaryColor }}
            subTextTop={8}
            onPress={() => navigation.navigate("CreateAccountCustomer")}
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
