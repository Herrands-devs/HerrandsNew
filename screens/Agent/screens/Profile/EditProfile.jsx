import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { iconsPack } from "../../../components/icons";
import { colors } from "../../../../themes/colors";
import {
   PhoneNumberInput,
  PrimaryInput,
} from "../../../components/common/Inputs";
import { SquareButton } from "../../../components/common/Button";
import { DropDownPicker } from "../../../components/common/Dropdown";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
const { width, height } = Dimensions.get("window");

const EditProfile = ({ navigation }) => {
  const { angleLeft } = iconsPack();
  return (
    <KeyboardAvoidingContainer>
      <TouchableOpacity className="p-6 font-montserratRegular flex flex-row items-center gap-5" onPress={() => navigation.goBack()}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
        <Text className="text-[24px] text-[#000E23] font-semibold font-MontserratMedium">
          Edit Profile
        </Text>
      </TouchableOpacity>
      <View style={styles.container} className="p-3 gap-2">
         <View className="relative  flex flex-col w-full gap-2 items-center">
            <View className="w-full py-6 flex justify-center items-center">
               <View className="relative w-[118px] h-[118px]">
                  <Image
                     source={require("../../../../assets/herrand-profile.png")}
                     className="rounded-full object-cover w-full h-full"
                  />
                  <View
                     className="bg-[#59595993] flex justify-center items-center w-[25px] h-[25px] rounded-full"
                     style={styles.badge}
                  >
                     <Image source={require('../../../../assets/icons/camera.png')} className="w-[10px] h-[10px]"/>
                  <View />
               </View>
            </View>
            </View>
            <View className="flex w-full">
               <PhoneNumberInput
                 style={"w-full mb-4"}
                 type={"phone-pad"}
                 label={"Mobile Number"}
                 placeHolder={"8045324621"}
               />
            </View>
            <View className="w-full z-40">
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
          <View className="w-full z-30">
            <DropDownPicker
              style={"w-full"}
              placeHolder={"Select"}
              defaultOption={"Please Select"}
              label={"Which of this applies to you ?"}
              options={[
                { label: "Virtual" },
                { label: "On Site" },
              ]}
            />
          </View>
          <View className="w-full z-20">
            <DropDownPicker
              style={"w-full"}
              placeHolder={"Select"}
              defaultOption={"Please Select"}
              label={"Which of these can you do ? "}
              options={[
                { label: "Delivery Garri" },
                { label: "Pick-Up" },
              ]}
            />
          </View>
            
            <View className="w-full">
              <SquareButton
                text="Save Changes"
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
    gap: "20px",
  },
  badge: {
   position: "absolute",
   bottom: 5,
   right: 10,
 },
});

export default EditProfile;
