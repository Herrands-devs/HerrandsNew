import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  Image,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../../themes/colors";

const { width, height } = Dimensions.get("window");

const CategoryModal = ({
  isVisible,
  closeModal,
  initalValue,
  title,
  options,
}) => {
  const translateX = useRef(new Animated.Value(initalValue)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideOut = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: initalValue,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideOut}
    >
      <TouchableWithoutFeedback onPress={slideOut}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <View className={`flex-row`}>
              <View>
                <Text
                  className={`text-[20px] font-montserratSemiBold text-black`}
                >
                  {title}
                </Text>

                <View className={`mt-[27px]`}>
                  {options &&
                    options.map((text, i) => (
                      <TouchableOpacity key={i} className={`my-[16px]`}>
                        <Text
                          className={`text-[14px] font-montserratMedium text-subTitle`}
                        >
                          {text.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#192433c1",
    paddingTop: height * 0.28,
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  modalContent: {
    alignItems: "center",
  },
});
