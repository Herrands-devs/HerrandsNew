import React from "react";
import { View, Image, StyleSheet, Animated, Easing, Text } from "react-native";
import { colors } from "../../../themes/colors";

const SpinSplash = ({ navigation }) => {
  const spinValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const navigateTimeout = setTimeout(() => {
      navigation.replace("Swapper");
    }, 5000);

    return () => clearTimeout(navigateTimeout);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        source={require("../../../assets/logo.png")}
      />

      <View className={`flex-row items-center absolute bottom-[10%]`}>
        <Text className={`text-white text-[14px] font-montserratBold`}>
          Your personal time optimiser{" "}
        </Text>
        <Image source={require("../../../assets/icons/rocket.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
  },
  spinner: {
    width: 213,
    height: 213,
  },
});

export default SpinSplash;
