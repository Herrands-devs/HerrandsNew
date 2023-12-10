import React, { useContext, useEffect, useState } from "react";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";
import { iconsPack } from "../../../components/icons";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { formatCurrency } from "../../../../helpers/CurrencyFormatter";
import { SquareButton } from "../../../components/common/Button";
import Notification from "../../../components/common/Notification";
import Loading from "../../../components/common/Loading";
import { GlobalContext } from "../../../../context/context.store";
import useSocket from "../../../../helpers/socker.service";

const InProgressBoard = ({ navigation, route }) => {
  const { angleLeft } = iconsPack();
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { userId } = useContext(GlobalContext);
  const { data } = route.params;
  const [status, setStatus] = useState(data.status);
  const { sendMessage, handleButtonClick, isConnected } = useSocket();
  var updateText = "";
  var modalText = "";
  var statusToUpdate = "";
  switch (status) {
    case "PICKED_UP":
      updateText = "Agent on their way to to deliver";
      modalText = "By tapping proceed it means you are on your way to deliver";
      statusToUpdate = "COMPLETED";
      break;
    case "COMPLETED":
      updateText = "Completed";
      modalText =
        "By tapping proceed it means your task has been completed successfully";
      break;
    default:
      updateText = "Order Placed";
      modalText = "By tapping proceed it means you are on your way to pick up";
      statusToUpdate = "PICKED_UP";
  }
  useEffect(() => {
    handleButtonClick();
    if (isConnected) {
      console.log("yes");
    } else {
      console.log("no");
    }
  });

  const handleUpdate = (value) => {
    setUpdate(false);
    setLoading(true);
    setTimeout(() => {
      if (isConnected) {
        setLoading(false);
        sendMessage({
          type: "update.errand",
          data: {
            id: data.id,
            agent: userId,
            status: value,
          },
        });
        console.log("yes");
        setStatus(value);
      } else {
        console.log("no");
      }
    }, 8000);
  };

  return (
    <SafeAreaComponent>
      {isLoading && <Loading />}
      <TouchableOpacity
        className="p-6 font-montserratRegular flex flex-row items-center gap-5"
        onPress={() => navigation.goBack()}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
        <Text className="text-[24px] text-[#000E23] font-semibold font-MontserratMedium">
          In Progress
        </Text>
      </TouchableOpacity>

      <View className="w-full flex p-6 flex-row justify-between items-center">
        <View className="flex flex-row gap-5">
          <View className="w-[40px] h-[40px]">
            <Image
              source={require("../../../../assets/herrand-profile.png")}
              className="rounded-full object-cover w-full h-full"
            />
          </View>
          <View className="h-[40px] flex justify-between">
            <Text>
              {data.customer.first_name} {data.customer.last_name}
            </Text>
            <Text className="text-[#0066F5] font-montserratRegular">
              {data.subtype.name}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-[#000E23] text-[20px] font-montserratBold">
            {formatCurrency(data.total_cost)}
          </Text>
        </View>
      </View>
      <View className="p-6 flex gap-8">
        <View className="flex gap-2">
          <Text className="text-[18px] text-[#000E23]">Item’s description</Text>
          <View className="flex flex-row items-center">
            <Image source={require("../../../../assets/icons/box.png")} />
            <Text className="text-[#000E23] font-montserratRegular ml-2">
              {data.item_description}
            </Text>
          </View>
        </View>

        <View className="flex gap-2">
          <View className="flex justify-between flex-row">
            <Text className="text-[18px] text-[#000E23]">Item’s Address</Text>
            <Text className="text-[18px] font-montserratRegular text-[#000E23]">
              {data.estimated_pick_up_time}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Image source={require("../../../../assets/icons/email.png")} />
            <Text className="text-[#000E23] font-montserratRegular ml-2">
              {data.pick_up_address}.
            </Text>
          </View>
        </View>

        <View className="flex gap-2">
          <View className="flex justify-between flex-row">
            <Text className="text-[18px] text-[#000E23]">
              Custodian’s phone
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Image source={require("../../../../assets/icons/phone.png")} />
            <Text className="text-[#000E23] font-montserratRegular ml-2">
              07020304050
            </Text>
          </View>
        </View>

        <View className="flex gap-2">
          <View className="flex justify-between flex-row">
            <Text className="text-[18px] text-[#000E23]">
              Recipients Address
            </Text>
            <Text className="text-[18px] font-montserratRegular text-[#000E23]">
              {data.estimated_drop_off_time}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <Image source={require("../../../../assets/icons/email.png")} />
            <Text className="text-[#000E23] font-montserratRegular ml-2">
              {data.pick_up_address}.
            </Text>
          </View>
        </View>

        <View className="flex gap-2">
          <View className="flex justify-between flex-row">
            <Text className="text-[18px] text-[#000E23]">Recipients Phone</Text>
          </View>
          <View className="flex flex-row items-center">
            <Image source={require("../../../../assets/icons/phone.png")} />
            <Text className="text-[#000E23] font-montserratRegular ml-2">
              {data.recipient_contact}
            </Text>
          </View>
        </View>

        <View className="flex gap-2">
          <View className="flex justify-between flex-row">
            <Text className="text-[18px] text-[#000E23]">Manage Order</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center">
              <Image source={require("../../../../assets/icons/user.png")} />
              <Text className="text-[#000E23] font-montserratRegular ml-2">
                {updateText}
              </Text>
            </View>
            {status !== "COMPLETED" && (
              <TouchableOpacity
                className="bg-[#0066F5] h-[26px] w-[111px] rounded-full flex justify-center items-center"
                onPress={() => setUpdate(true)}
              >
                <Text className="text-white">Tap to Update</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {status !== "COMPLETED" ? (
        <View className="w-full p-6 mb-6">
          <SquareButton
            text="Contact"
            styles={{
              backgroundColor: "#34A853",
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("CompleteScreen")}
          />
        </View>
      ) : (
        <View className="w-full p-6 mb-4">
          <SquareButton
            text="Report An Issue"
            styles={{
              backgroundColor: "#EA133E",
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("CompleteScreen")}
          />
        </View>
      )}
      <Notification
        isVisible={update}
        title={"Parcel Delivered ?"}
        subTitle={modalText}
        btnBackground={"#0066F5"}
        btnText={"Progress"}
        image={require("../../../../assets/gifs/question.gif")}
        onClose={() => setUpdate(false)}
        onPress={() => handleUpdate(statusToUpdate)}
      />
    </SafeAreaComponent>
  );
};

export default InProgressBoard;
