import * as React from 'react';
import { View, Text,Button,FlatList,StyleSheet,SafeAreaView,ScrollView, Settings,Image,TouchableOpacity} from 'react-native';
import {Searchbar,Appbar,DarkTheme} from "react-native-paper";
import { useState,useEffect } from 'react';
import {connect } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { All_Videos_Style, Categories_Style } from "../../style";
import LinearGradient from 'react-native-linear-gradient';
import VideoCard from "./VideoCard"
import {changeisvideotitle} from "../Store/action/index"





const Search = (props) => {
    const [searchQuery, setSearchQuery] =useState('');
    const [videolist,setVideolist]=useState([])
   
    

useEffect(()=>{
  setVideolist([])
firestore().collection("Videos").onSnapshot(snapshot=>{
       
  snapshot.forEach(data=>{
    var searchin=data.data().title.split(" ")
    if(searchin.includes(searchQuery) || searchin.includes(searchQuery.toUpperCase()) || 
    searchin.includes( searchQuery.toLowerCase())){
      setVideolist(list=>[...list,data.data()])

    }
     
  })

})
},[searchQuery])

  
const openVideo=(title)=>{
  props.changeisvideotitle(title)
  props.navigation.navigate("Video")

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
            <LinearGradient colors={["#0cbaba", "#380036"]} style={{ height: '100%', width: '100%', }}>
      <Searchbar  style={{width:"100%",backgroundColor:"transparent",marginBottom:"10%"}}
        placeholder="Search Video..."
        onChangeText={(searchQuery)=>setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      <FlatList data={videolist}
      renderItem={(element)=>{
       
        return(
          <TouchableOpacity activeOpacity={0.7} onPress={()=>openVideo(element.item.title)} >
          <VideoCard label={element.item.user[0].toUpperCase()} uri={element.item.uri} thumbnail={element.item.thumbnail} title={element.item.title} views={element.item.views} />
          </TouchableOpacity>
               )
              }
      
      }
      keyExtractor={(element)=>element.title}
      
      ></FlatList>
    </LinearGradient>
      </>
    );
  };
  
  function mapStateToProps(state) {
    return {
        userInfo:state.userInfo,
        videoTitle:state.videoTitle
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeisvideotitle: (videoTitle) => dispatch(changeisvideotitle(videoTitle))
    }
  }


  
  export default connect(mapStateToProps,mapDispatchToProps)(Search)