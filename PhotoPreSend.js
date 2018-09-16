import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground
} from "react-native";
import { Camera, Permissions } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class PhotoPreSend extends Component {
  constructor(props) {
    super(props);
    this.renderXButton = this.renderXButton.bind(this);
    this.getImageStyles = this.getImageStyles.bind(this);
    this.renderSendButton = this.renderSendButton.bind(this);
    this.getIconStyles = this.getIconStyles.bind(this);
  }

  async componentWillMount() {}

  renderXButton() {
    var alignSelfDirection = this.props.imageFlipped
      ? "flex-start"
      : "flex-end";
    return (
      <TouchableOpacity
        onPress={this.props.onDeletePhoto}
        style={{ alignSelf: alignSelfDirection }}
      >
        >
        <Ionicons
          style={[
            this.getIconStyles(this.props.imageFlipped),
            { marginVertical: 30, marginHorizontal: 20 }
          ]}
          name="md-close"
          size={32}
        />
      </TouchableOpacity>
    );
  }

  renderSendButton() {
    return (
      <TouchableOpacity onPress={this.props.onSendPhoto}>
        >
        <Ionicons
          style={[
            this.getIconStyles(this.props.imageFlipped),
            { paddingTop: 5, paddingBottom: 10 }
          ]}
          name="md-checkmark"
          size={50}
        />
      </TouchableOpacity>
    );
  }

  getImageStyles(imageFlipped) {
    return imageFlipped ? styles.imageFlippedStyle : styles.imageStyle;
  }

  getIconStyles(imageFlipped) {
    return imageFlipped ? styles.iconFlippedStyle : styles.iconStyle;
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <ImageBackground
          source={{ uri: this.props.uri }}
          style={this.getImageStyles(this.props.imageFlipped)}
        >
          <LinearGradient
            colors={["transparent", "transparent", "rgba(0,0,0,0.6)"]}
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 5,
              flex: 1,
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            {this.renderXButton()}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.renderSendButton()}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1
  },
  imageStyle: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    transform: [{ scaleX: 1 }]
  },
  imageFlippedStyle: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    transform: [{ scaleX: -1 }]
  },
  iconStyle: {
    color: "#fff",
    transform: [{ scaleX: 1 }]
  },
  iconFlippedStyle: {
    color: "#fff",
    transform: [{ scaleX: -1 }]
  }
});
