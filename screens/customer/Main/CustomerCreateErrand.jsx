import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SafeAreaComponent from "../../components/common/SafeAreaComponent";
import BackIcon from "../../../assets/icons/back-icon-black.png";
import { DropDownPicker } from "../../components/common/Dropdown";
import { Dimensions } from "react-native";
import CategoryButton from "../../components/customer-home-screen/CategoryButton";
import RoutinIcon from "../../../assets/icons/routine-ride.png";
import CartIcon from "../../../assets/icons/cart-icon.png";
import SocialIcon from "../../../assets/icons/social-icon.png";
import OfficeIcon from "../../../assets/icons/office-icon.png";
import HouseIcon from "../../../assets/icons/house-icon.png";
import { SquareButton } from "../../components/common/Button";
import { colors } from "../../../themes/colors";
import CategoryModal from "../../components/customer-home-screen/CategoryModal";
import { useContext } from "react";
import { GlobalContext } from "../../../context/context.store";
import { useEffect } from "react";
import { PrimaryInput } from "../../components/common/Inputs";

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
  const { selectedCategory } = useContext(GlobalContext);

  const routineList = [
    {
      id: 1,
      title: "Send a package",
    },
    {
      id: 2,
      title: "Pick up/drop off an item",
    },
    {
      id: 3,
      title: "Carry a household item",
    },
    {
      id: 4,
      title: "get someone to assist me (in person)",
    },
  ];

  const groceryList = [
    {
      id: 1,
      title: "Shop for groceries",
    },
    {
      id: 2,
      title: "Get pet supplies/pet care",
    },
  ];

  const socialList = [
    {
      id: 1,
      title: "Manage my facebook page",
    },
    {
      id: 2,
      title: "Manage my instagram page",
    },
    {
      id: 3,
      title: "Manage my twitter page",
    },
    {
      id: 4,
      title: "Manage my telegram group/channel",
    },
    {
      id: 5,
      title: "Manage my linkedin page",
    },
    {
      id: 6,
      title: "Manage my tiktok account",
    },
    {
      id: 7,
      title: "Manage my youtube channel",
    },
  ];

  const officeList = [
    {
      id: 1,
      title: "Conduct web research",
    },
    {
      id: 2,
      title: "Do data entry",
    },
    {
      id: 3,
      title: "Type a document",
    },
    {
      id: 4,
      title: "Take meeting notes",
    },
    {
      id: 5,
      title: "Schedule appointments",
    },
    {
      id: 6,
      title: "Place phone calls",
    },
    {
      id: 7,
      title: "Manage my calendar",
    },
    {
      id: 8,
      title: "Manage my email inbox",
    },
    {
      id: 8,
      title: "Arrange my travels",
    },
  ];

  const householdList = [
    {
      id: 1,
      title: "Clean up my house",
    },
  ];

  const PickUpItemFields = () => {
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

  useEffect(() => {
    setSelectedState(selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaComponent>
      <View className={`px-[16px]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
        </TouchableOpacity>
      </View>

      <View className={`px-[16px]`}>
        <View>
          <View className={`z-20`}>
            <DropDownPicker
              defaultOption={"Select your city"}
              options={[
                { label: "Within Ogun", value: "" },
                { label: "Within Abuja", value: "" },
                { label: "Within Ogun", value: "" },
                { label: "Within Abuja", value: "" },
                { label: "Within Ogun", value: "" },
                { label: "Within Abuja", value: "" },
                { label: "Within Ogun", value: "" },
                { label: "Within Abuja", value: "" },
              ]}
              label={"Where are you going?"}
            />
          </View>

          <View className={`z-10`}>
            <DropDownPicker
              defaultOption={"I want to"}
              options={[
                {
                  label: "Pick up/drop off an item",
                  value: "Pick up/drop off an item",
                },
                {
                  label: "Carry a household item",
                  value: "Carry a household item",
                },
                { label: "Shop for groceries", value: "Shop for groceries" },
                {
                  label: "Manage my email inbox",
                  value: "Manage my email inbox",
                },
                { label: "Arrange my travels", value: "Arrange my travels" },
                { label: "Clean up my house", value: "Clean up my house" },
              ]}
              label={"What errand are you runnung today?"}
            />
          </View>

          <View className={``} style={{ marginTop: height * 0.069 }}>
            {selectedState === "" ? (
              <View>
                <Text className={`text-[16px] font-montserratSemiBold`}>
                  Search by category
                </Text>
                <View style={{ marginTop: height * 0.047, paddingLeft: 29 }}>
                  <View className={`flex-row`}>
                    <CategoryButton
                      icon={RoutinIcon}
                      title={"Routine Errands"}
                      onPress={() =>
                        setModalStates({ ...modalStates, routine: true })
                      }
                    />
                    <CategoryButton
                      icon={CartIcon}
                      title={"Grocery shopping"}
                      style={{ marginLeft: 8 }}
                      onPress={() =>
                        setModalStates({ ...modalStates, grocery: true })
                      }
                    />
                  </View>
                  <View className={`flex-row my-[14px]`}>
                    <CategoryButton
                      icon={SocialIcon}
                      title={"Social media"}
                      onPress={() =>
                        setModalStates({ ...modalStates, social: true })
                      }
                    />
                    <CategoryButton
                      icon={OfficeIcon}
                      title={"Office duty"}
                      style={{ marginLeft: 8 }}
                      onPress={() =>
                        setModalStates({ ...modalStates, office: true })
                      }
                    />
                  </View>
                  <View className={`flex-row`}>
                    <CategoryButton
                      icon={HouseIcon}
                      title={"Household chores"}
                      onPress={() =>
                        setModalStates({ ...modalStates, houseHold: true })
                      }
                    />
                  </View>
                </View>
              </View>
            ) : selectedState === "Pick up/drop off an item" ? (
              <PickUpItemFields />
            ) : selectedState === "Carry a household item" ? (
              <CarryHouseholdItemsFields />
            ) : selectedState === "Shop for groceries" ? (
              <ShopForGroceriesFields />
            ) : selectedState === "Manage my email inbox" ? (
              <ManageEmailFields />
            ) : selectedState === "Arrange my travels" ? (
              <ArrangeTravelsField />
            ) : selectedState === "Clean up my house" ? (
              <CleanMyHouseFields />
            ) : null}
          </View>
        </View>

        <View
          className={``}
          style={{
            marginTop: height * 0.227,
            marginBottom: selectedCategory === "" ? 0 : 100,
          }}
        >
          <SquareButton
            text={"Send"}
            styles={{ backgroundColor: colors.primaryColor }}
          />
        </View>
      </View>

      <CategoryModal
        isVisible={modalStates.routine}
        initalValue={-500}
        closeModal={() => setModalStates({ ...modalStates, routine: false })}
        title={"Routine errand"}
        options={routineList}
      />
      <CategoryModal
        isVisible={modalStates.grocery}
        initalValue={500}
        closeModal={() => setModalStates({ ...modalStates, grocery: false })}
        title={"Grocery shopping"}
        options={groceryList}
      />
      <CategoryModal
        isVisible={modalStates.social}
        initalValue={-500}
        closeModal={() => setModalStates({ ...modalStates, social: false })}
        title={"Social media"}
        options={socialList}
      />
      <CategoryModal
        isVisible={modalStates.office}
        initalValue={500}
        closeModal={() => setModalStates({ ...modalStates, office: false })}
        title={"Office duty"}
        options={officeList}
      />
      <CategoryModal
        isVisible={modalStates.houseHold}
        initalValue={-500}
        closeModal={() => setModalStates({ ...modalStates, houseHold: false })}
        title={"Household chores"}
        options={householdList}
      />
    </SafeAreaComponent>
  );
};

export default CustomerCreateErrand;

const styles = StyleSheet.create({});
