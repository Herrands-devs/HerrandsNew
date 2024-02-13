import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
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
import {
  connectToSocket,
  fetchAllSubCategories,
  fetchCategoriesAction,
  fetchVehicleTypes,
} from "../../../helpers/fetchData";
import  { DataSelector, toggleIsSocketConnected, toggleModal } from "../../../reducers/dataReducer";
import { AntDesign } from "@expo/vector-icons";
import CategoryButton from "../../components/customer-home-screen/CategoryButton";

const CustomerHome = ({ navigation }) => {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const {isModal} = useSelector(DataSelector)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      toggleModal({
        data: true,
      })
    );
  },[])

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

  const [modalHeight, setModalHeight] = useState(false);

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
      </KeyboardAvoidingView>
      <Modal
        visible={isModal}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
              // handleButtonClick();
              // sendMessage(message);
            }}
            className={`p-2 flex justify-center items-center absolute bg-white shadow-lg rounded-full top-0  ${
              Platform.OS == "ios"
                ? "mt-[60px] ml-[30px]"
                : "mt-[20px] ml-[15px]"
            } `}
          >
            <AntDesign name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Sidebar
            isOpen={isOpen}
            onClose={handleCloseSidebar}
            navigation={navigation}
          />
          <View
            className={`absolute px-5 pt-10 ${Platform.OS == 'ios' ? 'min-h-[15vh]' : 'min-h-[20vh]'}  bg-white shadow-xl w-full rounded-t-3xl flex space-y-[20px]`}
          >
            <View>
              <TouchableOpacity
                onPress={() => setModalHeight(!modalHeight)}
                className="h-[48px] w-full flex-row space-x-[10px] items-center px-2 bg-[#ebeaea] rounded-md shadow-sm"
              >
                <View className="min-w-[30px] flex-row justify-center items-center h-[30px] rounded-full bg-white">
                  <AntDesign name="search1" size={15} color="black" />
                </View>
                <View>
                  <Text className={`${Platform.OS === 'ios' ? 'text-[16px]' : 'text-[13px]'} font-montserratMedium`}>
                    What errand are you runnung today ?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {modalHeight && (
              <CategoryButton />
            )}
          </View>
        </View>
      </Modal>
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
