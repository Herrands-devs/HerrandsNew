import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { useDispatch, useSelector } from "react-redux";
import { DataSelector, toggleModal } from "../../../reducers/dataReducer";
import {
  AntDesign,
  EvilIcons,
  Feather,
  Octicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { GlobalContext } from "../../../context/context.store";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { PrimaryInput } from "../../components/common/Inputs";
import SelectAddress from "../Main/SelectAddress";
import AnimatedLottieView from "lottie-react-native";
import isEmpty from "../../components/isEmpty";
import { TextInput } from "react-native";
import { GOOGLE_MAP_APIKEY } from "@env";
import useSocket from "../../../helpers/socket.service";

const CompletionOrder = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isConnected, sendMessage, initializeSocket } = useSocket();
  const { vehicles , isLoading } = useSelector(DataSelector);
  const {
    itemAddress,
    recipientAddress,
    pickItemsValues,
    setPickItemsValues,
    categoryId,
    subTypeId,
    vehicleId,
    userId
  } = useContext(GlobalContext);
  const [isNumber, setIsNumber] = useState(false);
  const [isDecription, setIsDecription] = useState(false);
  const [radiusMap, setRadiusMap] = useState(5000);
  useEffect(() => {
    dispatch(
      toggleModal({
        data: false,
      })
    );
  }, []);

  const inputRef = useRef();
  const inputDescription = useRef();

  useEffect(() => {
    if (isNumber) {
      inputRef.current.focus();
    }
  }, [isNumber]);

  useEffect(() => {
    if (isDecription) {
      inputDescription.current.focus();
    }
  }, [isDecription]);
  useEffect(() => {
    getTravelTime();
  }, [recipientAddress]);
  //   Estimate Drop Calc
  const getTravelTime = async () => {
    if (itemAddress !== undefined || recipientAddress !== undefined) {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${itemAddress?.description}&destinations=${recipientAddress?.description}&key=${GOOGLE_MAP_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("distance logs:::", data.rows[0].elements[0]);
          // setTravelTimeInformation(data.rows[0].elements[0]);
          setPickItemsValues({
            ...pickItemsValues,
            drop_off_address: recipientAddress.description,
            drop_off_lat: recipientAddress.details.lat.toFixed(2),
            drop_off_long: recipientAddress.details.lng.toFixed(2),
            estimated_drop_off_time: data.rows[0].elements[0].duration.text,
          });
        });
    }
  };

  
  const message = {
    type: "create.routine_errand",
    data: {
      category: categoryId,
      subtype: subTypeId,
      pick_up_lat: itemAddress.details.lat,
      pick_up_long: itemAddress.details.lng,
      pick_up_address: itemAddress.description,
      drop_off_address: recipientAddress.description,
      drop_off_lat: recipientAddress.details.lat,
      drop_off_long:  recipientAddress.details.lng,
      recipient_contact: "+234" + pickItemsValues.recipient_number,
      sendder_contact: "+234" + pickItemsValues.custodian_number,
      item_description: pickItemsValues.item_description,
      customer: userId,
      due_date: "2023-11-01T12:00:00Z",
      status: "REQUESTED",
      estimated_drop_off_time: pickItemsValues.estimated_drop_off_time,
      vehicle_type: vehicleId,
    },
  };
  const handleSubmit = () => {
    initializeSocket()
    sendMessage(message);
  }
  return (
    <View>
      <View className="bg-white shadow-2xl w-full min-h-[60vh] rounded-[10px]">
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: itemAddress ? parseFloat(itemAddress.details.lat) : 9.082,
            longitude: itemAddress
              ? parseFloat(itemAddress.details.lng)
              : 8.6753,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          provider={PROVIDER_GOOGLE}
          mapType={Platform.OS == "android" ? "none" : "standard"}
          followUserLocation={true}
          zoomEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: itemAddress
                ? parseFloat(itemAddress.details.lat)
                : 9.082,
              longitude: itemAddress
                ? parseFloat(itemAddress.details.lng)
                : 8.6753,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            image={require("../../../assets/location.png")}
          />
          <Circle
            center={{
              latitude: itemAddress
                ? parseFloat(itemAddress.details.lat)
                : 9.082,
              longitude: itemAddress
                ? parseFloat(itemAddress.details.lng)
                : 8.6753,
            }}
            radius={radiusMap}
            fillColor="#0066f52f"
            strokeWidth={1}
            strokeColor="#0066f52f"
          />
        </MapView>
      </View>
      <Modal
        visible={true}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className={`w-full min-h-[40vh] space-y-5 bg-white rounded-lg shadow-lg p-4`}>
              <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                <Text className="text-[20px] font-montserratSemiBold mb-2">
                  Errand's Summary
                </Text>
                <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                  <Text className="text-[14px] font-montserratSemiBold mb-2">
                    Pick up Summary
                  </Text>
                  <View className="py-3 flex-row item-center space-x-4">
                    <View>
                      <AnimatedLottieView
                        source={require("../../../assets/locator.json")}
                        autoPlay
                        loop
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                    <View className="h-[40px] w-[60%] flex justify-center">
                      <Text>{itemAddress.description}</Text>
                    </View>
                  </View>

                  <View className="py-3 flex-row item-center  space-x-4">
                    <View className="w-[40px] flex justify-center items-center">
                      <Feather name="phone-call" size={20} color="#0066ff" />
                    </View>
                    <View className="h-[40px] w-[60%] flex justify-center">
                      <Text>{"+234"+pickItemsValues.custodian_number}</Text>
                    </View>
                  </View>
                </View>

                <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                  <Text className="text-[14px] font-montserratSemiBold mb-2">
                    Drop off Summary
                  </Text>
                  <View className="py-3 flex-row item-center  space-x-4">
                    <View>
                      <AnimatedLottieView
                        source={require("../../../assets/locator.json")}
                        autoPlay
                        loop
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                    <View className="h-[40px] w-[60%] flex justify-center">
                      <Text>{recipientAddress.description}</Text>
                    </View>
                  </View>

                  <View className="py-3 flex-row item-center  space-x-4">
                    <View className="w-[40px] flex justify-center items-center">
                      <Feather name="phone-call" size={20} color="#0066ff" />
                    </View>
                    <View className="h-[40px] w-[60%] flex justify-center">
                      <Text>{"+234"+pickItemsValues.recipient_number}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <SquareButton
                  text={"Confirm"}
                  styles={{ backgroundColor: colors.primaryColor }}
                  onPress={handleSubmit}
                  loading={isLoading}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default CompletionOrder;
