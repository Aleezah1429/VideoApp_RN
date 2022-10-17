import React, { useState, useEffect, useRef } from 'react';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { All_Videos_Style, Categories_Style } from "../../style";
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Appbar,
    DarkTheme,
} from 'react-native-paper';
import { changeiscategory } from '../Store/action';
import { connect } from "react-redux"




function Categories(props) {
    const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(true);

    useEffect(() => {
        props.navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
  
          // Prompt the user before leaving the screen
          Alert.alert(
            'Log Out?',
            'Are You sure you want to logout?',
            [
              { text: "Log Out", style:"default", onPress: () => {props.navigation.dispatch(e.data.action)} },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
            ]
          );
        }),
      [props.navigation, hasUnsavedChanges]
})

        const ChangeCategory=(category)=>{
            props.changeiscategory(category)
            props.navigation.navigate("All_Videos")
        }
        

    return (
        <>
            <Appbar theme={DarkTheme} style={All_Videos_Style.AppBarStyle}>
                <Image source={require('../Images/Logo.png')} style={{ height: '70%', margin: 5, width: '10%', }} />
                <Text style={All_Videos_Style.HeadingStyle}>VIDEOEX</Text>
                <Appbar.Action
                    icon="account-circle"
                    onPress={() => props.navigation.navigate("Channel")}
                    style={{ marginLeft: '30%' }}
                />
                <Appbar.Action icon="magnify" onPress={() => props.navigation.navigate("Search")} />

            </Appbar>

                <ScrollView  contentContainerStyle={{ paddingBottom:"180%", backgroundColor:'#380036'}}>
                    <LinearGradient colors={["#0cbaba", "#380036"]} style={{ height: '100%', width: '100%', }}>

                    <TouchableOpacity activeOpacity={0.6} onPress={()=>ChangeCategory("Nature")} style={{margin:15}}>
                        <ImageBackground source={require('../Images/nature_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>NATURE</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Music")} activeOpacity={0.6} style={{bottom: '37%', margin: 15 }}>
                        <ImageBackground source={require('../Images/music_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>MUSIC</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Animals")} activeOpacity={0.6} style={{bottom: '74%', margin: 15 }}>
                        <ImageBackground source={require('../Images/animals_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>ANIMALS</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Funny")} activeOpacity={0.6} style={{bottom: '111%', margin: 15 }}>
                        <ImageBackground source={require('../Images/funny_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>FUNNY</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Sports")} activeOpacity={0.6} style={{bottom: '148%', margin:15 }}>
                        <ImageBackground source={require('../Images/sports_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>SPORTS</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Action")} activeOpacity={0.6} style={{bottom: '185%', margin:15 }}>
                        <ImageBackground source={require('../Images/action_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>ACTION</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>ChangeCategory("Education")} activeOpacity={0.6} style={{bottom: '222%', margin:15 }}>
                        <ImageBackground source={require('../Images/education_bg.jpg')} style={{ height: '60%', width: '100%', }} >
                            <Text style={Categories_Style.Category_text}>EDUCATION</Text>
                        </ImageBackground>
                    </TouchableOpacity>


                    </LinearGradient>

                </ScrollView>
        </>
    );
}

function mapStateToProps(state) {
    return {
      category:state.category
    }
  }
  
  
  function mapDispatchToProps(dispatch) {
    return {
      changeiscategory: (category) => dispatch(changeiscategory(category))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Categories)
  