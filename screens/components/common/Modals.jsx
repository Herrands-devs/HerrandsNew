import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  Image,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import ResendClose from "../../../assets/icons/resend-close.png";
import BySms from "../../../assets/icons/by-sms-icon.png";
import ByCall from "../../../assets/icons/by-call-icon.png";
import EditNumber from "../../../assets/icons/edit-number-icon.png";
import {
  formatCurrency,
  shortenString,
} from "../../../helpers/CurrencyFormatter";
import { RoundedButton } from "./Button";
import { colors } from "../../../themes/colors";
import { useState } from "react";
import LocationIcon from "../../../assets/icons/location-icon.png";
import AddNoteIcon from "../../../assets/icons/add-note.png";
import DetailsIcon from "../../../assets/icons/details.png";
import HorizontalLoader from "./HorizontalLoader";
import AgentImage from "../../../assets/agent-image.png";
import { useContext } from "react";
import { GlobalContext, GlobalProvider } from "../../../context/context.store";
import ErrandProgressComp from "./ErrandProgressComp";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Van from "../../../assets/icons/van.png";
import Car from "../../../assets/icons/car.png";

import { GOOGLE_MAP_APIKEY } from "@env";
import { Keyboard } from "react-native";
import useSocket from "../../../helpers/socket.service";
import AnimatedLoader from "react-native-animated-loader";
import { useDispatch, useSelector } from "react-redux";
import { DataSelector, toggleIsLoading } from "../../../reducers/dataReducer";
import InfiniteLoader from "./InfiniteLoader";

