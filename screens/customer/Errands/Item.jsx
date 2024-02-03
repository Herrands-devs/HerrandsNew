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
  MaterialIcons,
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

const Item = ({ navigation }) => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector(DataSelector);
  const { itemAddress, pickItemsValues, setPickItemsValues } =
    useContext(GlobalContext);
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
    setPickItemsValues({
      ...pickItemsValues,
      pick_up_address: itemAddress.description,
      pick_up_lat: itemAddress.details.lat,
      pick_up_lng: itemAddress.details.lng,
    });
  }, [itemAddress]);

  useEffect(() => {
    console.log(pickItemsValues);
  }, [pickItemsValues]);

  const ToastMessage = ({ message }) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        "Field(s) can not be empty",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (Platform.OS === "ios") {
      ToastIOS.showWithGravity(
        "Field(s) can not be empty",
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
      isEmpty(pickItemsValues.custodian_number) &&
      isEmpty(pickItemsValues.item_description)
    ) {
      ToastMessage("Field(s) can not be empty");
    } else {
      setIsOpen(false);
      navigation.navigate("DropOff");
      ToastMessage("Request Sent Successfully");
    }
  };

  return (
    <View>
      <View className="bg-white shadow-2xl w-full min-h-[50vh] rounded-[10px]">
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
            <View
              className={`w-full space-y-5 bg-white relative bottom-0 rounded-lg shadow-lg p-4`}
            >
              <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                <Text className="text-[20px] font-montserratSemiBold mb-2">
                  Pick Up Information
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
                  <View className="h-[40px] w-[60%] flex justify-center">
                    <Text>{itemAddress.description}</Text>
                  </View>
                  <View className="h-[40px]   flex justify-center items-center">
                    <EvilIcons name="pencil" size={24} color="#0066ff" />
                  </View>
                </View>

                <View className="py-3 flex-row item-center justify-between">
                  <View className="w-[40px] flex justify-center items-center">
                    <Feather name="phone-call" size={20} color="#0066ff" />
                  </View>
                  <View className="h-[40px] w-[60%] flex justify-center">
                    <TextInput
                      ref={inputRef}
                      placeholder={"Enter Custodian's Phone Number"}
                      className="w-full"
                      maxLength={10}
                      keyboardType={"number-pad"}
                      value={pickItemsValues.custodian_number}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          custodian_number: text,
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
                  </View>
                  <View className="h-[40px]  flex justify-center items-center">
                    {!isEmpty(pickItemsValues.custodian_number) ? (
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

                <View className="py-3 flex-row item-center justify-between">
                  <View className="w-[40px] flex justify-center items-center">
                    <Octicons
                      name="package-dependencies"
                      size={20}
                      color="#0066ff"
                    />
                  </View>
                  <View className="h-[40px] w-[60%] flex justify-center">
                    <TextInput
                      ref={inputDescription}
                      placeholder="What's the item to pick up?"
                      className="w-full"
                      value={pickItemsValues.item_description}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          item_description: text,
                        })
                      }
                      onSubmitEditing={() => {
                        // This function will be called when the user presses the "Return" key
                        // You can update the state here or perform any other actions
                        console.log("Return key pressed");
                        // Example: Update the state
                        setIsDecription(false);
                        setIsNumber(false);
                      }}
                    />
                  </View>
                  <View className="h-[40px]   flex justify-center items-center">
                    {!isEmpty(pickItemsValues.item_description) ? (
                      <Pressable onPress={() => setIsDecription(true)}>
                        <EvilIcons name="pencil" size={24} color="#0066ff" />
                      </Pressable>
                    ) : (
                      <Pressable onPress={() => setIsDecription(true)}>
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
                  // onPress={() => {
                  //   setIsOpen(false);
                  //   navigation.navigate("DropOff");
                  // }}
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

export default Item;
