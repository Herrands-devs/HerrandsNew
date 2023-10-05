import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import ResendClose from "../../../assets/icons/resend-close.png";
import BySms from "../../../assets/icons/by-sms-icon.png";
import ByCall from "../../../assets/icons/by-call-icon.png";
import EditNumber from "../../../assets/icons/edit-number-icon.png";

export const ResendModal = ({ isVisible, closeModal }) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 280,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.modalContent}>
            <View
              className={`flex-row items-center w-full justify-between px-[10px]`}
            >
              <Text
                className={`tet-[16px] font-montserratSemiBold text-subTitle`}
              >
                Resend Code to
              </Text>
              <TouchableOpacity onPress={slideDown}>
                <Image source={ResendClose} className={`w-[16px] h-[16px]`} />
              </TouchableOpacity>
            </View>
            <View
              className={`flex-row items-center w-full justify-between px-[10px] mt-[20px]`}
            >
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                +234 7020304050
              </Text>
            </View>
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2`}
            >
              <Image source={BySms} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Resend code by SMS
              </Text>
            </TouchableOpacity>
            <View className={`w-full h-[1px] bg-[#ccc] my-[11px]`} />
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2`}
            >
              <Image source={ByCall} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Request call back
              </Text>
            </TouchableOpacity>
            <View className={`w-full h-[1px] bg-[#ccc] my-[11px]`} />
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2 mb-[11px]`}
            >
              <Image source={EditNumber} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Edit phone number
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "80%",
  },
  modalContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
