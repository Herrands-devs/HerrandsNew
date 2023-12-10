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
    createErrandSent,
    setCreatErrandSent,
    setSelectedcategory,
    errandRoute,
    setErrandRoute,
    vehicleType,
    vehicleId,
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

  useEffect(() => {
    setRouteToGo(errandRoute);
    console.log("route:::", errandRoute);
  }, [errandRoute]);

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
    type: "create.errand",
    data: {
      category: categoryId,
      subtype: "1",
      pick_up_lat: itemAddress && itemAddress.details.lat,
      pick_up_long: itemAddress && itemAddress.details.lng,
      pick_up_address: itemAddress && itemAddress.description,
      drop_off_address: recipientAddress && recipientAddress.description,
      drop_off_lat: recipientAddress && recipientAddress.details.lat,
      drop_off_long: recipientAddress && recipientAddress.details.lng,
      recipient_contact: "+234" + pickItemsValues.recipient_contact,
      sendder_contact: "+234" + pickItemsValues.sendder_contact,
      item_description: pickItemsValues.item_description,
      describe_errand: pickItemsValues.describe_errand,
      customer: userId,
      due_date: "2023-11-01T12:00:00Z",
      status: "REQUESTED",
      estimated_drop_off_time: pickItemsValues.estimated_drop_off_time,
      vehicle_type: vehicleId,
      // files: [],
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
      .get("https://herrand-backend-5a39ee15054e.herokuapp.com/api/categories")
      .then((res) => {
        // console.log("responseeee", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubCategories = async (id) => {
    axios
      .get(
        `https://herrand-backend-5a39ee15054e.herokuapp.com/api/subtypes/?category_id=${id}`
      )
      .then((res) => {
        // console.log("subcategories response:::", res.data);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVehicleTypes = () => {
    axios
      .get(
        "https://herrand-backend-5a39ee15054e.herokuapp.com/api/vehicle-metric/"
      )
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

  // const routineList = [
  //   {
  //     id: 1,
  //     title: "Send a package",
  //   },
  //   {
  //     id: 2,
  //     title: "Pickup/drop off item",
  //   },

  //   {
  //     id: 4,
  //     title: "Shop for groceries",
  //   },
  // ];

  // const groceryList = [
  //   {
  //     id: 1,
  //     title: "Go somewhere with an agent",
  //   },
  // ];

  // const socialList = [
  //   {
  //     id: 1,
  //     title: "Manage my facebook page",
  //   },
  //   {
  //     id: 2,
  //     title: "Manage my instagram page",
  //   },
  //   {
  //     id: 3,
  //     title: "Manage my twitter page",
  //   },
  //   {
  //     id: 4,
  //     title: "Manage my telegram group/channel",
  //   },
  //   {
  //     id: 5,
  //     title: "Manage my linkedin page",
  //   },
  //   {
  //     id: 6,
  //     title: "Manage my tiktok account",
  //   },
  //   {
  //     id: 7,
  //     title: "Manage my youtube channel",
  //   },
  // ];

  // const officeList = [
  //   {
  //     id: 2,
  //     title: "Do data entry",
  //   },
  //   {
  //     id: 3,
  //     title: "Type a document",
  //   },
  //   {
  //     id: 4,
  //     title: "Take meeting notes",
  //   },

  //   {
  //     id: 8,
  //     title: "Manage my email inbox",
  //   },
  // ];

  // const householdList = [
  //   {
  //     id: 1,
  //     title: "Clean up my house",
  //   },
  //   {
  //     id: 2,
  //     title: "Carry a household item",
  //   },
  // ];

  const CarryHouseholdItemsFields = () => {
    return (
      <View className={`space-y-[26px]`}>
        <View>
          <PrimaryInput
            label={"Item's description"}
            placeHolder={"What's the item to pick up?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Item's address"}
            placeHolder={"What's the location of the item?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Custodian's phone"}
            placeHolder={"Custodian of item's hotline?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Recipient's address"}
            placeHolder={"Where will the item be delivered?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Recipient's phone"}
            placeHolder={"Recipient of the item's hotline?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Any instructions"}
            placeHolder={"Tell us anything we need to know"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
      </View>
    );
  };

  const ShopForGroceriesFields = () => {
    return (
      <View className={`space-y-[26px]`}>
        <View>
          <PrimaryInput
            label={"What items do you want to purcahse?"}
            placeHolder={"List the items to purchase"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Your estimated price"}
            placeHolder={"How much do you think this will cost?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Your house address"}
            placeHolder={"Where should your items be delivered?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Your phone number"}
            placeHolder={"Give us a hotline to reach you"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Please add more details"}
            placeHolder={"Tell us anything we need to know"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
      </View>
    );
  };

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

  const ArrangeTravelsField = () => {
    return (
      <View className={`space-y-[26px]`}>
        <View>
          <PrimaryInput
            label={"What would you like help with?"}
            placeHolder={"Please be specific with your tasks"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
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
            label={"Kindly give us more details"}
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

  const CleanMyHouseFields = () => {
    return (
      <View className={`space-y-[26px]`}>
        <View>
          <PrimaryInput
            label={"What do you need assistance with?"}
            placeHolder={"Please be specific with your tasks"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>

        <View>
          <PrimaryInput
            label={"For how long?"}
            placeHolder={"The number of hours this will take"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Meet-up address"}
            placeHolder={"Where should the Herrands agent meet you?"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
        <View>
          <PrimaryInput
            label={"Please add any instructions"}
            placeHolder={"Tell us anything we need to know"}
            labelStyle={{ fontSize: 16, fontFamily: "MontserratSemiBold" }}
          />
        </View>
      </View>
    );
  };

  const navigateToNext = () => {
    if (
      selectedState === "Pickup/drop off item" ||
      selectedState === "Carry a household item" ||
      selectedState === "Shop for groceries"
    ) {
      navigation.navigate("CustomerErrandMap");
    } else if (
      selectedState === "Manage my email inbox" ||
      selectedState === "Arrange my travels" ||
      selectedState === "Clean up my house"
    ) {
      navigation.navigate("CustomerVirtualProcess");
    }
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
        <View className={`px-[16px]`}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setSelectedState("");
              setSelectedcategory("");
            }}
          >
            <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
          </TouchableOpacity>
        </View>

        <View className={`px-[16px] mt-[16px]`}>
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
                    style={{ marginTop: height * 0.047, paddingLeft: 29 }}
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
                                : category.name === "Household errands"
                                ? HouseIcon
                                : null
                            }
                            title={category.name}
                            onPress={() => {
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

                              if (category.name === "Household errands") {
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
                      defaultOption={"Select vehicle"}
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
                  <View>
                    <PrimaryInput
                      label={"Item's description"}
                      placeHolder={"What's the item to pick up?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Item's address"}
                      placeHolder={"What's the location of the item?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Custodian's phone"}
                      placeHolder={"Custodian of item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Recipient's address"}
                      placeHolder={"Where will the item be delivered?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Recipient's phone"}
                      placeHolder={"Recipient of the item's hotline?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Any instructions"}
                      placeHolder={"Tell us anything we need to know"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                </View>
              ) : selectedState === "Shop for groceries" ? (
                <View className={`space-y-[26px]`}>
                  <View>
                    <PrimaryInput
                      label={"What items do you want to purcahse?"}
                      placeHolder={"List the items to purchase"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
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
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Your house address"}
                      placeHolder={"Where should your items be delivered?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Your phone number"}
                      placeHolder={"Give us a hotline to reach you"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                </View>
              ) : selectedState === "Manage my email inbox" ? (
                <ManageEmailFields />
              ) : selectedState === "Arrange my travels" ? (
                <ArrangeTravelsField />
              ) : selectedState === "Clean up my house" ? (
                <View className={`space-y-[26px]`}>
                  <View>
                    <PrimaryInput
                      label={"What do you need assistance with?"}
                      placeHolder={"Please be specific with your tasks"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
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
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Meet-up address"}
                      placeHolder={"Where should the Herrands agent meet you?"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
                  <View>
                    <PrimaryInput
                      label={"Please add any instructions"}
                      placeHolder={"Tell us anything we need to know"}
                      labelStyle={{
                        fontSize: 16,
                        fontFamily: "MontserratSemiBold",
                      }}
                    />
                  </View>
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
                  sendMessageAction();
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
