import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Body,
  Title,
  Text
} from "native-base";

import CameraView from "./CameraView";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class App extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <CameraView height={SCREEN_HEIGHT} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  },
  content: {
    flex: 1,
    height: SCREEN_HEIGHT
  }
});
