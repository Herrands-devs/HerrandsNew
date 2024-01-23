import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import Hamburger from "../../../assets/icons/hamburger.png";
import Sidebar from "../../components/customer-home-screen/Sidebar";
import { DropDownPicker } from "../../components/common/Dropdown";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import useSocket from "../../../helpers/socket.service";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { connectToSocket, fetchAllSubCategories, fetchCategoriesAction, fetchVehicleTypes } from "../../../helpers/fetchData";
import { toggleIsSocketConnected } from "../../../reducers/dataReducer";

const CustomerHome = ({ navigation }) => {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected , fetchToken } = useSocket();
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch()
  useEffect(() => {
    fetchCategoriesAction(dispatch)
    fetchAllSubCategories(dispatch)
    fetchVehicleTypes(dispatch)
    fetchToken()
    if(isConnected) {
      dispatch(toggleIsSocketConnected({
        data : isConnected
      }))
      console.log("Heyy, This is socker", isConnected);
    }
  },[]);


  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await videoRef.current.loadAsync(
        require("../../../assets/illustration.mp4")
      );
      await videoRef.current.playAsync();
    })();
  }, []);

  return (
    <View className={`flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Video
          ref={videoRef}
          source={require("../../../assets/illustration.mp4")}
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          // keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <View
            className={`absolute bottom-0 top-0 left-0 right-0 bg-[#0000009f]`}
          />

          <View
            className={`absolute px-3`}
            style={{
              bottom:
                Platform.OS === "android" ? insets.bottom + 20 : insets.bottom,
            }}
          >
            <Text
              className={`text-white font-montserratSemiBold ${Platform.OS == 'ios' ? 'text-[16px]' : 'text-[12px]'}  text-center`}
            >
              Send your errands in minutes and enjoy more quality
              time in your day.
            </Text>

            <View className={`flex-row justify-center mt-[35px]`}>
              <SquareButton
                text={"Let's go"}
                styles={{ backgroundColor: colors.primaryColor, width: "100%" }}
                onPress={() => navigation.navigate("CustomerCreateErrand")}
              />
            </View>
          </View>

          {/* <View
            className={`absolute bottom-0 bg-white w-full px-[16px] pt-[8.5px] pb-[120px]`}
          >
            <Text className={`text-[16px] font-montserratBold`}>
              Where are you going???
            </Text>

            <View className={`z-10 mt-[8px]`}>
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    fontSize: 16,
                    backgroundColor: "#F7F7F7",
                  },
                }}
                query={{
                  key: GOOGLE_MAP_APIKEY,
                  language: "en",
                }}
                minLength={3}
                onPress={(data, details = null) => {
                  // setOrigin({
                  //   location: details.geometry.location,
                  //   description: data.description,
                  // });
                  // setDestination(null);
                  console.log("location:::", details.geometry.location);
                  console.log("description:::", data.description);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                placeholder="Select your city"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={200}
              />
            </View>

            <View className={`mt-[28px]`}>
              <SquareButton
                text={"Let's go"}
                styles={{ backgroundColor: colors.primaryColor, width: "100%" }}
                onPress={() => navigation.navigate("CustomerCreateErrand")}
              />
            </View>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
              // handleButtonClick();
              // sendMessage(message);
            }}
            
          >
            <Image
              source={Hamburger}
              className={`w-[24px] h-[24px] fixed ${Platform.OS == 'ios' ?  'mt-[60px] ml-[30px]' : 'mt-[20px] ml-[15px]'} `}
            />
          </TouchableOpacity>
          <Sidebar
            isOpen={isOpen}
            onClose={handleCloseSidebar}
            navigation={navigation}
          />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
