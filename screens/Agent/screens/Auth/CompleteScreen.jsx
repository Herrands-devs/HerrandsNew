import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { iconsPack } from "../../../components/icons";
import { colors } from "../../../../themes/colors";
import {
  CheckBox,
  PhoneNumberInput,
  PrimaryInput,
  UploadInp,
} from "../../../components/common/Inputs";
import { SquareButton } from "../../../components/common/Button";
import { DropDownPicker } from "../../../components/common/Dropdown";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
const { width, height } = Dimensions.get("window");

const CompleteScreen = ({ navigation }) => {
  const { angleLeft } = iconsPack();
  return (
    <KeyboardAvoidingContainer>
      {/* <View className="p-4 font-montserratRegular flex flex-row items-center gap-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.container} className="p-3 gap-2">
        <Text className="font-montserratBold font-extrabold text-[24px] line-clamp-[43px]">
         Complete Account Setup
        </Text>
        <Text style={{ color: colors.primaryColor }} className="">
        You are almost there. Keep it up !!
        </Text>
        <View className="relative flex flex-col w-full gap-2 items-center">
          <View className="flex gap-3 py-2 items-center">
            <View className="w-[119px] h-[119px] rounded-full flex justify-center items-center bg-[#D9D9D9]">
               <Image source={require('../../../../assets/icons/camera.png')} className="w-[32px] h-[30px]"/>
            </View>
            <Text className="text-[#C6C6C6] font-montserratRegular">Add Picture</Text>
          </View>
          <View className="w-full z-30">
            <DropDownPicker
              style={"w-full"}
              placeHolder={"Select"}
              defaultOption={"Please Select"}
              label={"Where are you located ?*"}
              options={[
                { label: "Abia" },
                { label: "Adamawa" },
                { label: "Akwa Ibom" },
                { label: "Anambra" },
                { label: "Bauchi" },
                { label: "Bayelsa" },
                { label: "Benue" },
                { label: "Borno" },
                { label: "Cross River" },
                { label: "Delta" },
                { label: "Ebonyi" },
                { label: "Edo" },
                { label: "Ekiti" },
                { label: "Enugu" },
                { label: "FCT - Abuja" },
                { label: "Gombe" },
                { label: "Imo" },
                { label: "Jigawa" },
                { label: "Kaduna" },
                { label: "Kano" },
                { label: "Katsina" },
                { label: "Kebbi" },
                { label: "Kogi" },
                { label: "Kwara" },
                { label: "Lagos" },
                { label: "Nasarawa" },
                { label: "Niger" },
                { label: "Ogun" },
                { label: "Ondo" },
                { label: "Osun" },
                { label: "Oyo" },
                { label: "Plateau" },
                { label: "Rivers" },
                { label: "Sokoto" },
                { label: "Taraba" },
                { label: "Yobe" },
                { label: "Zamfara" },
              ]}
            />
          </View>
          {/* <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Fastest time to arrive at delivery location"}
              placeHolder={"E.g 1hr , 2hrs ,3hrs"}
            />
          </View> */}
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"How fast can you deliver ? "}
              placeHolder={"E.g in 30mins"}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Your Bank Name"}
              placeHolder={"E.g Sterling bank , Polaris Bank..."}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Your Bank Account Number"}
              placeHolder={"E.g  0000000000"}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Your Bank Beneficiary Name  "}
              placeHolder={"E.g  John Doe"}
            />
          </View>
          <View className="w-full">
            <SquareButton
              text="Let's rock"
              styles={{
                backgroundColor: colors.primaryColor,
                width: "100%",
                marginTop: 20,
              }}
              onPress={() => navigation.navigate("OtpScreenAgent")}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    display: "flex",
    gap: 20,
  },
});

export default CompleteScreen;
