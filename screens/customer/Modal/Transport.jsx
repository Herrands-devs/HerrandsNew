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
 import Hamburger from "../../../../assets/icons/hamburger.png";
 import Sidebar from "../../../components/customer-home-screen/Sidebar";
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

const Transport = ({ isOpen }) => {
  return (
    <View>
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <View className="w-full h-[25vh] space-y-5 bg-white rounded-lg shadow-lg p-4">
            <View className="relative border flex-row items-center justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
              <View>
                <Image
                  source={getImageSource(selectTransport)}
                  className="w-[30px] h-[30px]"
                />
              </View>
              <View>
                <Text className="text-[18px] font-montserratRegular">
                  Selected {selectTransport}
                </Text>
              </View>

              <View className="">
                <TouchableOpacity
                  text={"Change Method"}
                  onPress={() => setIsOpen(false)}
                >
                  <Text
                    className={
                      "text-[16px] font-montserratRegular text-[#0066ff]"
                    }
                  >
                    Change Method
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="absolute -top-4 -right-2 z-30">
                <AntDesign name="checkcircle" size={24} color="#0066ff" />
              </View>
            </View>
            <View>
              <SquareButton
                text={"Continue"}
                styles={{ backgroundColor: colors.primaryColor }}
                onPress={() => {
                  navigation.navigate("Item");
                  setIsOpen(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({});

export default Transport;
