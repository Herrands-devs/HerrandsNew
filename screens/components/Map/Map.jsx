import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
// import { GOOGLE_MAP_APIKEY } from "@env";

const GOOGLE_MAP_APIKEY = "AIzaSyD6KECCSFyEZbItpPbpThT8Y731peBuw-Y";

const Map = () => {
  return (
    <MapView
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{ flex: 1 }}
      // mapType={Platform.OS == "android" ? "none" : "standard"}
      provider={PROVIDER_GOOGLE}
    />
  );
};

export default Map;

const styles = StyleSheet.create({});
