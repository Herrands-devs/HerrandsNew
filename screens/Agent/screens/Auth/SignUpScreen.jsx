import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { iconsPack } from "../../../components/icons";
import { colors } from "../../../../themes/colors";
import {
  CheckBox,
  PhoneNumberInput,
  PrimaryInput,
  UploadInp,
} from "../../../components/common/Inputs";
import {
  DisabledSquareBtn,
  SquareButton,
} from "../../../components/common/Button";
import {
  DropDownPicker,
  DropDownPickerMultiple,
} from "../../../components/common/Dropdown";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import axios from "axios";
import { API_URl } from "@env";
import { GlobalContext } from "../../../../context/context.store";
import isEmpty from "../../../components/isEmpty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SuccessErrorModal } from "../../../components/common/Modals";
import Loading from "../../../components/common/Loading";
import ErrorIcon from "../../../../assets/error-message.png";
import SuccessIcon from "../../../../assets/icons/thank-you.png";
const { width, height } = Dimensions.get("window");
import BackIcon from "../../../../assets/icons/back-icon-black.png";
import SafeAreaComponent from "../../../components/common/SafeAreaComponent";

const SignUpScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { selectedService, setSelectedService } = useContext(GlobalContext);
  const { selectedPreference, setSelectedPreference } =
    useContext(GlobalContext);
  const { seletedState, setSelectedState } = useContext(GlobalContext);
  const { selectFile, setSelectedFile } = useContext(GlobalContext);
  const { idType, setIdType } = useContext(GlobalContext);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [check, setCheck] = useState(false);

  const [tempPhone, setPhone] = useState("");
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    user_type: "Agent",
  });

  useEffect(() => {
    axios.get(`${API_URl}/accounts/preferences`).then((response) => {
      setPreferences(response.data);
    });
  }, [API_URl]);
  useEffect(() => {
    axios.get(`${API_URl}/accounts/services`).then((response) => {
      setServices(response.data);
    });
  }, [API_URl]);

  // Process the SignUp
  const data = {
    user: user,
    services: selectedService,
    preference: selectedPreference,
    id_type: idType,
    state: seletedState,
    id_file: selectFile,
  };

  useEffect(() => {
    if (
      !isEmpty(user.email) &&
      !isEmpty(user.first_name) &&
      !isEmpty(user.last_name) &&
      !isEmpty(user.phone_number) &&
      !isEmpty(data.services) &&
      !isEmpty(data.preference) &&
      !isEmpty(data.id_type) &&
      !isEmpty(data.id_file) &&
      !isEmpty(data.state)
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
  });

  console.log(user)
  const handleSubmit = () => {
    console.log(user.phone_number)
    setLoading(true);
    axios
      .post(`${API_URl}/accounts/register/agent/`, data)
      .then((response) => {
        setError(true);
        setLoading(false);
        if (response.status === 200 || response.status === 201) {
          const userId = response.data.user.id;
          AsyncStorage.setItem("user_id", userId);
          navigation.navigate("OtpScreenAgent", {
            phone_number: user.phone_number,
          });
        } else {
          setLoading(false);
          console.log("response error:::", response.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(false);
        if (err.response) {
          console.log("Error response data:", err.response.data);
          console.log("Error response data:", err.response.data);
          if (
            !isEmpty(err.response.data.user.phone_number) ||
            !isEmpty(err.response.data.user.email) ||
            !isEmpty(err.response.data.user.id_file)
          ) {
            setIsModal(true);
            setMessage(
              err.response.data.user.phone_number ||
                err.response.data.user.email ||
                err.response.data.user.id_file ||
                err.response.data.id_type ||
                err.response.data.user.first_name
            );
            setMessageType("error");
          }
        } else if (err.request) {
          console.log("No response received:", err.request);
        } else {
          console.log("Request error:", err.message);
        }
      });
  };
  return (
    <>
      <KeyboardAvoidingContainer>
        <SafeAreaComponent>
          <View className="p-4 font-montserratRegular flex flex-row  items-end gap-x-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={BackIcon} className={`w-[24px] h-[24px]`} />
            </TouchableOpacity>
            <Text
              className={`${
                Platform.OS == "ios" ? "text-[24px]" : "text-[18px]"
              } font-montserratBold line-clamp-[43px]`}
            >
              Create an account
            </Text>
          </View>
          <View style={styles.container} className="p-3 gap-2">
            <Text style={{ color: colors.primaryColor }} className="">
              It’s easy, quick and safe!
            </Text>
            <View className="relative flex flex-col w-full gap-y-4 items-center">
              <View className="flex flex-row bg-white w-full justify-between">
                <View className="w-[45%]">
                  <PrimaryInput
                    style={"w-full"}
                    label={"First Name"}
                    placeHolder={"John"}
                    value={user.first_name}
                    onChangeText={(text) =>
                      setUser({ ...user, first_name: text })
                    }
                    bgColor={true}
                  />
                </View>
                <View className="w-[45%]">
                  <PrimaryInput
                    style={"w-full"}
                    label={"Last Name"}
                    placeHolder={"Doe"}
                    value={user.last_name}
                    onChangeText={(text) =>
                      setUser({ ...user, last_name: text })
                    }
                    bgColor={true}
                  />
                </View>
              </View>
              <View className="flex w-full">
                <PrimaryInput
                  style={"w-full mb-4"}
                  label={"Email Address"}
                  placeHolder={"JohnDoe@gmail.com"}
                  value={user.email}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  bgColor={true}
                />
              </View>
              <View className="flex w-full">
                <PhoneNumberInput
                  style={"w-full mb-4"}
                  type={"phone-pad"}
                  label={"Mobile Number"}
                  placeHolder={"8045324621"}
                  value={tempPhone}
                  onChangeText={(text) =>
                    setPhone(text) ||
                    setUser({ ...user, phone_number: "+234" + text })
                  }
                  onBlur={() => {
                    const phoneNumber = user.phone_number;
                    if (user.phone_number === "") {
                      return;
                    } else if (user.phone_number.includes("+234")) {
                      return;
                    } else {
                      setUser({ ...user, phone_number: "+234" + tempPhone });
                    }
                  }}
                  bgColor={true}
                />
              </View>
              <View className="w-full z-30">
                <DropDownPicker
                  style={"w-full"}
                  placeHolder={"Select"}
                  defaultOption={"Please Select"}
                  label={"Where are you located ?"}
                  selectState={seletedState}
                  setSelectedState={setSelectedState}
                  options={[
                    { title: "Abia" },
                    { title: "Adamawa" },
                    { title: "Akwa Ibom" },
                    { title: "Anambra" },
                    { title: "Bauchi" },
                    { title: "Bayelsa" },
                    { title: "Benue" },
                    { title: "Borno" },
                    { title: "Cross River" },
                    { title: "Delta" },
                    { title: "Ebonyi" },
                    { title: "Edo" },
                    { title: "Ekiti" },
                    { title: "Enugu" },
                    { title: "FCT - Abuja" },
                    { title: "Gombe" },
                    { title: "Imo" },
                    { title: "Jigawa" },
                    { title: "Kaduna" },
                    { title: "Kano" },
                    { title: "Katsina" },
                    { title: "Kebbi" },
                    { title: "Kogi" },
                    { title: "Kwara" },
                    { title: "Lagos" },
                    { title: "Nasarawa" },
                    { title: "Niger" },
                    { title: "Ogun" },
                    { title: "Ondo" },
                    { title: "Osun" },
                    { title: "Oyo" },
                    { title: "Plateau" },
                    { title: "Rivers" },
                    { title: "Sokoto" },
                    { title: "Taraba" },
                    { title: "Yobe" },
                    { title: "Zamfara" },
                  ]}
                  bgColor={"#F7F7F7"}
                />
              </View>
              <View className="w-full z-20">
                <DropDownPicker
                  style={"w-full text-black"}
                  placeHolder={"Select"}
                  defaultOption={"Please Select"}
                  label={"Which of this applies to you ?  "}
                  options={preferences}
                  selectState={selectedPreference}
                  setSelectedState={setSelectedPreference}
                  bgColor={"#F7F7F7"}
                />
              </View>
              <View className="w-full z-10">
                <DropDownPickerMultiple
                  style={"w-full"}
                  placeHolder={"Select"}
                  defaultOption={"Please select as many as you can"}
                  label={"Which of these can you do ?  "}
                  options={services}
                  selectState={selectedService}
                  setSelectedState={setSelectedService}
                  bgColor={"#F7F7F7"}
                />
              </View>
              <View className="w-full">
                <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
                  Means Of Identification
                </Text>

                <View className="w-full mt-3">
                  <CheckBox
                    label="Driver's License"
                    setIdType={setIdType}
                    idType={idType}
                    value={1}
                  />
                  <CheckBox
                    label="Internation Passport"
                    setIdType={setIdType}
                    idType={idType}
                    value={2}
                  />
                  <CheckBox
                    label="National Id Card"
                    setIdType={setIdType}
                    idType={idType}
                    value={3}
                  />
                  <CheckBox
                    label="Voter's Card"
                    setIdType={setIdType}
                    idType={idType}
                    value={4}
                  />
                  <CheckBox
                    label="NIN Slip"
                    setIdType={setIdType}
                    idType={idType}
                    value={5}
                  />
                </View>
              </View>
              <View className="w-full">
                <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
                  Please Upload your selected ID
                </Text>

                <View className="w-full mt-3">
                  <UploadInp
                    style={"w-full bg-[#ffffff]"}
                    placeHolder={"No files choosen"}
                    disabled={"true"}
                    selectFile={selectFile}
                    setSelectedFile={setSelectedFile}
                    bgColor={true}
                  />
                </View>
              </View>
              <View className="w-full">
                <SquareButton
                  text="Sign Up"
                  loading={loading}
                  onPress={handleSubmit}
                  disabled={!isError}
                />
              </View>
              <View className={`items-center w-[100%] mt-2 mb-10`}>
                <View
                  className={`flex-row flex-wrap justify-center w-[80%] gap-1 items-center  mt-[18px] space-x-1`}
                >
                  <Text
                    className={`${
                      Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                    } font-montserratSemiBold text-subTitle`}
                  >
                    By continuing,
                  </Text>
                  <TouchableOpacity>
                    <Text
                      className={`${
                        Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                      } font-montserratSemiBold text-primaryColor`}
                      onPress={() => navigation.navigate("SignInEmail")}
                    >
                      terms of service
                    </Text>
                  </TouchableOpacity>
                  <Text
                    className={`${
                      Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                    } font-montserratSemiBold text-subTitle`}
                  >
                    and
                  </Text>
                  <TouchableOpacity>
                    <Text
                      className={`${
                        Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                      } font-montserratSemiBold text-primaryColor`}
                    >
                      privacy policy
                    </Text>
                  </TouchableOpacity>
                  <Text
                    className={`${
                      Platform.OS == "ios" ? "text-[16px]" : "text-[12px] "
                    } font-montserratSemiBold text-subTitle`}
                  >
                    Apply
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaComponent>
      </KeyboardAvoidingContainer>
      <SuccessErrorModal
        isVisible={isModal}
        closeModal={() => setIsModal(false)}
        message={message}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    display: "flex",
    gap: 20,
  },
});

export default SignUpScreen;
