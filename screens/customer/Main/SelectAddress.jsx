import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../../../context/context.store";

const SelectAddress = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { setItemAddress, setRecipientAddress } = useContext(GlobalContext);
  const { type } = route.params;

  console.log("type:::", type)

  return (
    <View
      style={[
        {
          paddingTop: Platform.OS === "android" ? insets.top + 20 : insets.top,
          backgroundColor: "#fff",
          flex: 1,
        },
      ]}
    >
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
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
          } else {
            setRecipientAddress({
              description: data.description,
              details: details.geometry.location,
            });
          }
          navigation.goBack();
        }}
        fetchDetails={true}
        returnKeyType={"search"}
        enablePoweredByContainer={false}
        placeholder="What's the location of the item?"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      />
    </View>
  );
};

export default SelectAddress;

const styles = StyleSheet.create({});
