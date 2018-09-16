import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CameraUITop = props => (
  <View style={styles.containerMarginStyles}>
    <TouchableOpacity
      style={styles.switchCameraDirectionStyles}
      onPress={props.flipCamera}
    >
      <Text style={styles.flipCameraTextStyle}>
        <Ionicons name="md-swap" size={32} />
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  containerMarginStyles: {
    marginTop: 30,
    marginRight: 20
  },
  switchCameraDirectionStyles: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  flipCameraTextStyle: {
    fontSize: 18,
    marginBottom: 10,
    color: "white"
  },
  cameraStyle: {
    flex: 1
  }
});

export default CameraUITop;
