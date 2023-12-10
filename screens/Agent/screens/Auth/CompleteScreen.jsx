import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { GlobalContext } from "../../../../context/context.store";
const { width, height } = Dimensions.get("window");
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URl } from "../../../../config";

const CompleteScreen = ({ navigation }) => {
  const [hourRate, setHour] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { isToken } = useContext(GlobalContext);
  const [filePreview, setPreview] = useState("");
  const [data, setData] = useState({
    photo: "",
    pay_per_hour: hourRate,
    arrival_speed: "",
    delivery_speed: "",
    bank_name: "",
    account_number: "",
    beneficiary_name: "",
    id: "c0efe7cf-2187-4176-b28c-e2cb698a6a90",
  });
  useEffect(() => {
    setToken(isToken);
  }, []);
  console.log(token);
  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        base64: true,
        copyToCacheDirectory: false,
        type: "image/*",
      });
      const url = response.assets[0]["uri"];
      const type = response.assets[0]["mimeType"];
      setPreview(url);
      const filePath =
        Platform.OS === "android" ? url : url.replace("file://", "");
      const base64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem?.EncodingType?.Base64,
      });
      setData({ ...data, photo: "data:" + type + ";base64," + base64 });
    } catch (err) {
      console.warn(err);
    }
  };
  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(`${API_URl}/accounts/update/data/`, data, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log("Error response data:", err.response.data);
        } else if (err.request) {
          console.log("No response received:", err.request);
        } else {
          console.log("Request error:", err.message);
        }
      });
  };
  return (
    <KeyboardAvoidingContainer>
      <View style={styles.container} className="p-3 gap-2">
        <Text className="font-montserratBold font-extrabold text-[24px] line-clamp-[43px]">
          Complete Account Setup
        </Text>
        <Text style={{ color: colors.primaryColor }} className="">
          You are almost there. Keep it up !!
        </Text>
        <View className="relative flex flex-col w-full gap-2 items-center">
          <TouchableOpacity
            onPress={handleDocumentSelection}
            className="flex gap-3 py-2 items-center"
          >
            <View className="w-[119px] h-[119px] rounded-full flex justify-center items-center bg-[#D9D9D9]">
              {!filePreview ? (
                <Image
                  source={require("../../../../assets/icons/camera.png")}
                  className="w-[32px] h-[30px]"
                />
              ) : (
                <Image
                  source={
                    filePreview
                      ? { uri: filePreview }
                      : require("../../../../assets/icons/camera.png")
                  }
                  className="w-full  h-full rounded-full object-fit"
                />
              )}
            </View>
            <Text className="text-[#C6C6C6] font-montserratRegular">
              Add Picture
            </Text>
          </TouchableOpacity>
          <View className="w-full z-30">
            <DropDownPicker
              style={"w-full"}
              placeHolder={"Select"}
              defaultOption={"Please Select"}
              label={"Select your hourly rate"}
              selectState={hourRate}
              setSelectedState={setHour}
              options={[
                { title: "₦2,000/hr" },
                { title: "₦2,500/hr" },
                { title: "₦3,000/hr" },
              ]}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              type={"phone-pad"}
              label={"Fastest time to arrive at delivery location"}
              placeHolder={"E.g 1hr , 2hrs ,3hrs"}
              value={data.arrival_speed}
              onChangeText={(text) => setData({ ...data, arrival_speed: text })}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              type={"phone-pad"}
              label={"How fast can you deliver ? "}
              placeHolder={"E.g in 30mins"}
              value={data.delivery_speed}
              onChangeText={(text) =>
                setData({ ...data, delivery_speed: text })
              }
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Your Bank Name"}
              placeHolder={"E.g Sterling bank , Polaris Bank..."}
              value={data.bank_name}
              onChangeText={(text) => setData({ ...data, bank_name: text })}
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              type={"phone-pad"}
              label={"Your Bank Account Number"}
              placeHolder={"E.g  0000000000"}
              value={data.account_number}
              maxLength={10}
              onChangeText={(text) =>
                setData({ ...data, account_number: text })
              }
            />
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Your Bank Beneficiary Name  "}
              placeHolder={"E.g  John Doe"}
              value={data.beneficiary_name}
              onChangeText={(text) =>
                setData({ ...data, beneficiary_name: text })
              }
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
              loading={loading}
              onPress={handleSubmit}
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
