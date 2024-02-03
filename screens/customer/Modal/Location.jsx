import React from "react";
import { View, Text, Modal, KeyboardAvoidingView } from "react-native";
import SelectAddress from "../Main/SelectAddress";
import KeyboardAvoidingContainer from "../../components/common/KeyboardAvoidingContainer";

const Location = ({ isOpen , setIsOpen , type }) => {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
    >
      <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
         //  style={{ flex: 1 }}
          // keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <View className="w-full min-h-[50vh] space-y-5 bg-white rounded-lg shadow-lg p-4">
            <SelectAddress type={type} setIsOpen={setIsOpen}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default Location;
