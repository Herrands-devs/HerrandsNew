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
import { SearchinAgentModal } from "../../components/common/Modals";
import useSocket from "../../../helpers/socket.service";

const Note = ({ navigation }) => {
  const dispatch = useDispatch();
  const { rides, addNote, itemAddress, setAddNote , searchModal, setSearchModal } = useContext(GlobalContext);
  const [notes, setNotes] = useState("");
  const [radiusMap, setRadiusMap] = useState(5000);
  const { isConnected, sendMessage, initializeSocket } = useSocket();

  const message = {
    type: "complete.routine_errand",
    data: {
      id: rides.errand_id,
      describe_errand: addNote,
    },
  };

  const completeErrandCreation = async () => {
    initializeSocket()
    sendMessage(message);
    console.log("main message sent...", message);
    setSearchModal(true);
  };
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
          visible={true}
          animationType="slide"
          transparent={true}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
        >
          <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
            <View
              className={`w-full min-h-[40vh] space-y-5 bg-white rounded-lg shadow-lg p-4`}
            >
              <View className="relative border flex-col  justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
                <Text className="text-[14px] font-montserratSemiBold mb-2">
                  Arrival time {rides?.estimated_drop_off_time}
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
                    <Text>{itemAddress?.description}</Text>
                  </View>
                </View>
                <View className="flex-row justify-between my-4">
                  <Text className="font-montserratBold">Total Cost</Text>
                  <Text className="font-montserratBold text-[18px]">₦{rides?.total_cost}</Text>
                </View>

                <View className="bg-white my-2">
                  <TextInput
                    multiline={true}
                    numberOfLines={3}
                    className={`min-h-[50px] w-[100%] px-2 pb-4 rounded-[4px] text-[14px] font-montserratMedium`}
                    value={notes}
                    onChangeText={(text) => {
                      setNotes(text);
                      setAddNote(text);
                    }}
                  />
                </View>
                <Text className="text-[#8e8e8e] font-montserratRegular text-[12px]">
                  Add a note for a smoother pick-up and delivery
                </Text>
              </View>
              <View>
                <SquareButton
                  text={"Search Agent"}
                  styles={{ backgroundColor: colors.primaryColor }}
                  onPress={completeErrandCreation}
                />
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      <SearchinAgentModal isVisible={searchModal}  />
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

export default Note;
