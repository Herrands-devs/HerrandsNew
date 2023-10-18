import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../../themes/colors";

const HorizontalLoader = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateLoader();
  }, []);

  const animateLoader = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        animateLoader();
      }
    });
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
    width: "80%",
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

export default HorizontalLoader;