import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      initialRegion={{ latitude: "51.871496514", longitude: " -0.367665196" }}
      style={{ flex: 1 }}
    />
  );
};

export default Map;

const styles = StyleSheet.create({});
