import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CameraUIBottom = props => (
  <View style={styles.containerStyles}>
    <TouchableOpacity onPress={props.photoPicker}>
      <Ionicons name="md-photos" size={32} style={{ color: "white" }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={props.snapPhoto}>
      <View style={styles.takePhotoButtonStyles} />
    </TouchableOpacity>
    <View />
  </View>
);

//
const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
    width: "100%"
  },
  takePhotoButtonStyles: {
    borderRadius: 15,
    width: 60,
    height: 60,
    borderWidth: 10,
    borderColor: "white"
  }
});
export default CameraUIBottom;
