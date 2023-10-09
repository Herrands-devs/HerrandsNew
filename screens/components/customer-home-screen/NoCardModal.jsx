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

const { width, height } = Dimensions.get("window");

const NoCardModal = ({ isVisible, closeModal }) => {
  const translateX = useRef(new Animated.Value(500)).current;
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
        toValue: 500,
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
            <View className={`flex-row items-center w-full justify-center`}>
              <View>
                <Text
                  className={`text-[20px] font-montserratSemiBold text-white text-center`}
                >
                  You are yet to add a card
                </Text>
                <Text
                  className={`text-[12px] font-montserratRegular text-white text-center mt-[15px]`}
                >
                  please tap the + button below to add a card
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NoCardModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#192433c1",
    paddingTop: height * 0.28,
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#082552",
    borderRadius: 16,
    width: "80%",
    paddingHorizontal: 24,
    paddingVertical: 32,
    height: height * 0.16,
  },
  modalContent: {
    alignItems: "center",
  },
});
