import React, { useState, useEffect, useRef } from 'react';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { All_Videos_Style } from "../../style";
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
import firestore from '@react-native-firebase/firestore';



function VideoCard(props) {
    return (

        <View style={{ borderColor: "black", borderWidth: 2, paddingBottom: "5%", marginBottom: "10%" }}>
            <View style={{}}>
                <Image source={{ uri: props.thumbnail }} style={{ paddingBottom: "60%", marginBottom: "3%" }} />
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: "4%", justifyContent: "space-between" }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View>
                        <Avatar.Text
                            labelStyle={{ fontWeight: "bold" }}
                            label={props.label}
                            size={60}
                        />
                    </View>

                    <View style={{ marginLeft: "5%" }} >
                        <Text style={All_Videos_Style.TextStyle}>{props.title}</Text>
                        <Text style={All_Videos_Style.TextStyle2}>{props.views} Views</Text>
                    </View>
                </View>

            </View>
        </View>

    );
}


export default VideoCard;