import React, { useContext, useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  InProgress,
  IncomeOrder,
  NoOrder,
} from "./components/DashboardComponent";
import { API_URl } from "@env";
import { GlobalContext } from "../../../context/context.store";
import axios from "axios";
import * as Location from "expo-location";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import useSocket from "../../../helpers/socker.service";
import isEmpty from "../../components/isEmpty";

const DashboardScreen = ({ navigation }) => {
  const {
    Agent,
    isToken,
    setAgent,
    createErrandSent,
    receiveErrand,
    acceptedErrand,
  } = useContext(GlobalContext);
  const { sendMessage, handleButtonClick, isConnected } = useSocket();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  useEffect(() => {
    axios
      .get(`${API_URl}/accounts/me/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
      .then((response) => {
        setAgent(response.data);
      })
      .catch((err) => console.log(err));
  }, [API_URl]);

  useEffect(() => {
    handleButtonClick();
    if (isConnected) {
      console.log("yes");
    } else {
      console.log("no");
    }
  });
  const handleClick = () => {
    sendMessage({
      type: "echo.message",
      data: "hello",
    });
  };
  useEffect(() => {
    console.log("Received ::", receiveErrand);
    console.log("accepted ::", acceptedErrand);
  }, [receiveErrand, acceptedErrand]);
  const [radiusMap, setRadiusMap] = useState(15);
  const { width, height } = Dimensions.get("window");
  return (
    <View>
      <View className="relative h-full bg-red">
        <View className="absolute z-30 w-[38px] flex justify-between items-center h-[82px] rounded-[50px] bg-white shadow-lg top-[40%] right-5">
          <TouchableOpacity
            onPress={handleClick}
            className="h-1/2 w-full flex justify-center items-center"
          >
            <Feather name="plus" size={24} color="#000E23" />
          </TouchableOpacity>
          {radiusMap != 0 ? (
            <TouchableOpacity
              onPress={() => setRadiusMap(radiusMap - 100)}
              className="h-1/2 w-full flex justify-center items-center"
            >
              <Feather name="minus" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="h-1/2 w-full bg-slate-200 rounded-b-[40px] flex justify-center items-center">
              <Feather name="minus" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? parseFloat(location.coords.latitude) : 9.082,
              longitude: location
                ? parseFloat(location.coords.longitude)
                : 8.6753,
              latitudeDelta: location ? radiusMap / 100 : 0,
              longitudeDelta: location ? radiusMap / 100 : 0,
            }}
            provider={PROVIDER_GOOGLE}
            mapType={Platform.OS == "android" ? "none" : "standard"}
            followUserLocation={true}
            zoomEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: location
                  ? parseFloat(location.coords.latitude)
                  : 9.082,
                longitude: location
                  ? parseFloat(location.coords.longitude)
                  : 8.6753,
                latitudeDelta: radiusMap / 100,
                longitudeDelta: radiusMap / 100,
              }}
              image={require("../../../assets/location.png")}
            />
            <Circle
              center={{
                latitude: location ? location.coords.latitude : 0,
                longitude: location ? location.coords.longitude : 0,
              }}
              radius={radiusMap}
              fillColor="#0066f52f"
              strokeWidth={1}
              strokeColor="#0066f52f"
            />
          </MapView>
        </View>
        {!isEmpty(receiveErrand) && isEmpty(acceptedErrand) && (
          <IncomeOrder data={receiveErrand} />
        )}
        {isEmpty(receiveErrand) && !isEmpty(acceptedErrand) && (
          <InProgress data={acceptedErrand} />
        )}
        {isEmpty(receiveErrand) && isEmpty(acceptedErrand) && <NoOrder />}
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
