import React from "react";
import { View, StyleSheet } from "react-native";

const Item = () => {
  return (
   <View>
      <Modal
        visible={true}
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", padding: 20 }}
      >
        <View className="flex-1 bg-[#00000082] relative z-20 justify-end">
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}
            className={`p-2 flex justify-center items-center absolute bg-white shadow-lg rounded-full top-0  ${
              Platform.OS == "ios"
                ? "mt-[60px] ml-[30px]"
                : "mt-[20px] ml-[15px]"
            } `}
          >
            <AntDesign name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Sidebar
            isOpen={isOpen}
            onClose={handleCloseSidebar}
            navigation={navigation}
          />
          <View
            className={`absolute px-5 pt-10 min-h-[15vh] bg-white shadow-xl w-full rounded-t-3xl flex space-y-[20px]`}
          >
            <View>
              <TouchableOpacity
                onPress={() => setModalHeight(!modalHeight)}
                className="h-[48px] w-full flex-row space-x-[10px] items-center px-2 bg-[#ebeaea] rounded-md shadow-sm"
              >
                <View className="w-[30px] flex-row justify-center items-center h-[30px] rounded-full bg-white">
                  <AntDesign name="search1" size={15} color="black" />
                </View>
                <View>
                  <Text className="text-[16px] font-montserratMedium">
                    What errand are you runnung today ?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {modalHeight && <CategoryButton />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Item;
