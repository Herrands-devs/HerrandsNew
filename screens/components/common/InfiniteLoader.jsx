import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../../themes/colors";
import { Easing } from "react-native";

const InfiniteLoader = ({
  duration
}) => {
  const progress = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      animateLoader();
   }, []);

  const animateLoader = () => {
     Animated.loop(
      Animated.timing(progress , {
         toValue : 1,
         duration : 2000,
         easing : Easing.linear,
         useNativeDriver : false
      })
     ).start()
  };

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loader,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    width: "100%",
    height: 5,
    borderRadius: 4,
    backgroundColor: "#99C2FB",
  },
  loader: {
    height: "100%",
    backgroundColor: colors.primaryColor,
    borderRadius: 4,
  },
});

export default InfiniteLoader;
