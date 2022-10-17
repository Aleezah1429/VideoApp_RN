import React, { useState,useEffect } from 'react';
import { Video_Style } from "../../style";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { All_Videos_Style } from "../../style";


import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Appbar,
  DarkTheme,
  IconButton,
  TextInput,Button
} from 'react-native-paper';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';
import VideoPlayer from "react-native-video-player"
import firestore from '@react-native-firebase/firestore';
import { connect } from "react-redux"


import Share from "react-native-share"

const Video = (props) => {
  const[avideo,setaVideo] = useState({})
  const[show,setshow] = useState(false)
  const[text,setText] = useState("")
  const [likebutton,setlikebutton]=useState("thumbs-up-outline")
  const [dislikebutton,setdislikebutton]=useState("thumbs-down-outline")
  const [comments,setComments]=useState([])
  






useEffect(()=>{
  firestore().collection("Videos").doc(props.videoTitle).get().then(
    data=>{
      setaVideo(data.data())
    }
  );
  firestore().collection("Comments").doc(props.videoTitle).get().then(
    data=>{
      console.log("AAAAA",data.data())
      if(data.data()!=undefined){
      setComments(Object.entries(data.data()))}
    }
  )


},[avideo])


const onComment = (text)=>{
  firestore().collection("Comments").doc(props.videoTitle).get().then(data=>{
    var obj={}
    if(data.data()!=undefined){
    obj=data.data()}

  obj[props.userInfo.Name]=text
  firestore().collection("Comments").doc(props.videoTitle).set(obj)
  })
}


const onShare= async()=>{
  const shareOptions={
   url:avideo.uri
  
  }
  const ShareResponse= await Share.open(shareOptions)

}
const onShow= ()=>{
  if(show==true){
    setshow(false)
  }
  else{
    setshow(true)
  }

}

  const onLike=()=>{
        if(likebutton=="thumbs-up-outline"){
          const likes = avideo.likes
          setlikebutton("thumbs-up")
          firestore().collection('Videos').doc(props.videoTitle).update({likes:likes+1})

        }
        else{
          const likes = avideo.likes
          setlikebutton("thumbs-up-outline")
          firestore().collection('Videos').doc(props.videoTitle).update({likes:likes-1})
        }
  }

  const ondisLike=()=>{
    if(dislikebutton=="thumbs-down-outline"){
      const dislikes = avideo.dislikes
      setdislikebutton("thumbs-down")
      firestore().collection('Videos').doc(props.videoTitle).update({dislikes:dislikes+1})

    }
    else{
      const dislikes = avideo.dislikes
      setdislikebutton("thumbs-down-outline")
      firestore().collection('Videos').doc(props.videoTitle).update({dislikes:dislikes-1})
    }
}

const onView=()=>{
      const views = avideo.views
      firestore().collection('Videos').doc(props.videoTitle).update({views:views+1})

}

  return (
    <LinearGradient colors={["#0cbaba", "#380036"]} style={{ alignSelf: "center", height: '100%', width: '100%' }}>

      <View onStartShouldSetResponder={()=>console.log("pressed")}>
        <VideoPlayer video={{ uri:avideo.uri }}
          videoHeight={250}
          videoWidth={450}
          thumbnail={{ uri: avideo.thumbnail }}
          autoplay={false}
          resizeMode={"cover"}  
          onStart={()=>onView()}
        />

        <View  style={{ marginLeft: '1%', marginTop: '2%' }}>
        <Text style={Video_Style.TextStyle}>{avideo.title}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={Video_Style.TextStyle2}>{avideo.views} Views  </Text>
            <Icon style={{marginLeft:"70%"}} size={20} name="caret-down" onPress={()=>onShow()}/>
            </View>
            {(show==true)?<View >
              <Text style={{fontSize:20,marginLeft:10,marginBottom:10,fontFamily:"sans-serif-medium"}}>{avideo.description}</Text>
            </View>:<View ></View>}
            
            
        </View>

        <View style={{ flexDirection: 'row', }}>
          <View style={{ marginLeft: '13%', marginTop: '4%' }}>
            <Icon name={likebutton}
              size={30}
              color='white'
              onPress={() => onLike()}
            />
            <Text style={{color:'white',marginTop:5,marginLeft:5}}>{avideo.likes}</Text>
          </View>
          <View style={{ marginLeft: '25%', marginTop: '4%' }}>
            <Icon name={dislikebutton}
              size={30}
              color='white'
              onPress={() => ondisLike()}
            />
            <Text style={{color:'white',marginTop:5,marginLeft:5}}>{avideo.dislikes}</Text>
          </View>
          <View style={{ marginLeft: '25%', marginTop: '4%' }}>
            <Icon name={"arrow-redo-outline"}
              size={30}
              color='white'
              onPress={() => onShare()}
            />
            <Text style={{color:'white',marginTop:5}}>Share</Text>
          </View>
        </View>
       
        
        
      </View>
      
   
      <View> 
          <Text style={{color:'white',margin:10,fontSize:20,textDecorationLine:"underline"}}>Comments</Text>
          </View>
       
     <ScrollView >
      
    <View style={{margin:"2%"}}>
          <TextInput
          style={{fontSize:20}}
          outlineColor="white"
          selectionColor="white"
      mode="outlined"
      placeholder="Your Comment"
      theme={{colors:{text:"white",background:"transparent",placeholder:"white",primary:"white",underlineColor:"transparent"}}}
      value={text}
      onChangeText={text => setText(text)}
    />
    <Button style={{width:"40%",alignSelf:"flex-end"}} mode="contained" color={"#132280"} onPress={() => onComment(text)}>
    Comment
  </Button>
        </View>
        {console.log(comments)}
       {comments.length!=0?
        comments.map((element)=>{
        return(
          <View key={element}>
          
           <View  style={{alignItems: 'center', flexDirection: 'row',marginLeft:"5%",marginTop:"10%" }}>
           <View>
               <Avatar.Text
                  label={element[0][0]}
                  labelStyle={{fontWeight:"bold"}}
                   size={60}
               />
           </View>
           <View style={{marginLeft: '3%' }}>
             <Text style={All_Videos_Style.TextStyle}>{element[0]}</Text>
               <Text style={All_Videos_Style.TextStyle2}>{element[1]}</Text>
           </View>
       </View>
</View>
               )
        }):
        <View style={{flex:1,justifyContent:"center",marginTop:"10%"}}>
          {/* {console.log("nklfnvfnvflkvbfb")} */}
          <Text style={{fontSize:20,fontWeight:"bold",color:"black",textAlign:"center"}}> NO COMMENTS</Text>
        </View>
        }
                    
      
      </ScrollView>
 


    </LinearGradient>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    videoTitle:state.videoTitle
  }
}


export default connect(mapStateToProps)(Video)