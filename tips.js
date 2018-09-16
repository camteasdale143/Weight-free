import { View, Text, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

const TipsPage = props => (
  <View
    style={{
      width: "100%",
      height: props.height,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text
      style={{
        fontSize: 30
      }}
    >
      You are Overeating Obese
    </Text>
    <Text
      style={{
        fontSize: 20
      }}
    >
      You can combat this by
    </Text>
    <Text
      style={{
        fontSize: 20
      }}
    >
      - cutting down on sugar intake
    </Text>
    <Text
      style={{
        fontSize: 20
      }}
    >
      - excercising for 30 mins a day
    </Text>
    <TouchableOpacity onPress={props.resetState}>
      <Ionicons
        style={[{ marginVertical: 30, marginHorizontal: 20 }]}
        name="md-close"
        size={32}
      />
    </TouchableOpacity>
  </View>
);

export default TipsPage;
