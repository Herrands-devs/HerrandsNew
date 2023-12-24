import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { DropDownPicker } from "../../components/common/DropdownPicker";
import { Dimensions } from "react-native";
import CategoryButton from "../../components/customer-home-screen/CategoryButton";
import RoutinIcon from "../../../assets/icons/routine-ride.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import SocialIcon from "../../../assets/icons/social-icon.png";
import OfficeIcon from "../../../assets/icons/office-icon.png";
import HouseIcon from "../../../assets/icons/house-icon.png";
import {
  DisabledSquareBtn,
  SquareButton,
} from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import CategoryModal from "../../components/customer-home-screen/CategoryModal";
import { useContext } from "react";
import { GlobalContext } from "../../../context/context.store";
import { useEffect } from "react";
import { PrimaryInput } from "../../components/common/Inputs";
import { fetchCategories } from "../../../api/customer/innercalls.service";
import axios from "axios";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSocket from "../../../helpers/socket.service";
import { NormalDropdown } from "../../components/common/NormalDropdown";
import { SuccessErrorModal } from "../../components/common/Modals";
import ErrorIcon from "../../../assets/error-message.png";
import SuccessIcon from "../../../assets/icons/thank-you.png";
import { GOOGLE_MAP_APIKEY } from "@env";
import { API_URl } from "../../../config";

const { width, height } = Dimensions.get("window");

