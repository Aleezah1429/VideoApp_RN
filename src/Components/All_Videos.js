
 import React, { useState, useEffect, useRef } from 'react';


 import {
     SafeAreaView,
     ScrollView,
     StatusBar,
     StyleSheet,
     Text,
     View,
     Image,
     FlatList,TouchableOpacity
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
import VideoCard from "./VideoCard"
import { add } from 'react-native-reanimated';
import {connect} from "react-redux"
import {changeisvideotitle} from "../Store/action/index"


 
 
 function All_Videos(props) {
    const [videoslist,setvideoslist]=useState([])
    const addVideo=[]
     useEffect(()=>{

    firestore().collection("Videos").onSnapshot(snapshot=>{
       
             snapshot.forEach(data=>{
                if(props.category==data.data().category)
                addVideo.push(data.data())
             })
            //  console.log("aaa",addVideo)
         setvideoslist(addVideo)
             
         })
     },[])


     const openVideo=(title)=>{
         props.changeisvideotitle(title)
         props.navigation.navigate("Video")

     }
    
     return (
         
         <>
         {console.log(videoslist.length)}
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
 
             <LinearGradient colors={["#0cbaba", "#380036"]} style={{ alignSelf: "center", height: '100%', width: '100%' }}>
            {(videoslist.length!==0)? 
             <FlatList style={{marginBottom:"15%"}}
             data={videoslist}
      renderItem={(element)=>{
        return(
            
        <TouchableOpacity activeOpacity={0.7} onPress={()=>openVideo(element.item.title)}  >
            <VideoCard label={element.item.user[0].toUpperCase()} key={element.index} uri={element.item.uri} thumbnail={element.item.thumbnail} title={element.item.title} views={element.item.views} />

              </TouchableOpacity> )
              }
      }
      keyExtractor={(element)=>element.title}
      
      ></FlatList>
      :
      <View style={{flex:1,justifyContent:"center"}}>
          {console.log("helllooo")}
          <Text style={{fontSize:30,fontWeight:"bold",color:"black",textAlign:"center"}}> NO VIDEOS TO SHOW</Text>
          </View>}
                 
             </LinearGradient>
 
 
 
         </>
     );
 }
 
 function mapStateToProps(state) {
    return {
      category:state.category,
      videoTitle:state.videoTitle
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeisvideotitle: (videoTitle) => dispatch(changeisvideotitle(videoTitle))
    }
  }

 

  export default connect(mapStateToProps,mapDispatchToProps)(All_Videos)