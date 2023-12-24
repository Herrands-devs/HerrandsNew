import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import Map from "../../components/Map/Map";
import { Dimensions } from "react-native";
import Hamburger from "../../../assets/icons/black-hamburger.png";
import Sidebar from "../../components/customer-home-screen/Sidebar";
import { useState } from "react";
import Van from "../../../assets/icons/van.png";
import VanIcon from "../../../assets/icons/van-icon.png";
import Car from "../../../assets/icons/car.png";
import { formatCurrency } from "../../../helpers/CurrencyFormatter";
import {
  AgentAcceptedModal,
  RideAddNotes,
  RideDetails,
  RidesModal,
  SearchinAgentModal,
  TrackErrandModal,
} from "../../components/common/Modals";
import Loading from "../../components/common/Loading";
import { GlobalContext } from "../../../context/context.store";

const { width, height } = Dimensions.get("window");

const CustomerErrandMap = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [addNotesModal, setAddNotesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [searchModal, setSearchModal] = useState(false);
  const [agentAcceptedModal, setAgentAcceptedModal] = useState(false);
  const [trackErrandModal, setTrackErrandModal] = useState(false);
  const {
    rides,
    errandAccepted,
    setErrandAccepted,
    createErrandSent,
    searchModal,
    setSearchModal,
    rideDetailsModal,
    setRideDetailsModal,
  } = useContext(GlobalContext);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const seeDetails = () => {
    setIsModal(false);
    setDetailsModal(true);
  };

  const openAddNotes = () => {
    setDetailsModal(false);
    setAddNotesModal(true);
  };

  const openDetails = () => {
    setAddNotesModal(false);
    setDetailsModal(true);
  };

  const confirmOrder = () => {
    setDetailsModal(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSearchModal(true);
    }, 3000);
  };

  useEffect(() => {
    console.log("errand accepted:::", errandAccepted);
  }, [errandAccepted]);

  useEffect(() => {
    if (errandAccepted) {
      setSearchModal(!searchModal);
      setAgentAcceptedModal(true);
      setErrandAccepted(false);
    }
    console.log("errand accepted:::", errandAccepted);
  }, [errandAccepted]);

  // const openAcceptedModal = () => {
  //   setSearchModal(true);

  //   setTimeout(() => {
  //     setSearchModal(false);
  //     setAgentAcceptedModal(true);
  //   }, 3000);
  // };

  const trackErrand = () => {
    setTrackErrandModal(true);
    setAgentAcceptedModal(false);
  };

  useEffect(() => {
    console.log("rides:::", rides);
    setIsModal(true);
  }, [rides]);

  return (
    <View>
      <View className={``} style={{ height: height * 0.8 }}>
        <Map />
      </View>
      <View
        className={`absolute top-[60px] left-[30px] bg-white py-[2px] px-[3px] rounded-full`}
      >
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Image source={Hamburger} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
      </View>

      <View style={{ height: height * 0.3 }} className={`bg-white`}>
        <TouchableOpacity
          className={`py-[8px] flex-row justify-center`}
          onPress={() => setIsModal(true)}
        >
          <TouchableOpacity
            className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-[#F7F7F7] flex-row items-center justify-between px-[16px] py-[12px]`}
          onPress={() => setIsModal(true)}
        >
          {/* <View className={`flex-row items-center space-x-[33px]`}>
            <Image source={rides.image} className={`w-[30px] h-[14px]`} />
            <View>
              {rides.icon ? (
                <View className={`flex-row items-center space-x-2`}>
                  <Text className={`font-montserratSemiBold text-[14px]`}>
                    {rides.title}
                  </Text>
                  <Image source={rides.icon} className={`w-[12px] h-[12px]`} />
                </View>
              ) : (
                <Text className={`font-montserratSemiBold text-[14px]`}>
                  {rides.title}
                </Text>
              )}
              <Text className={`text-[8px] font-montserratMedium`}>
                {rides.time}
              </Text>
            </View>
          </View> */}
          <View>
            <Text>See Available Vehicles</Text>
          </View>

          {/* <View>
            <Text className={`text-[16px] font-montserratBold`}>
              {formatCurrency(rides.amount)}
            </Text>
          </View> */}
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
      <Sidebar
        isOpen={isOpen}
        onClose={handleCloseSidebar}
        navigation={navigation}
      />
      <RidesModal
        isVisible={isModal}
        closeModal={() => setIsModal(false)}
        navigation={navigation}
        rideList={rides}
        onPress={seeDetails}
      />
      <RideDetails
        isVisible={detailsModal}
        closeModal={() => setDetailsModal(false)}
        onAddNote={openAddNotes}
        onPress={confirmOrder}
        rideList={rides}
      />
      <RideAddNotes
        isVisible={addNotesModal}
        closeModal={() => setAddNotesModal(false)}
        openDetails={openDetails}
      />
      <SearchinAgentModal
        isVisible={searchModal}
        closeModal={() => setSearchModal(false)}
      />
      <AgentAcceptedModal
        isVisible={rideDetailsModal}
        closeModal={() => setRideDetailsModal(false)}
        onPress={trackErrand}
        navigation={navigation}
      />
      <TrackErrandModal
        isVisible={trackErrandModal}
        closeModal={() => setTrackErrandModal(false)}
        navigation={navigation}
      />
    </View>
  );
};

export default CustomerErrandMap;

const styles = StyleSheet.create({});
