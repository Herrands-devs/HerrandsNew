import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeAreaComponent = ({ children, classes }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={[
        { paddingTop: insets.top, backgroundColor: "#fff", height: "100%" },
      ]}
      className={`flex-1 ${classes}`}
    >
      {children}
    </ScrollView>
  );
};

export default SafeAreaComponent;

const styles = StyleSheet.create({});
