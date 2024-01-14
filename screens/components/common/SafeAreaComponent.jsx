import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeAreaComponent = ({ children, classes, scrollEnabled }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={[
        {
          paddingTop: Platform.OS === "android" ? insets.top + 20 : insets.top,
          backgroundColor: "#fff",
          zIndex: 5
        },
      ]}
      className={`flex-1 ${classes}`}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};

export default SafeAreaComponent;

const styles = StyleSheet.create({});
