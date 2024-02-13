import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../../../context/context.store";
import { MaterialIcons } from "@expo/vector-icons";

const SelectAddress = ({ navigation, route }) => {
  const googlePlacesRef = useRef(null)
  const insets = useSafeAreaInsets();
  const { setItemAddress, setRecipientAddress } = useContext(GlobalContext);
  const countryRestriction = { country: 'NG' }; // 'NG' is the country code for Nigeria
  const { type } = route.params;

  console.log("type:::", type);

  const clearTextInput = () => {
    googlePlacesRef.current?.setAddressText('');
  };

  return (
    <View
      style={[
        {
          paddingTop: Platform.OS === "android" ? insets.top + 20 : insets.top,
          backgroundColor: "#fff",
          flex: 1,
          paddingVertical: 5,
          paddingHorizontal: 15,
        },
      ]}
      className="w-full"
    >
      <Pressable onPress={() => navigation.goBack()} className="py-4">
        <MaterialIcons name="cancel" size={24} color="#E1E1E1" />
      </Pressable>
      <View className="flex w-full h-full">
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          styles={{
            container: {
              flex: 1,
              zIndex: 10,
            },
            textInput: {
              fontSize: 16,
              borderRadius: 4,
              borderColor: "#E9E9E9",
              borderWidth: 1,
              zIndex: 10,
            },
          }}
          query={{
            key: GOOGLE_MAP_APIKEY,
            language: "en",
          }}
          minLength={3}
          onPress={(data, details = null) => {
            if (type === "item") {
              setItemAddress({
                description: data.description,
                details: details.geometry.location,
              });
              navigation.navigate("Item");
            } else {
              setRecipientAddress({
                description: data.description,
                details: details.geometry.location,
              });
              clearTextInput()
              navigation.navigate("DropOff");
            }
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          placeholder="What's the location of the item?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          autocompletionRequest={{ componentRestrictions: countryRestriction }}
          keepResultsAfterBlur={true}
        />
          
      </View>
    </View>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
