import React from "react";
import {  View, Dimensions , ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

const PostLayout = () => (
  <SkeletonLoader boneColor="#ffffff"  highlightColor="#f3f3f3" duration={500} style={{ borderRadius : 7, marginVertical: 10 , backgroundColor : 'white'}}>
    <SkeletonLoader.Item
      style={{ width : "30%", height : 68, marginVertical: 10 , backgroundColor : 'white' }}
    />
  </SkeletonLoader>
);

const numberOfPosts = new Array(3).fill(null);

export default function Placeholder() {
  return (
    <View>
      {numberOfPosts.map((_, i) => (
        <PostLayout key={i} />
      ))}
    </View>
  );
}
