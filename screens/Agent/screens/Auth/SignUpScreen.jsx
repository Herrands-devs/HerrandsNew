import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
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
import { DisabledSquareBtn, SquareButton } from "../../../components/common/Button";
import { DropDownPicker, DropDownPickerMultiple } from "../../../components/common/Dropdown";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import axios from "axios";
import { API_URl } from "../../../../config";
import { GlobalContext } from "../../../../context/context-agent.store";
import isEmpty from "../../../components/isEmpty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SuccessErrorModal } from "../../../components/common/Modals";
import Loading from "../../../components/common/Loading";
import ErrorIcon from "../../../../assets/error-message.png";
import SuccessIcon from "../../../../assets/icons/thank-you.png";
const { width, height } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
  const { angleLeft } = iconsPack();
  const [preferences, setPreferences] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { selectedService, setSelectedService  } = useContext(GlobalContext);
  const { selectedPreference, setSelectedPreference  } = useContext(GlobalContext);
  const { seletedState, setSelectedState  } = useContext(GlobalContext);
  const { selectFile, setSelectedFile  } = useContext(GlobalContext);
  const { idType, setIdType  } = useContext(GlobalContext);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [check, setCheck] = useState(false);


  const [tempPhone , setPhone] = useState("")
  const [user, setUser] = useState({ 
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    user_type: "Agent"
  });

  
  useEffect(() => {
    axios
      .get(`${API_URl}/accounts/preferences`)
      .then((response) => {
        setPreferences(response.data)
      })
  },[API_URl])
  useEffect(() => {
    axios
      .get(`${API_URl}/accounts/services`)
      .then((response) => {
        setServices(response.data)
      })
  },[API_URl])


  // Process the SignUp 
  const data = {
    user : user,
    services : selectedService,
    preference : selectedPreference,
    id_type: idType,
    state : seletedState,
    id_file: selectFile
  }


  useEffect(() => {
    if(!isEmpty(user.email) && !isEmpty(user.first_name) &&!isEmpty(user.last_name) && !isEmpty(user.phone_number) && !isEmpty(data.services) && !isEmpty(data.preference) && !isEmpty(data.id_type) && !isEmpty(data.id_file) && !isEmpty(data.state)) {
      setError(true)
      return;
    } else {
      setError(false)
    }
  })


  const handleSubmit = () => {
    setLoading(true);
    axios
    .post(`${API_URl}/accounts/register/agent/` , data)
    .then((response) => {
      setError(true)
      setLoading(false)
      if (response.status === 200 || response.status === 201) {
        const userId = response.data.user.id;
        AsyncStorage.setItem("user_id", userId);
        navigation.navigate("OtpScreenAgent" , { phone_number : user.phone_number });
      } else {
        setLoading(false);
        console.log("response error:::", response.data);
      }
    })
    .catch((err) => {
      setLoading(false);
      setError(false)
      if (err.response) {
        console.log("Error response data:", err.response.data);
        console.log("Error response data:", err.response.data);
        if(!isEmpty(err.response.data.user.phone_number) || !isEmpty(err.response.data.user.email) || !isEmpty(err.response.data.user.id_file)) {
          setIsModal(true);
          setMessage(err.response.data.user.phone_number || err.response.data.user.email || err.response.data.user.id_file || err.response.data.id_type || err.response.data.user.first_name);
          setMessageType("error");
        }
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Request error:", err.message);
      }
    });
  }
  return (
  <>
    <KeyboardAvoidingContainer>
      <View className="p-4 font-montserratRegular flex flex-row items-center gap-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={angleLeft} />
        </TouchableOpacity>
      </View>
      <View style={styles.container} className="p-3 gap-2">
        <Text className="font-montserratBold font-extrabold text-[24px] line-clamp-[43px]">
          Create Account
        </Text>
        <Text style={{ color: colors.primaryColor }} className="">
          It’s easy, quick and safe!
        </Text>
        <View className="relative flex flex-col w-full gap-y-2 items-center">
          <View className="flex flex-row w-full justify-center">
            <View className="w-[50%]">
              <PrimaryInput
                style={"w-full"}
                label={"First Name"}
                placeHolder={"John"}
                value={user.first_name}
                onChangeText={(text) =>
                  setUser({ ...user, first_name:  text })
                }

              />
            </View>
            <View className="w-[50%]">
              <PrimaryInput
                style={"w-full"}
                label={"Last Name"}
                placeHolder={"Doe"}
                value={user.last_name}
                onChangeText={(text) =>
                  setUser({ ...user, last_name:  text })
                }
              />
            </View>
          </View>
          <View className="flex w-full">
            <PrimaryInput
              style={"w-full mb-4"}
              label={"Email Address"}
              placeHolder={"JohnDoe@gmail.com"}
              value={user.email}
              onChangeText={(text) =>
                setUser({ ...user, email:  text })
              }
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
                setPhone(text) || setUser({ ...user, phone_number: "+234" + text })
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
            />
          </View>
          <View className="w-full">
            <Text className="text-[#6B7C97] text-[14px] font-medium py-2 font-montserratRegular">
              Means Of Identification
            </Text>

            <View className="w-full mt-3">
              <CheckBox label="Driver's License" setIdType={setIdType} idType={idType} value={1} />
              <CheckBox label="Internation Passport" setIdType={setIdType} idType={idType} value={2} />
              <CheckBox label="National Id Card" setIdType={setIdType} idType={idType} value={3} />
              <CheckBox label="Voter's Card" setIdType={setIdType} idType={idType} value={4} />
              <CheckBox label="NIN Slip" setIdType={setIdType} idType={idType} value={5} />
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
                  disabled={'true'}
                  selectFile={selectFile}
                  setSelectedFile={setSelectedFile}
                />
            </View>
          </View>
          <View className="w-full">
            {isError ?
            <SquareButton
              text="Sign Up"
              styles={{
                backgroundColor: colors.primaryColor,
                width: "100%",
                marginTop: 20,
              }}
              loading={loading}
              onPress={handleSubmit}
            />
            :
            <DisabledSquareBtn
              text="Sign Up"
            />
            }
          </View>
          <View
            className={`items-center w-[60%] mt-2`}
          >
            <View
              className={`flex-row flex-wrap justify-center gap-1 items-center  mt-[18px] space-x-1`}
            >
              <Text
                className={`text-[14px] font-montserratSemiBold text-subTitle`}
              >
                By continuing,
              </Text>
              <TouchableOpacity>
                <Text
                  className={`text-[14px] font-montserratSemiBold text-primaryColor`}
                  onPress={() => navigation.navigate("SignInEmail")}
                >
                  terms of service
                </Text>
              </TouchableOpacity>
              <Text
                className={`text-[14px] font-montserratSemiBold text-subTitle`}
              >
                and
              </Text>
              <TouchableOpacity>
                <Text
                  className={`text-[14px] font-montserratSemiBold text-primaryColor`}
                  
                >
                  privacy policy
                </Text>
              </TouchableOpacity>
              <Text
                className={`text-[14px] font-montserratSemiBold text-subTitle`}
              >
                Apply
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingContainer>
    {loading && <Loading />}
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
