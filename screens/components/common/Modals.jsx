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
import { formatCurrency } from "../../../helpers/CurrencyFormatter";
import { RoundedButton } from "./Button";
import { colors } from "../../../themes/colors";
import { useState } from "react";
import LocationIcon from "../../../assets/icons/location-icon.png";
import AddNoteIcon from "../../../assets/icons/add-note.png";
import LineLoader from "../../../assets/gifs/line-loader.json";
import LottieView from "lottie-react-native";
import HorizontalLoader from "./HorizontalLoader";
import AgentImage from "../../../assets/agent-image.png";

export const ResendModal = ({
  isVisible,
  closeModal,
  navigation,
  resendAction,
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
                +234 7020304050
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
                navigation.navigate("EnterYourNumber");
                slideDown();
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

  const selectRide = (id) => {
    setSelectedItem(id);
  };

  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: Platform.OS === "android" ? 250 : 220,
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
  onPress,
  onAddNote,
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
                  Ibukun street
                </Text>
                <Image source={LocationIcon} className={`w-[24px] h-[24px]`} />
              </View>
              <View className={`px-[16px] my-[20px]`}>
                <Text className={`text-[16px] font-montserratSemiBold`}>
                  N 9000
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

export const RideAddNotes = ({
  isVisible,
  closeModal,
  onPress,
  openDetails,
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
  closeModal,
  onPress,
  openDetails,
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
      <TouchableWithoutFeedback>
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

              <View className={`mb-[118px] mt-[50px]`}>
                <HorizontalLoader />
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
      <TouchableWithoutFeedback>
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
                      Collins
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      className={`bg-[#ccc] w-[64px] h-[64px] rounded-full justify-center items-center`}
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
                </View>

                <View className={`px-[34px] mt-[16px]`}>
                  <RoundedButton
                    text={"Track my erand"}
                    styles={{ backgroundColor: colors.primaryColor }}
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
    paddingBottom: 50,
  },
  modalContent: {
    paddingVertical: 10,
  },
});
