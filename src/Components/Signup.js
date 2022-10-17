import * as React from 'react';
import { View, Text, Button, TextInput,Alert,ToastAndroid } from 'react-native';
// import database from "@react-native-firebase/database";
import { useState } from 'react';
import {Signup,Home_Style} from "../../style.js"

import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';


function UserSignUp(props) {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
   const [alreadyExist,setAlreadyexist] = useState("")
  // const [pass, setPass] = useState("");

  const save_data=()=>{
    var emailSplit=email.split("@")
 firestore().collection("Users").doc(emailSplit[0]).get().then(snapshot=>{setAlreadyexist(snapshot.exists)})
  // console.log(alreadyExist)
  if(alreadyExist){
    ToastAndroid.show("User already exist",ToastAndroid.SHORT)
    props.navigation.navigate("Login")
  }
  else{
    firestore().collection('Users').doc(emailSplit[0]).set({Name,email,pass}).then(props.navigation.navigate("Login"))
  }
  }
  
  return (

    <LinearGradient colors={["#0cbaba","#380036"]} style={Signup.mainView}>
      <View>
        <Text style={{ fontSize: 50, color: "white", fontWeight: 'bold',marginBottom:10 }}>SignUp</Text>
      </View>
      <View style={Signup.field}>
        <TextInput value={Name} onChangeText={(e) => setName(e)} placeholder="Name" />
      </View>
      <View style={Signup.field}>
        <TextInput value={email} keyboardType={"email-address"} onChangeText={(e)=>setEmail(e)} placeholder="Email"/>
      </View>
      <View style={Signup.field}>
        <TextInput secureTextEntry={true} value={pass} onChangeText={(e) => setPass(e)} placeholder="Password" />
      </View>

    <View style={{margin:"10%",paddingLeft:"3%",paddingRight:"3%",backgroundColor:"#380036"}}>
    <Text onPress={()=>save_data()} style={Home_Style.ButtonStyle}>Signup</Text>
    </View>
    </LinearGradient>
  );
}

export default UserSignUp;