export const ResendModal = ({
  isVisible,
  closeModal,
  navigation,
  resendAction,
  contact,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 280,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.modalContent}>
            <View
              className={`flex-row items-center w-full justify-between px-[10px]`}
            >
              <Text
                className={`tet-[16px] font-montserratSemiBold text-subTitle`}
              >
                Resend Code to
              </Text>
              <TouchableOpacity onPress={slideDown}>
                <Image source={ResendClose} className={`w-[16px] h-[16px]`} />
              </TouchableOpacity>
            </View>
            <View
              className={`flex-row items-center w-full justify-between px-[10px] mt-[20px]`}
            >
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                {contact}
              </Text>
            </View>
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2`}
              onPress={resendAction}
            >
              <Image source={BySms} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Resend code by SMS
              </Text>
            </TouchableOpacity>
            <View className={`w-full h-[1px] bg-[#ccc] my-[11px]`} />
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2`}
            >
              <Image source={ByCall} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Request call back
              </Text>
            </TouchableOpacity>
            <View className={`w-full h-[1px] bg-[#ccc] my-[11px]`} />
            <TouchableOpacity
              className={`flex-row items-center w-full px-[10px] mt-[20px] space-x-2 mb-[11px]`}
              onPress={() => {
                slideDown();
                navigation.navigate("EnterYourNumber");
              }}
            >
              <Image source={EditNumber} className={`w-[16px] h-[16px]`} />
              <Text className={`tet-[16px] font-montserratBold text-subTitle`}>
                Edit phone number
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export const RidesModal = ({
  isVisible,
  closeModal,
  navigation,
  rideList,
  onPress,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(0);
  // console.log("ride list:::", rideList);

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 360,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={styles.ridesOverlay}>
          <Animated.View
            style={[
              styles.ridesModal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>
            {/* <View style={styles.modalContent}>
              {rideList.map((ride, i) => (
                <TouchableOpacity
                  key={i}
                  className={`${
                    selectedItem === ride.id ? `bg-[#CCE0FD]` : `bg-[#F7F7F7]`
                  }  flex-row items-center justify-between px-[16px] py-[16px]`}
                  onPress={() => {
                    selectRide(ride.id);
                  }}
                >
                  <View className={`flex-row items-center space-x-[33px]`}>
                    <Image
                      source={ride.image}
                      className={`w-[30px] h-[14px]`}
                    />
                    <View>
                      {ride.icon ? (
                        <View className={`flex-row items-center space-x-2`}>
                          <Text
                            className={`font-montserratSemiBold text-[14px]`}
                          >
                            {ride.title}
                          </Text>
                          <Image
                            source={ride.icon}
                            className={`w-[12px] h-[12px]`}
                          />
                        </View>
                      ) : (
                        <Text className={`font-montserratSemiBold text-[14px]`}>
                          {ride.title}
                        </Text>
                      )}
                      <Text className={`text-[8px] font-montserratMedium`}>
                        {ride.time}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className={`text-[16px] font-montserratBold`}>
                      {formatCurrency(ride.amount)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View className={`items-center`}>
                <RoundedButton
                  text={"Send Now"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    width: "80%",
                    marginVertical: 11,
                  }}
                  onPress={onPress}
                />
              </View>
            </View> */}
            <View style={styles.modalContent}>
              <TouchableOpacity
                className={`${
                  selectedItem === rideList.vehicleDetails?.id
                    ? `bg-[#CCE0FD]`
                    : `bg-[#F7F7F7]`
                }  flex-row items-center justify-between px-[16px] py-[16px]`}
                onPress={() => {
                  selectRide(rideList.vehicleDetails?.id);
                }}
              >
                <View className={`flex-row items-center space-x-[33px]`}>
                  {rideList.vehicleDetails?.vehicle_type === "van" ? (
                    <Image source={Van} className={`w-[30px] h-[14px]`} />
                  ) : rideList.vehicleDetails?.vehicle_type === "car" ? (
                    <Image source={Car} className={`w-[30px] h-[14px]`} />
                  ) : null}
                  <View>
                    {rideList.vehicleDetails?.icon ? (
                      <View className={`flex-row items-center space-x-2`}>
                        <Text className={`font-montserratSemiBold text-[14px]`}>
                          Send {rideList.vehicleDetails?.vehicle_type}
                        </Text>
                        <Image
                          source={rideList.vehicleDetails?.icon}
                          className={`w-[12px] h-[12px]`}
                        />
                      </View>
                    ) : (
                      <Text className={`font-montserratSemiBold text-[14px]`}>
                        Send {rideList.vehicleDetails?.vehicle_type}
                      </Text>
                    )}
                    <Text className={`text-[8px] font-montserratMedium`}>
                      {rideList.estimated_drop_off_time}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className={`text-[16px] font-montserratBold`}>
                    {formatCurrency(rideList.vehicleDetails?.cost)}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className={`items-center`}>
                <RoundedButton
                  text={"Send Now"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    width: "80%",
                    marginVertical: 20,
                  }}
                  onPress={onPress}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const RideDetails = ({
  isVisible,
  closeModal,
  navigation,
  rideList,
  onAddNote,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(0);
  const { addNote ,setSearchModal} = useContext(GlobalContext);
  const { isLoading }  = useSelector(DataSelector)
  const { sendMessage } = useSocket()
  const dispatch = useDispatch();

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const message = {
    type: "complete.routine_errand",
    data: {
      id: rideList.errand_id,
      describe_errand: addNote,
    },
  };

  const completeErrandCreation = async () => {
    sendMessage(message);
    console.log("main message sent...", message);
    setSearchModal(true);
    setTimeout(() => {
      dispatch(toggleIsLoading({
        data : false
      }))
      setSearchModal(true);
    }, 3000);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={styles.ridesOverlay}>
          <Animated.View
            style={[
              styles.ridesModal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>
            <View style={styles.modalContent}>
              <View
                className={`flex-row items-center px-[16px] justify-between mb-[20px]`}
              >
                <Text className={`font-montserratRegular text-[16px]`}>
                  Final Address
                </Text>
              </View>
              <View
                className={`flex-row w-[100%] items-center px-[16px] justify-between`}
              >
                <Text className={`text-[18px] w-[90%] font-montserratBold`}>
                  {rideList?.drop_off_address}
                </Text>
                <Image source={LocationIcon} className={`w-[24px] h-[24px]`} />
              </View>
              <View className={`px-[16px] my-[20px]`}>
                <Text className={`text-[16px] font-montserratSemiBold`}>
                  {formatCurrency(rideList.vehicleDetails?.cost)}
                </Text>
              </View>
              <View className={`px-[16px]`}>
                <TouchableOpacity
                  className={`bg-[#D5D7DA] flex-row items-center py-[13px] px-[16px] space-x-4`}
                  onPress={onAddNote}
                >
                  <Image source={AddNoteIcon} className={`w-[24px] h-[24px]`} />
                  <Text className={`text-[14px] font-montserratMedium`}>
                    Add note for agent (optional)
                  </Text>
                </TouchableOpacity>
              </View>
              <View className={`items-center `}>
                <RoundedButton
                  text={"Confirm order"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    width: "80%",
                    marginVertical: 11,
                  }}
                  onPress={completeErrandCreation}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <LoadingModal isVisible={isLoading} />
    </Modal>
  );
};

export const RideAddNotes = ({
  isVisible,
  closeModal,
  onPress,
  openDetails,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(0);
  const [notes, setNotes] = useState("");
  const { setAddNote } = useContext(GlobalContext);

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={styles.ridesOverlay}>
          <Animated.View
            style={[
              styles.ridesModal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>
            <View style={styles.modalContent}>
              <View
                className={`flex-row items-center px-[16px] justify-between`}
              >
                <Text className={`text-[20px] font-montserratSemiBold`}>
                  Pick-up note
                </Text>
                <Text className={`text-[16px] font-montserratRegular`}>
                  0/100
                </Text>
              </View>

              <View className={`px-[16px] my-[40px]`}>
                <View
                  className={`border border-primaryColor h-[104px] rounded-[4px]`}
                >
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    className={`h-[100%] w-[100%] rounded-[4px] p-[16px] text-[16px] font-montserratMedium`}
                    placeholder="Add a note for a smoother pick-up and delivery"
                    value={notes}
                    onChangeText={(text) => {
                      setNotes(text);
                      setAddNote(text);
                    }}
                  />
                </View>
              </View>
              <View className={`items-center `}>
                <RoundedButton
                  text={"Add note"}
                  styles={{
                    backgroundColor: colors.primaryColor,
                    width: "80%",
                    marginVertical: 11,
                  }}
                  onPress={openDetails}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const SearchinAgentModal = ({
  isVisible,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(0);

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback>
      <View style={[styles.ridesOverlay, { alignItems: "center" }]}>
          <Animated.View
            style={[
              styles.loadModal,
              {
                transform: [{ translateY }],
              },
            ]}
            className="px-6 relative bottom-0 h-[65%]"
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>
            <View style={styles.modalContent}>
              <View className={``}>
                <Text
                  className={`text-[20px] font-montserratSemiBold text-center`}
                >
                  Connecting to an agent
                </Text>
                <Text
                  className={`text-center font-montserratRegular text-[14px] text-subTitle mt-[8px]`}
                >
                  Your agent will be on their way as soon as they confirm.
                </Text>
              </View>

              <View className={`mb-[17px] mt-[50px]`}>
                <InfiniteLoader />
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const AgentAcceptedModal = ({
  isVisible,
  closeModal,
  onPress,
  openDetails,
  navigation,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(0);
  const { agentInfo, errandId } = useContext(GlobalContext);

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  console.log("Agent info:::", agentInfo, errandId);

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={styles.ridesOverlay}>
          <Animated.View
            style={[
              styles.ridesModal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>
            <View style={styles.modalContent}>
              <View className={``}>
                <Text
                  className={`text-[24px] font-montserratSemiBold text-center`}
                >
                  Picking parcel up in 6mins.
                </Text>

                <View
                  className={`flex-row px-[34px] justify-between mt-[50px]`}
                >
                  <View>
                    <Image
                      source={AgentImage}
                      className={`w-[64px] h-[64px]`}
                    />
                    <Text
                      className={`text-center text-[12px] font-montserratSemiBold`}
                    >
                      {agentInfo.first_name}
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      className={`bg-[#ccc] w-[64px] h-[64px] rounded-full justify-center items-center`}
                      onPress={() => {
                        navigation.navigate("ChatScreen");
                        slideDown();
                      }}
                    >
                      <Image
                        source={AddNoteIcon}
                        className={`w-[24px] h-[24px]`}
                      />
                    </TouchableOpacity>
                    <Text
                      className={`text-center text-[12px] font-montserratSemiBold`}
                    >
                      Chat
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      className={`bg-[#ccc] w-[64px] h-[64px] rounded-full justify-center items-center`}
                    >
                      <Image
                        source={DetailsIcon}
                        className={`w-[24px] h-[24px]`}
                      />
                    </TouchableOpacity>
                    <Text
                      className={`text-center text-[12px] font-montserratSemiBold`}
                    >
                      Details
                    </Text>
                  </View>
                </View>

                <View className={`px-[34px] mt-[16px]`}>
                  <RoundedButton
                    text={"Track my erand"}
                    styles={{ backgroundColor: colors.primaryColor }}
                    onPress={onPress}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const TrackErrandModal = ({
  isVisible,
  closeModal,
  onPress,
  openDetails,
  navigation,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { errandStates } = useContext(GlobalContext);

  useEffect(() => {
    if (errandStates.delivered === "completed")
      navigation.navigate("ErrandCompleteRate");
  }, [errandStates.delivered]);

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={styles.ridesOverlay}>
          <Animated.View
            style={[
              styles.ridesModal,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View className={`items-center pt-[8px] pb-[22px]`}>
              <TouchableOpacity
                className={`w-[78px] h-[10px] bg-[#C6C6C6] rounded-[4px]`}
              />
            </View>

            <ErrandProgressComp />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const LoadingModal = ({ isVisible, closeModal }) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 300,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    }
  }, [isVisible]);
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
    >
      <TouchableWithoutFeedback>
        <View style={[styles.ridesOverlay, { alignItems: "center" }]}>
          <Animated.View
            style={[
              {
                transform: [{ translateY }],
              },
            ]}
            className="h-[50%]"
          >
            <View>
              <AnimatedLoader
                visible={true}
                overlayColor="rgba(0,0,0,0.1)"
                source={require("../../../assets/loader.json")}
                animationStyle={styles.lottie}
                speed={2}
              >
              </AnimatedLoader>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const SuccessErrorModal = ({
  isVisible,
  closeModal,
  onPress,
  openDetails,
  navigation,
  message,
  image,
  title,
  btnTxet,
}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { errandStates } = useContext(GlobalContext);

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      closeModal();
    });
  };

  useEffect(() => {
    if (isVisible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={slideDown}
    >
      <TouchableWithoutFeedback onPress={slideDown}>
        <View style={[styles.ridesOverlay, { alignItems: "center" }]}>
          <Animated.View
            style={[
              {
                transform: [{ translateY }],
                width: "80%",
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: "white",
                paddingVertical: 32,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View>
              <View className={`flex-row justify-center`}>
                <Image source={image} className={`w-[44px] h-[44px]`} />
              </View>
              <Text
                className={`text-[24px] font-montserratSemiBold text-center mt-[16px]`}
              >
                {title}
              </Text>
              <View className={`flex-row justify-center mt-[10px]`}>
                <Text
                  className={`text-[14px] font-montserratRegular text-center max-w-[90%]`}
                >
                  {message}
                </Text>
              </View>

              <View className={`mt-[32px]`}>
                <TouchableOpacity
                  className={` bg-[#0066F5] text-white flex-row 
                  justify-center py-[11px] rounded-full w-full`}
                  onPress={slideDown}
                >
                  <Text
                    className={`uppercase ${
                      Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                    }  text-white font-montserratSemiBold`}
                  >
                    {btnTxet}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  ridesOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    zIndex: 10,
    // alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "80%",
  },
  ridesModal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "100%",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingBottom: 10,
  },
  modalContent: {
    paddingVertical: 15,
    paddingBottom: 10,
  },
  loadModal: {
    backgroundColor : 'white',
    borderRadius: 16,
    width: "100%",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: "absolute",
    bottom: 0,
  },
  lottie: {
    width: 60,
    height: 60,
  },
});
