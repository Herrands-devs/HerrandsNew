import React, { useState } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from "react-native";
import {
  InProgress,
  IncomeOrder,
  NoOrder,
} from "./components/DashboardComponent";

const DashboardScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <View className="relative h-full bg-red">
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.coords.latitude : 0,
              longitude: location ? location.coords.longitude : 0,
              latitudeDelta: location ? location.coords.latitudeDelta : 0,
              longitudeDelta: location ? location.coords.longitudeDelta : 0,
            }}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: location ? location.coords.latitude : 0,
                longitude: location ? location.coords.longitude : 0,
              }}
            />
            <Circle
              center={{
                latitude: location ? location.coords.latitude : 0,
                longitude: location ? location.coords.longitude : 0,
              }}
              radius={500}
              fillColor="#0066f52f"
              strokeWidth={1}
              strokeColor="#0066f52f"
            />
          </MapView>
        </View>
        <NoOrder />

        {/* <IncomeOrder /> */}
        {/* <InProgress /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default DashboardScreen;
