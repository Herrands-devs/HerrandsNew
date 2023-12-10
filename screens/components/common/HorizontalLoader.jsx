import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../../themes/colors";
import { GlobalContext } from "../../../context/context-agent.store";

const HorizontalLoader = ({
  duration
}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const { setReceiveErrand } = useContext(GlobalContext)
  const [isDone , setDone] = useState(false)
  useEffect(() => {
    animateLoader();
  }, []);

  useEffect(() => {
    done();
  }, [isDone]);

  const done = () => {
    if(isDone) {
      console.log('YES')
      setReceiveErrand([])
    }
  }

  const animateLoader = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setDone(true)
      } else {
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

export default HorizontalLoader;
