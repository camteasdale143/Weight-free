import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Button
} from "react-native";
import { Camera, Permissions, ImagePicker } from "expo";
import CameraUIBottom from "./CameraUIBottom";
import CameraUITop from "./CameraUITop";
import PhotoPreSend from "./PhotoPreSend";
import Tips from "./tips";
import axios from "axios";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasImageLibraryPermissions: null,
      type: Camera.Constants.Type.back,
      takenPhoto: null,
      image: null,
      photoSent: false
    };

    this.flipCamera = this.flipCamera.bind(this);
    this.snapPhoto = this.snapPhoto.bind(this);
    this.getView = this.getView.bind(this);
    this.renderCamera = this.renderCamera.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasImageLibraryPermissions: status2 === "granted" });
  }

  flipCamera() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  async snapPhoto() {
    try {
      console.log("got photo");
      if (this.refs.camera) {
        console.log("recognized camera");
        await this.setState({
          takenPhoto: await this.refs.camera.takePictureAsync()
        });
      }
      console.log(this.state.takenPhoto);
    } catch (err) {
      alert(err);
    }
  }

  async pickImage() {
    this.setState({
      takenPhoto: await this._pickImage.call(this)
    });
  }

  deletePhoto() {
    this.setState({
      takenPhoto: null
    });
  }

  async sendPhoto() {
    // const binaryData = await axios.get(this.state.takenPhoto.uri);
    // console.log(binaryData);
    // const response = await axios({
    //   method: "post",
    //   url: "https://api.imgur.com/3/image",
    //   headers: {
    //     Authorization: "Client-ID 8e6d21014354173",
    //     Authorization:
    //       "Bearer d091830d779b22c95d7e575e10bc3b9239bdf3b017ba0ae3f35624a24b9af420"
    //   },
    //   data: {
    //     image: null //await base64Img.getBase64String(this.state.takenPhoto.uri)
    //   }
    // });
    this.setState({
      photoSent: true
    });
    // console.log(response);
  }

  resetState() {
    this.setState({
      takenPhoto: null,
      image: null,
      photoSent: false
    });
  }
  renderCamera() {
    const { cameraViewContainerStyles } = styles;
    const {
      flexOne,
      takePictureButtonContainer,
      takePictureButton,
      flipCameraTextStyle
    } = styles;
    return (
      <View
        style={[
          cameraViewContainerStyles,
          { width: this.props.width, height: this.props.height }
        ]}
      >
        <Camera ref="camera" style={{ flex: 1 }} type={this.state.type}>
          <Image
            source={require("./BODY_OUTLINE.png")}
            style={{
              position: "absolute",
              width: "85%",
              height: "85%",
              left: 30
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              position: "absolute",
              left: "26%",
              top: "78%",
              color: "#fff"
            }}
          >
            Allign Your Body with the outline
          </Text>
          <View style={styles.uiTopContainerStyles}>
            <CameraUITop flipCamera={this.flipCamera} />
          </View>
          <View style={styles.uiBottomContainerStyles}>
            <CameraUIBottom
              snapPhoto={this.snapPhoto}
              photoPicker={this.pickImage.bind(this)}
            />
          </View>
        </Camera>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (result.cancelled) {
      console.log("CANCEL");
      return null;
    }
    return result;
  };

  getView() {
    if (this.state.takenPhoto !== null) {
      return (
        <View
          style={[
            styles.cameraViewContainerStyles,
            { width: this.props.width, height: this.props.height }
          ]}
        >
          <PhotoPreSend
            uri={this.state.takenPhoto.uri}
            onDeletePhoto={this.deletePhoto.bind(this)}
            onSendPhoto={this.sendPhoto.bind(this)}
            imageFlipped={this.state.type === Camera.Constants.Type.front}
          />
        </View>
      );
    } else {
      return this.renderCamera();
    }
  }

  render() {
    const { cameraViewContainerStyles } = styles;
    const {
      flexOne,
      takePictureButtonContainer,
      takePictureButton,
      flipCameraTextStyle
    } = styles;
    const { hasCameraPermission, hasImageLibraryPermissions } = this.state;
    if (this.state.photoSent) {
      return (
        <Tips height={SCREEN_HEIGHT} resetState={this.resetState.bind(this)} />
      );
    } else if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return this.getView();
    }
  }
}

const styles = StyleSheet.create({
  uiTopContainerStyles: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  uiBottomContainerStyles: {
    alignItems: "center",
    justifyContent: "center"
  },
  cameraViewContainerStyles: {
    backgroundColor: "orange",
    flex: 1,
    justifyContent: "center"
  }
});
