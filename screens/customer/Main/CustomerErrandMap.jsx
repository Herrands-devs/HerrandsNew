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
import { useDispatch } from "react-redux";
import { toggleIsLoading } from "../../../reducers/dataReducer";

const { width, height } = Dimensions.get("window");

const CustomerErrandMap = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [agentAcceptedModal, setAgentAcceptedModal] = useState(false);
  const [trackErrandModal, setTrackErrandModal] = useState(false);
  const {
    rides,
    errandAccepted,
    setErrandAccepted,
    searchModal,
    setSearchModal,
    rideDetailsModal,
    setRideDetailsModal,
  } = useContext(GlobalContext);
  const [isModal, setModal] = useState({
    isRide  : true,
    isDetails : false,
    isNote : false,
    isTrack : false,

  })
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const seeDetails = () => {
    setModal({...isModal , isDetails : true, isRide : false})
  };

  const openAddNotes = () => {
    setModal({...isModal , isDetails : false, isNote : true})
  };

  const openDetails = () => {
    setModal({...isModal , isDetails : false, isNote : false})
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
  const trackErrand = () => {
    setTrackErrandModal(true);
    setAgentAcceptedModal(false);
  };


  useEffect(() => {
    if(searchModal) {
      setModal({
        isRide  : false,
        isDetails : false,
        isNote : false,
        isTrack : false,
      })
    }
    console.log('I am here', searchModal)
  },[searchModal])


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
          onPress={() => setModal({...isModal , isRide : true})}
        >
          <TouchableOpacity
            className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-[#F7F7F7] flex-row items-center justify-between px-[16px] py-[12px]`}
          onPress={() => setModal({...isModal , isRide : true})}
        >
          <View>
            <Text>See Available Vehicles</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Sidebar
        isOpen={isOpen}
        onClose={handleCloseSidebar}
        navigation={navigation}
      />
      <RidesModal
        isVisible={isModal.isRide}
        closeModal={() => setModal({...isModal , isRide : false})}
        navigation={navigation}
        rideList={rides}
        onPress={seeDetails}
      />
      <RideDetails
        isVisible={isModal.isDetails}
        closeModal={() => setModal({...isModal , isDetails : false})}
        onAddNote={openAddNotes}
        rideList={rides}
      />
      <RideAddNotes
        isVisible={isModal.isNote}
        closeModal={() => setModal({...isModal , isNote : false})}
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
