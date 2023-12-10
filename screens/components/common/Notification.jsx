import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Image,
} from "react-native";
import { colors } from "../../../themes/colors";
import { SquareButton } from "./Button";

const Notification = ({
  isVisible,
  onClose,
  title,
  subTitle,
  btnBackground,
  image,
  btnText,
  onPress
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.dialogBox,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            className={`absolute right-[8px] top-[8px]`}
            onPress={onClose}
          >
            <AntDesign name="close" size={24} color={colors.blackBackground} />
          </TouchableOpacity>
          <Image source={image} className={`w-[115px] h-[115px]`} />
          <Text
            className={`my-[12px] text-[18px] text-black font-montserratBold`}
          >
            {title}
          </Text>
          <Text
            className={`text-center max-w-[279px] font-montserratRegular text-[12px]`}
          >
            {subTitle}
          </Text>
          <SquareButton
            onPress={onPress}
            text={btnText}
            styles={{ backgroundColor: btnBackground , marginTop : 20 }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    position: "relative",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default Notification;
