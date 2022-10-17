import React, { useState, useEffect, useRef } from 'react';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { All_Videos_Style } from "../../style";
import Svg, { Path } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import VideoCard from "./VideoCard"
import Video_Post from './Video_Post';
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
import {connect } from "react-redux"
import {changeisvideotitle} from "../Store/action/index"
import { TouchableOpacity } from 'react-native-gesture-handler';



function Channel(props) {
  const[show,setshow] = useState(false)
  const [videoslist,setvideoslist]=useState([])
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


    const onShow= ()=>{
        if(show==true){
          setshow(false)
        }
        else{
          setshow(true)
        }
      
      }

    
    useEffect(()=>{
  const addVideo=[]


    firestore().collection("Videos").onSnapshot(snapshot=>{
       
             snapshot.forEach(data=>{
                if(props.userInfo.Name==data.data().user)
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

                <View style={{ flexDirection: 'row', margin: '7%' }}>
                    <View>
                         <Avatar.Text
                         style={{backgroundColor:"black"}}
                           label={props.userInfo.Name[0].toUpperCase()}
                            size={60}
                        />
                    </View>
                    <View style={{ marginLeft: '3%' }}>
                        <Text style={All_Videos_Style.TextStyle}>{props.userInfo.Name}</Text>
                        <Text style={All_Videos_Style.TextStyle2}>{props.userInfo.email}</Text>
                        <View style={{marginTop:"6%"}}>
                            <Text style={{marginLeft:"45%",fontSize:20}}>Show videos</Text>
                        <Icon style={{marginLeft:"85%",marginTop:"-7%"}} size={20} name="caret-down" onPress={()=>onShow()}/>
                       </View>
                    </View>
                    
                </View>
                {(show==true)?(videoslist.length!==0)? 
                <ScrollView style={{paddingBottom:"140%"}}>
            
             {videoslist.map((element,index)=>{
                 return(
            
        <>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>openVideo(element.title)}>
            <VideoCard label={element.user[0].toUpperCase()} key={index} uri={element.uri} thumbnail={element.thumbnail} title={element.title} views={element.views} />
            </TouchableOpacity>
              </> )
              }
      )}
      </ScrollView>
      :
      <View style={{flex:1,justifyContent:"center"}}>
          <Text style={{fontSize:30,fontWeight:"bold",color:"black",textAlign:"center"}}> NO VIDEOS TO SHOW</Text>
          </View>
                 :<View ></View>}

                <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:"40%" }}>
                    <Image source={require('../Images/video.png')} style={{ height: '50%', width: '50%', marginTop:'-15%'}} />

                    <View style={{marginTop:'8%',width:'40%'}}>
                        <Button
                            title="Add Video"
                            color="#0cbaba"
                            onPress={()=>toggleModal()}

                        >
                        </Button>
                        <Video_Post isModalVisible={isModalVisible}/>
                    </View>
                </View>




            </LinearGradient>



        </>
    );
}

function mapStateToProps(state) {
    return {
      userInfo: state.userInfo,
      videoTitle:state.videoTitle

    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      changeisvideotitle: (videoTitle) => dispatch(changeisvideotitle(videoTitle))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Channel)
