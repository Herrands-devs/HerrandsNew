import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import { useDispatch, useSelector } from "react-redux";
import { DataSelector, toggleModal } from "../../../reducers/dataReducer";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../../../context/context.store";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import Lottie from 'lottie-react-native';
import Location from "../Modal/Location";

const Transport = ({ navigation }) => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector(DataSelector);
  const { vehicleType, setVehicleId, selectedCategory , itemAddress } =
    useContext(GlobalContext);
  const [selectTransport, setSelectTransport] = useState();
  const [isOpen, setIsOpen] = useState({
    transport : false,
    location_item : false,
    select_location : false
  });
  useEffect(() => {
    dispatch(
      toggleModal({
        data: false,
      })
    );
  }, []);

  useEffect(() => {
    console.log(itemAddress);
  },[itemAddress])
 
  const getImageSource = (vehicleType) => {
    switch (vehicleType) {
      case "car":
        return require(`../../../assets/car.png`);
        break;
      case "bike":
        return require(`../../../assets/bike.png`);
        break;
      case "someone":
        return require(`../../../assets/someone.png`);
        break;
      // Add cases for other vehicle types as needed
      default:
        return require(`../../../assets/car.png`); // Provide a default image
    }
  };
  return (
    <SafeAreaComponent>
      <View>
        <View className="flex-row items-center space-x-[30px]">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch(
                toggleModal({
                  data: true,
                })
              );
            }}
            className={`${
              Platform.OS == "ios" ? "ml-[20px]" : "ml-[10px] "
            }  z-20`}
          >
            <Image
              source={require("../../../assets/icons/back-icon-black.png")}
              className={`w-[24px] h-[24px]`}
            />
          </TouchableOpacity>
          <View>
            <Text className="text-[20px]">Select Preferred Transport</Text>
          </View>
        </View>

        <View className="flex-row justify-around flex-wrap pt-10">
          {vehicles &&
            vehicles?.map((item, index) => {
              const imagePath = getImageSource(item.vehicle_type);
              return (
                <TouchableOpacity
                  onPress={() => {
                    setVehicleId(item.id);
                    setIsOpen({...isOpen , transport : true });
                    setSelectTransport(item.vehicle_type);
                  }}
                  key={index}
                  className="rounded-md shadow-lg my-5 bg-[#ebeaea] flex justify-center items-center w-[160px] h-[160px]"
                >
                  <View className="flex justify-center items-center">
                    <Image source={imagePath} className="w-[74px] h-[74px]" />
                    <View>
                      <Text className="text-[14px] text-center mt-2">
                        Send {item.vehicle_type}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>

      <Modal
        visible={isOpen.transport}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <View className={`w-full min-h-[25vh] space-y-5 bg-white rounded-lg shadow-lg p-4`}>
            <View className="relative border flex-row items-center justify-between border-[#0066ff] bg-[#0066ff15] py-8 mt-3 px-4 rounded-2xl">
              <View>
                <Image
                  source={getImageSource(selectTransport)}
                  className="w-[30px] h-[30px]"
                />
              </View>
              <View>
                <Text className="font-montserratRegular">
                  Selected {selectTransport}
                </Text>
              </View>

              <View className="">
                <TouchableOpacity
                  text={"Change Method"}
                  onPress={() => setIsOpen({...isOpen , transport : false})}
                >
                  <Text
                    className={
                      "font-montserratRegular text-[#0066ff]"
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
                  setIsOpen({...isOpen , transport : false , location_item : true});
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isOpen.location_item}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <View className="w-full min-h-[40vh] space-y-5 bg-white rounded-lg shadow-lg p-4">
            <View className="relative flex items-center justify-center w-full  py-8 mt-3 px-4 rounded-6xl">
              <Lottie
                source={require("../../../assets/locator.json")}
                autoPlay
                loop
                style={{ width : 150 , height: 150 }}
              />
              <Text className="font-montserratRegular text-[20px]">Item's Location</Text>
            </View>
            <View>
              <SquareButton
                text={"Add"}
                styles={{ backgroundColor: colors.primaryColor }}
                onPress={() => {
                  navigation.navigate("SelectAddress" , {type : 'item'});
                  setIsOpen({...isOpen , transport : false , location_item : false , select_location : false});
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaComponent>
  );
};

const styles = StyleSheet.create({});

export default Transport;
