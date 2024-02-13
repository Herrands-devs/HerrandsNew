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
  ToastAndroid,
  ToastIOS
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

const DropOff = ({ navigation }) => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector(DataSelector);
  const {
    itemAddress,
    recipientAddress,
    pickItemsValues,
    setPickItemsValues,
    categoryId,
    subTypeId,
  } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(true);
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

  const ToastMessage = ( message ) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (Platform.OS === "ios") {
      ToastIOS.showWithGravity(
        message,
        ToastIOS.LONG,
        ToastIOS.TOP,
        25,
        50
      );
    } else {
      // For other platforms, you can customize or implement accordingly
      console.warn("Toast not implemented for this platform");
    }
  };

  const handleSubmit = () => {
    if (
      isEmpty(pickItemsValues.recipient_number) &&
      isEmpty(pickItemsValues.recipientAddress)
    ) {
      ToastMessage("Field(s) can not be empty");
    } else {
      setIsOpen(false);
      navigation.navigate("CompletionOrder");
      ToastMessage("Request Sent Successfully");
    }
  };

  useEffect(() => {
    console.log(subTypeId);
  }, [pickItemsValues]);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal
          visible={isOpen}
          animationType="slide"
          transparent={true}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
        >
          <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
            <View className="w-full space-y-5 bg-white  relative bottom-0 rounded-lg shadow-lg p-4">
              <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                <Text className="text-[20px] font-montserratSemiBold mb-2">
                  Drop off
                </Text>
                <View className="py-3 flex-row item-center justify-between space-x-2">
                  <View>
                    <AnimatedLottieView
                      source={require("../../../assets/locator.json")}
                      autoPlay
                      loop
                      style={{ width: 40, height: 40 }}
                    />
                  </View>
                  <View className="w-[60%] flex justify-center">
                    <Text>
                      {isEmpty(recipientAddress)
                        ? "Select Address to drop off"
                        : recipientAddress.description}
                    </Text>
                  </View>
                  <View className="flex justify-center items-center">
                    {!isEmpty(pickItemsValues.drop_off_address) ? (
                      <Pressable
                        onPress={() =>
                          navigation.navigate("SelectAddress", { type: "drop" })
                        }
                      >
                        <EvilIcons name="pencil" size={24} color="#0066ff" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate("SelectAddress", { type: "drop" })
                        }
                      >
                        <AntDesign name="plus" size={24} color="#0066ff" />
                      </Pressable>
                    )}
                  </View>
                </View>

                <View className="py-3 flex-row item-center justify-between">
                  <View className="w-[40px] flex justify-center items-center">
                    <Feather name="phone-call" size={20} color="#0066ff" />
                  </View>
                  <View className="h-[40px] w-[60%] flex justify-center">
                    {!isNumber ? (
                      <Text>
                        {!isEmpty(pickItemsValues.recipient_number)
                          ? pickItemsValues.recipient_number
                          : "Enter Recipient's Phone Number"}
                      </Text>
                    ) : (
                      <TextInput
                        ref={inputRef}
                        className="w-full"
                        maxLength={10}
                        keyboardType={"number-pad"}
                        value={pickItemsValues.recipient_number}
                        onChangeText={(text) =>
                          setPickItemsValues({
                            ...pickItemsValues,
                            recipient_number: text,
                          })
                        }
                        onSubmitEditing={() => {
                          // This function will be called when the user presses the "Return" key
                          // You can update the state here or perform any other actions
                          console.log("Return key pressed");
                          // Example: Update the state
                          setIsNumber(false);
                          setIsDecription(false);
                        }}
                      />
                    )}
                  </View>
                  <View className="h-[40px]  flex justify-center items-center">
                    {!isEmpty(pickItemsValues.recipient_number) ? (
                      <Pressable onPress={() => setIsNumber(true)}>
                        <EvilIcons name="pencil" size={24} color="#0066ff" />
                      </Pressable>
                    ) : (
                      <Pressable onPress={() => setIsNumber(true)}>
                        <AntDesign name="plus" size={24} color="#0066ff" />
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
              <View>
                <SquareButton
                  text={"Continue"}
                  styles={{ backgroundColor: colors.primaryColor }}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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

export default DropOff;