const CustomerCreateErrand = ({ navigation }) => {
  const [modalStates, setModalStates] = useState({
    routine: false,
    grocery: false,
    social: false,
    office: false,
    houseHold: false,
  });
  const [selectedState, setSelectedState] = useState("");
  const {
    selectedCategory,
    itemAddress,
    recipientAddress,
    categoryId,
    setSelectedcategory,
    vehicleType,
    vehicleId,
    setCategoryId,
    subTypeId,
  } = useContext(GlobalContext);
  const [categories, setCategories] = useState();
  const [userId, setUserId] = useState("");
  const { isConnected, sendMessage, handleButtonClick } = useSocket();
  const [pickItemsValues, setPickItemsValues] = useState({
    item_description: "",
    pick_up_lat: "",
    pick_up_long: "",
    pick_up_address: "",
    drop_off_address: "",
    drop_off_lat: "",
    drop_off_long: "",
    recipient_contact: "",
    sendder_contact: "",
    describe_errand: "",
    estimated_drop_off_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [routeToGo, setRouteToGo] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [itemsToPurchase, setItemsToPurchase] = useState("");
  const [groceryPhoneNumber, setGroceryPhoneNumber] = useState("");

  const [cleanHouseAssistance, setCleanHouseAssistance] = useState("");
  const [cleanHouseHowLong, setCleanHouseHowLong] = useState("");
  const [timeType, setTimeType] = useState("hours");

  const cleanHouseMessage = {
    type: "create.household_chores",
    data: {
      category: categoryId,
      subtype: subTypeId,
      drop_off_address: itemAddress && itemAddress.description,
      drop_off_lat: itemAddress && itemAddress.details.lat.toFixed(2),
      drop_off_long: itemAddress && itemAddress.details.lng.toFixed(2),
      how_long: Number(cleanHouseHowLong),
      time_cap:
        timeType === "hours"
          ? "HOURS"
          : timeType === "days"
          ? "DAYS"
          : timeType === "months"
          ? "MONTHS"
          : null,
      item_description: cleanHouseAssistance,
      customer: userId,
      vehicle_type: vehicleId,
      status: "REQUESTED",
    },
  };

  const sendCleanHouseMessage = () => {
    console.log("message after completion", cleanHouseMessage);
    setLoading(true);

    if (
      !cleanHouseMessage.data.drop_off_lat ||
      !cleanHouseMessage.data.drop_off_long ||
      !cleanHouseMessage.data.drop_off_address ||
      cleanHouseAssistance === "" ||
      cleanHouseHowLong === "" ||
      timeType === ""
    ) {
      setLoading(false);
      setIsModal(true);
      setModalMessage("No field can be empty.");
      setMessageType("error");
      return;
    } else {
      sendMessage(cleanHouseMessage);
      setTimeout(() => {
        // {
        //   errandRoute === "" ? null : navigation.navigate("CustomerErrandMap");
        // }
        setLoading(false);
      }, 3000);
    }
  };

  const groceryMessage = {
    type: "create.routine_errand",
    data: {
      category: categoryId,
      subtype: subTypeId,
      drop_off_address: recipientAddress && recipientAddress.description,
      drop_off_lat: recipientAddress && recipientAddress.details.lat,
      drop_off_long: recipientAddress && recipientAddress.details.lng,
      recipient_contact: "+234" + groceryPhoneNumber,
      customer: userId,
      vehicle_type: vehicleId,
      grocery_list: itemsToPurchase,
      grocery_estimated_price: estimatedPrice,
      status: "REQUESTED",
    },
  };

  const sendGroceryMessage = () => {
    console.log("message after completion", groceryMessage);
    setLoading(true);

    if (
      !groceryMessage.data.drop_off_lat ||
      !groceryMessage.data.drop_off_long ||
      !groceryMessage.data.drop_off_address ||
      groceryPhoneNumber === "" ||
      itemsToPurchase === "" ||
      estimatedPrice === ""
    ) {
      setLoading(false);
      setIsModal(true);
      setModalMessage("No field can be empty.");
      setMessageType("error");
      return;
    } else {
      sendMessage(groceryMessage);
      setTimeout(() => {
        // {
        //   errandRoute === "" ? null : navigation.navigate("CustomerErrandMap");
        // }
        setLoading(false);
      }, 3000);
    }
  };

  const getTravelTime = async () => {
    if (itemAddress !== undefined || recipientAddress !== undefined) {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${itemAddress?.description}&destinations=${recipientAddress?.description}&key=${GOOGLE_MAP_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("distance logs:::", data.rows[0].elements[0]);
          // setTravelTimeInformation(data.rows[0].elements[0]);
          setPickItemsValues({
            ...pickItemsValues,
            estimated_drop_off_time: data.rows[0].elements[0].duration.text,
          });
        });
    }
  };

  useEffect(() => {
    getTravelTime();
  }, [itemAddress, recipientAddress]);

  const message = {
    type: "create.routine_errand",
    data: {
      category: categoryId,
      subtype: subTypeId,
      pick_up_lat: itemAddress && itemAddress.details.lat,
      pick_up_long: itemAddress && itemAddress.details.lng,
      pick_up_address: itemAddress && itemAddress.description,
      drop_off_address: recipientAddress && recipientAddress.description,
      drop_off_lat: recipientAddress && recipientAddress.details.lat,
      drop_off_long: recipientAddress && recipientAddress.details.lng,
      recipient_contact: "+234" + pickItemsValues.recipient_contact,
      sendder_contact: "+234" + pickItemsValues.sendder_contact,
      item_description: pickItemsValues.item_description,
      customer: userId,
      due_date: "2023-11-01T12:00:00Z",
      status: "REQUESTED",
      estimated_drop_off_time: pickItemsValues.estimated_drop_off_time,
      vehicle_type: vehicleId,
    },
  };

  const sendMessageAction = () => {
    console.log("message after completion", message);
    setLoading(true);

    if (
      !message.data.pick_up_lat ||
      !message.data.pick_up_long ||
      !message.data.drop_off_lat ||
      !message.data.drop_off_long ||
      !message.data.pick_up_address ||
      !message.data.drop_off_address ||
      pickItemsValues.recipient_contact === "" ||
      pickItemsValues.sendder_contact === "" ||
      message.data.item_description === ""
    ) {
      setLoading(false);
      setIsModal(true);
      setModalMessage("No field can be empty.");
      setMessageType("error");
      return;
    } else if (message.data.estimated_drop_off_time === "") {
      setLoading(false);
      setIsModal(true);
      setModalMessage("Cannot determine errand distance or duration.");
      setMessageType("error");
    } else {
      sendMessage(message);
      setTimeout(() => {
        // {
        //   errandRoute === "" ? null : navigation.navigate("CustomerErrandMap");
        // }
        setLoading(false);
      }, 3000);
    }
  };

  const fetchID = async () => {
    const res = await AsyncStorage.getItem("user_id");

    if (res !== null) {
      setUserId(res);
    } else {
      console.log("No user Id");
    }
  };

  const fetchCategoriesAction = async () => {
    await axios
      .get(`https://jellyfish-app-gd9q8.ondigitalocean.app/api/categories`)
      .then((res) => {
        console.log("categories responseeee", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubCategories = async (id) => {
    axios
      .get(
        `https://jellyfish-app-gd9q8.ondigitalocean.app/api/subtypes/?category_id=${id}`
      )
      .then((res) => {
        console.log("subcategories response:::", res.data);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVehicleTypes = () => {
    axios
      .get("https://jellyfish-app-gd9q8.ondigitalocean.app/api/vehicle-metric/")
      .then((res) => {
        console.log("Vehicle type:::", res.data);
        setVehicles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchID();
    fetchCategoriesAction();
    handleButtonClick();
    fetchVehicleTypes();
    fetchSubCategories(1);
  }, []);

  const ManageEmailFields = () => {
    return (
      <View className={`space-y-[26px]`}>
        <View className={`z-10`}>
          <DropDownPicker
            defaultOption={"Please select"}
            options={[
              {
                label: "An Item",
                value: "An Item",
              },
              {
                label: "Another one",
                value: "Another one",
              },
              {
                label: "Not sure what should be here",
                value: "Not sure what should be here",
              },
            ]}
            label={"Tell us how long"}
            labelStyles={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
            disabled={true}
          />
        </View>
        <View>
          <PrimaryInput
            label={"When do you want this completed?"}
            placeHolder={"Select date and time"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Please include more details"}
            placeHolder={"Tell us anything we need to know..."}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Any relevcant file(s)"}
            placeHolder={"No file chosen"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    setSelectedState(selectedCategory);
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaComponent>
        <View className={`px-[16px] flex-row items-center justify-between`}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setSelectedState("");
              setSelectedcategory("");
            }}
          >
            <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>

          {selectedState !== "" && (
            <TouchableOpacity
              onPress={() => {
                setSelectedState("");
                setSelectedcategory("");
              }}
            >
              <Text
                className={`text-[14px] text-primaryColor font-montserratBold`}
              >
                Go back to category
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className={`px-[16px] mt-[24px]`}>
          <View>
            <View className={`z-10`}>
              <DropDownPicker
                defaultOption={"I want to"}
                options={subCategories}
                label={"What errand are you runnung today?"}
                labelStyles={{
                  fontFamily: "MontserratBold",
                  fontSize: 16,
                  color: "#000",
                }}
              />
            </View>

            <View className={``} style={{ marginTop: height * 0.069 }}>
              {selectedState === "" ? (
                <View>
                  <Text className={`text-[16px] font-montserratSemiBold`}>
                    Search by category
                  </Text>
                  <View
                    style={{ marginTop: height * 0.047, paddingLeft: 20 }}
                    className={`flex-row items-center flex-wrap gap-5`}
                  >
                    {categories &&
                      categories.map((category) => (
                        <View className={``} key={category.id}>
                          <CategoryButton
                            icon={
                              category.name === "Routine errands"
                                ? RoutinIcon
                                : category.name === "Outdoor errands"
                                ? CartIcon
                                : category.name === "Virtual errands"
                                ? OfficeIcon
                                : category.name === "Household errand"
                                ? HouseIcon
                                : null
                            }
                            title={category.name}
                            onPress={() => {
                              setCategoryId(category.id);
                              if (category.name === "Routine errands") {
                                setModalStates({
                                  ...modalStates,
                                  routine: true,
                                });
                                fetchSubCategories(category.id);
                              }

                              if (category.name === "Outdoor errands") {
                                setModalStates({
                                  ...modalStates,
                                  grocery: true,
                                });
                                fetchSubCategories(category.id);
                              }

                              // if (category.name === "Social media")
                              //   setModalStates({
                              //     ...modalStates,
                              //     social: true,
                              //   });
                              if (category.name === "Virtual errands") {
                                setModalStates({
                                  ...modalStates,
                                  office: true,
                                });
                                fetchSubCategories(category.id);
                              }

                              if (category.name === "Household errand") {
                                setModalStates({
                                  ...modalStates,
                                  houseHold: true,
                                });
                                fetchSubCategories(category.id);
                              }
                            }}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              ) : selectedState === "Pickup/drop off item" ? (
                <View className={`space-y-[26px]`}>
                  {/* <View> */}
                  <PrimaryInput
                    label={"Item's description"}
                    placeHolder={"What's the item to pick up?"}
                    labelStyle={{
                      fontSize: 16,
                      fontFamily: "MontserratSemiBold",
                    }}
                    value={pickItemsValues.item_description}
                    onChangeText={(text) =>
                      setPickItemsValues({
                        ...pickItemsValues,
                        item_description: text,
                      })
                    }
                    type="default"
                  />

                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"What type of vehicle do you need?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  {/* </View> */}
                  <TouchableOpacity
                    style={{ zIndex: 10 }}
                    onPress={() =>
                      navigation.navigate("SelectAddress", { type: "item" })
                    }
                  >
                    <Text
                      className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                      style={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
                    >
                      Item's address
                    </Text>
                    <View
                      className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                    >
                      <Text
                        className={`${
                          itemAddress ? `text-[#000]` : `text-[#e8e8e8]`
                        } text-[14px] font-montserratSemiBold`}
                      >
                        {itemAddress === undefined
                          ? "Where is the location of the item?"
                          : itemAddress.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View>
                    <PrimaryInput
                      label={"Custodian's phone"}
                      placeHolder={"Custodian of item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.sendder_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          sendder_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ zIndex: 10 }}
                      onPress={() =>
                        navigation.navigate("SelectAddress", {
                          type: "recipient",
                        })
                      }
                    >
                      <Text
                        className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratSemiBold",
                        }}
                      >
                        Recipient's address
                      </Text>
                      <View
                        className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                      >
                        <Text
                          className={`${
                            recipientAddress ? `text-[#000]` : `text-[#e8e8e8]`
                          } text-[14px] font-montserratSemiBold`}
                        >
                          {recipientAddress === undefined
                            ? "Where will the item be delivered?"
                            : recipientAddress.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Recipient's phone"}
                      placeHolder={"Recipient of the item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.recipient_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          recipient_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                </View>
              ) : selectedState === "Send a package" ? (
                <View className={`space-y-[26px]`}>
                  {/* <View> */}
                  <PrimaryInput
                    label={"Item's description"}
                    placeHolder={"What's the item to pick up?"}
                    labelStyle={{
                      fontSize: 16,
                      fontFamily: "MontserratSemiBold",
                    }}
                    value={pickItemsValues.item_description}
                    onChangeText={(text) =>
                      setPickItemsValues({
                        ...pickItemsValues,
                        item_description: text,
                      })
                    }
                    type="default"
                  />

                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"What type of vehicle do you need?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  {/* </View> */}
                  <TouchableOpacity
                    style={{ zIndex: 10 }}
                    onPress={() =>
                      navigation.navigate("SelectAddress", { type: "item" })
                    }
                  >
                    <Text
                      className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                      style={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
                    >
                      Item's address
                    </Text>
                    <View
                      className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                    >
                      <Text
                        className={`${
                          itemAddress ? `text-[#000]` : `text-[#e8e8e8]`
                        } text-[14px] font-montserratSemiBold`}
                      >
                        {itemAddress === undefined
                          ? "Where is the location of the item?"
                          : itemAddress.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View>
                    <PrimaryInput
                      label={"Custodian's phone"}
                      placeHolder={"Custodian of item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.sendder_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          sendder_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ zIndex: 10 }}
                      onPress={() =>
                        navigation.navigate("SelectAddress", {
                          type: "recipient",
                        })
                      }
                    >
                      <Text
                        className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratSemiBold",
                        }}
                      >
                        Recipient's address
                      </Text>
                      <View
                        className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                      >
                        <Text
                          className={`${
                            recipientAddress ? `text-[#000]` : `text-[#e8e8e8]`
                          } text-[14px] font-montserratSemiBold`}
                        >
                          {recipientAddress === undefined
                            ? "Where will the item be delivered?"
                            : recipientAddress.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Recipient's phone"}
                      placeHolder={"Recipient of the item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.recipient_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          recipient_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                </View>
              ) : selectedState === "Carry a household item" ? (
                <View className={`space-y-[26px]`}>
                  {/* <View> */}
                  <PrimaryInput
                    label={"Item's description"}
                    placeHolder={"What's the item to pick up?"}
                    labelStyle={{
                      fontSize: 16,
                      fontFamily: "MontserratSemiBold",
                    }}
                    value={pickItemsValues.item_description}
                    onChangeText={(text) =>
                      setPickItemsValues({
                        ...pickItemsValues,
                        item_description: text,
                      })
                    }
                    type="default"
                  />

                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"What type of vehicle do you need?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  {/* </View> */}
                  <TouchableOpacity
                    style={{ zIndex: 10 }}
                    onPress={() =>
                      navigation.navigate("SelectAddress", { type: "item" })
                    }
                  >
                    <Text
                      className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                      style={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
                    >
                      Item's address
                    </Text>
                    <View
                      className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                    >
                      <Text
                        className={`${
                          itemAddress ? `text-[#000]` : `text-[#e8e8e8]`
                        } text-[14px] font-montserratSemiBold`}
                      >
                        {itemAddress === undefined
                          ? "Where is the location of the item?"
                          : itemAddress.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View>
                    <PrimaryInput
                      label={"Custodian's phone"}
                      placeHolder={"Custodian of item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.sendder_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          sendder_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ zIndex: 10 }}
                      onPress={() =>
                        navigation.navigate("SelectAddress", {
                          type: "recipient",
                        })
                      }
                    >
                      <Text
                        className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratSemiBold",
                        }}
                      >
                        Recipient's address
                      </Text>
                      <View
                        className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                      >
                        <Text
                          className={`${
                            recipientAddress ? `text-[#000]` : `text-[#e8e8e8]`
                          } text-[14px] font-montserratSemiBold`}
                        >
                          {recipientAddress === undefined
                            ? "Where will the item be delivered?"
                            : recipientAddress.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Recipient's phone"}
                      placeHolder={"Recipient of the item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={pickItemsValues.recipient_contact}
                      onChangeText={(text) =>
                        setPickItemsValues({
                          ...pickItemsValues,
                          recipient_contact: text,
                        })
                      }
                      type={"phone-pad"}
                    />
                  </View>
                </View>
              ) : selectedState === "Shop for groceries" ? (
                <View className={`space-y-[26px]`}>
                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"Which would you prefer?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"What items do you want to purcahse?"}
                      placeHolder={"List the items to purchase"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={itemsToPurchase}
                      onChangeText={(text) => setItemsToPurchase(text)}
                    />
                  </View>
                  {/* <View>
                    <PrimaryInput
                      label={"For how long?"}
                      placeHolder={"The number of hours this will take"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View> */}
                  <View>
                    <PrimaryInput
                      label={"What is your Estimated price?"}
                      placeHolder={"The amount you want to spend"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      type={"phone-pad"}
                      value={estimatedPrice}
                      onChangeText={(text) => setEstimatedPrice(text)}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ zIndex: 10 }}
                      onPress={() =>
                        navigation.navigate("SelectAddress", {
                          type: "recipient",
                        })
                      }
                    >
                      <Text
                        className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                        style={{
                          fontSize: 16,
                          fontFamily: "MontserratSemiBold",
                        }}
                      >
                        Recipient's address
                      </Text>
                      <View
                        className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                      >
                        <Text
                          className={`${
                            recipientAddress ? `text-[#000]` : `text-[#e8e8e8]`
                          } text-[14px] font-montserratSemiBold`}
                        >
                          {recipientAddress === undefined
                            ? "Where will the item be delivered?"
                            : recipientAddress.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Your phone number"}
                      placeHolder={"Give us a hotline to reach you"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={groceryPhoneNumber}
                      onChangeText={(text) => setGroceryPhoneNumber(text)}
                      type={"phone-pad"}
                    />
                  </View>
                </View>
              ) : selectedState === "Manage my social page" ? (
                <ManageEmailFields />
              ) : selectedState === "Take meeting notes" ? (
                <ManageEmailFields />
              ) : selectedState === "Clean up my house" ? (
                <View className={`space-y-[26px]`}>
                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"Which would you prefer?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"What do you need assistance with?"}
                      placeHolder={"Please be specific with your tasks"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={cleanHouseAssistance}
                      onChangeText={(text) => setCleanHouseAssistance(text)}
                    />
                  </View>

                  <View>
                    <PrimaryInput
                      label={"For how long?"}
                      placeHolder={"The number of hours this will take"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={cleanHouseHowLong}
                      onChangeText={(text) => setCleanHouseHowLong(text)}
                      type={"phone-pad"}
                    />
                  </View>

                  <View className={`flex-row items-center space-x-[20px]`}>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "hours" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("hours")}
                    >
                      <Text
                        className={`${timeType === "hours" && `text-white`}`}
                      >
                        Hours
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "days" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("days")}
                    >
                      <Text
                        className={`${timeType === "days" && `text-white`}`}
                      >
                        Days
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "months" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("months")}
                    >
                      <Text
                        className={`${timeType === "months" && `text-white`}`}
                      >
                        Months
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{ zIndex: 10 }}
                    onPress={() =>
                      navigation.navigate("SelectAddress", { type: "item" })
                    }
                  >
                    <Text
                      className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                      style={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
                    >
                      Meet up address
                    </Text>
                    <View
                      className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                    >
                      <Text
                        className={`${
                          itemAddress ? `text-[#000]` : `text-[#e8e8e8]`
                        } text-[14px] font-montserratSemiBold`}
                      >
                        {itemAddress === undefined
                          ? "Where should the Herrands agent meet you?"
                          : itemAddress.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : selectedState === "Type a document" ? (
                <ManageEmailFields />
              ) : selectedState === "Do data entry" ? (
                <ManageEmailFields />
              ) : selectedState === "Go somewhere with an agent" ? (
                <View className={`space-y-[26px]`}>
                  <View className={`z-20`}>
                    <NormalDropdown
                      defaultOption={"Select One"}
                      options={vehicles}
                      label={"Which would you prefer?"}
                      value={vehicleType}
                      onSelect={() => setSelectedVehicle()}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"What do you need assistance with?"}
                      placeHolder={"Please be specific with your tasks"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={cleanHouseAssistance}
                      onChangeText={(text) => setCleanHouseAssistance(text)}
                    />
                  </View>

                  <View>
                    <PrimaryInput
                      label={"For how long?"}
                      placeHolder={"The number of hours this will take"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                      value={cleanHouseHowLong}
                      onChangeText={(text) => setCleanHouseHowLong(text)}
                      type={"phone-pad"}
                    />
                  </View>

                  <View className={`flex-row items-center space-x-[20px]`}>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "hours" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("hours")}
                    >
                      <Text
                        className={`${timeType === "hours" && `text-white`}`}
                      >
                        Hours
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "days" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("days")}
                    >
                      <Text
                        className={`${timeType === "days" && `text-white`}`}
                      >
                        Days
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`border rounded-[4px] p-[10px] ${
                        timeType === "months" && `bg-primaryColor border-0`
                      }`}
                      onPress={() => setTimeType("months")}
                    >
                      <Text
                        className={`${timeType === "months" && `text-white`}`}
                      >
                        Months
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{ zIndex: 10 }}
                    onPress={() =>
                      navigation.navigate("SelectAddress", { type: "item" })
                    }
                  >
                    <Text
                      className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular"
                      style={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
                    >
                      Meet up address
                    </Text>
                    <View
                      className={`border outline-none border-[#E9E9E9] rounded-[4px] h-[45px] px-2 flex-row items-center`}
                    >
                      <Text
                        className={`${
                          itemAddress ? `text-[#000]` : `text-[#e8e8e8]`
                        } text-[14px] font-montserratSemiBold`}
                      >
                        {itemAddress === undefined
                          ? "Where should the Herrands agent meet you?"
                          : itemAddress.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>

          <View
            className={``}
            style={{
              marginTop: height * 0.227,
              // marginBottom: selectedCategory === "" ? 0 : 100,
              marginBottom: 100,
            }}
          >
            {selectedState === "" ? (
              <DisabledSquareBtn
                text={"Send"}
                styles={{ backgroundColor: colors.disabledBtn }}
              />
            ) : (
              <SquareButton
                text={"Send"}
                styles={{ backgroundColor: colors.primaryColor }}
                onPress={() => {
                  console.log("category before sending:::", selectedCategory);
                  if (selectedCategory === "Shop for groceries") {
                    sendGroceryMessage();
                  } else if (
                    selectedCategory === "Pickup/drop off item" ||
                    selectedCategory === "Send a package" ||
                    selectedCategory === "Carry a household item"
                  ) {
                    sendMessageAction();
                  } else if (
                    selectedCategory === "Clean up my house" ||
                    selectedCategory === "Go somewhere with an agent"
                  ) {
                    sendCleanHouseMessage();
                  }
                  //
                }}
                loading={loading}
              />
            )}
          </View>
        </View>

        <CategoryModal
          isVisible={modalStates.routine}
          initalValue={-500}
          closeModal={() => setModalStates({ ...modalStates, routine: false })}
          title={"Routine errands"}
          options={subCategories}
          setSubCategories={setSubCategories}
        />
        <CategoryModal
          isVisible={modalStates.grocery}
          initalValue={500}
          closeModal={() => setModalStates({ ...modalStates, grocery: false })}
          title={"Outdoor errands"}
          options={subCategories}
          setSubCategories={setSubCategories}
        />
        {/* <CategoryModal
          isVisible={modalStates.social}
          initalValue={-500}
          closeModal={() => setModalStates({ ...modalStates, social: false })}
          title={"Social media"}
          options={socialList}
        /> */}
        <CategoryModal
          isVisible={modalStates.office}
          initalValue={-500}
          closeModal={() => setModalStates({ ...modalStates, office: false })}
          title={"Virtual errands"}
          options={subCategories}
          setSubCategories={setSubCategories}
        />
        <CategoryModal
          isVisible={modalStates.houseHold}
          initalValue={500}
          closeModal={() =>
            setModalStates({ ...modalStates, houseHold: false })
          }
          title={"Household errands"}
          options={subCategories}
          setSubCategories={setSubCategories}
        />
      </SafeAreaComponent>

      <SuccessErrorModal
        isVisible={isModal}
        closeModal={() => setIsModal(false)}
        message={modalMessage}
        image={
          (messageType !== null && messageType) === "error"
            ? ErrorIcon
            : SuccessIcon
        }
        title={
          (messageType !== null && messageType) === "error"
            ? "Oops!"
            : "Success!"
        }
        btnTxet={
          (messageType !== null && messageType) === "error"
            ? "Try again"
            : "Okay"
        }
      />
    </KeyboardAvoidingView>
  );
};

export default CustomerCreateErrand;

const styles = StyleSheet.create({});
