import React, { useState, useEffect, useRef } from 'react';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from 'react-native';

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Button,
} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import { Home_Style } from "../../style.js"
import { changeisuser } from "../Store/action/index"
import { connect } from "react-redux"
// import Svg, { Path } from 'react-native-svg';
// import Icon from 'react-native-vector-icons/Ionicons';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])
  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}


function Home(props) {


  const [translation, setTranslation] = useState(0);
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setTranslation(i);
      }, 50 * i);
    }
  }, []);


  return (
    <>
      <LinearGradient colors={["#0cbaba", "#380036"]} style={{ alignSelf: "center", height: '100%', width: '100%' }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{transform: [{ translateY: translation }], }} source={require("../Images/Logo.png")} width={'70%'} height={'60%'} />
          <FadeInView >
            <Text title="Login" onPress={() => props.navigation.navigate("Login")} style={Home_Style.MainHeadingStyle}>VIDEOEX</Text>
          </FadeInView>
        </View>

        <View style={{
          marginBottom: '5%', backgroundColor: "#380036", width: '40%', alignSelf: "center",
        }}>
          <Text onPress={() => props.navigation.navigate("Signup")} style={Home_Style.ButtonStyle}>SignUp</Text>
        </View>

        <View style={{ marginBottom: '20%', backgroundColor: "#380036", width: '40%', alignSelf: "center", }}>
          <Text onPress={() => props.navigation.navigate("Login")} style={Home_Style.ButtonStyle}>Login</Text>
        </View>
      </LinearGradient>



    </>
  );
}

export default Home;