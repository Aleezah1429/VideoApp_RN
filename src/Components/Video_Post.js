import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker/lib/commonjs';
import storage, {firebase} from '@react-native-firebase/storage';
// import * as ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {All_Videos_Style, Model, Home_Style} from '../../style';
import Svg, {Path} from 'react-native-svg';
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
import {color} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {TouchableHighlight} from 'react-native-gesture-handler';

function Video_Post(props) {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [uri, seturi] = useState('');
  const [imageName, setimageName] = useState('');
  const [videoName, setvideoName] = useState('');

  const [thumbnail, setthumbnail] = useState('');
  const views = 0;
  const likes = 0;
  const dislikes = 0;
  const user = props.userInfo.Name;
  var visible = props.isModalVisible;
  const [isModalVisible, setModalVisible] = useState(visible);

  const toggleModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  // __SAVE DATA___

  const post_video = () => {
    firebase
      .storage()
      .ref('/Videos' + videoName)
      .getDownloadURL()
      .then(url => {
        console.log('video', url);

        //from url you can fetched the uploaded Video easily
        seturi(url);
      })
      .catch(e => console.log('getting downloadURL of Video error => ', e));
    firebase
      .storage()
      .ref('/Thumbnails' + imageName)
      .getDownloadURL()
      .then(url => {
        console.log('thumbnail', url);
        //from url you can fetched the uploaded image easily
        setthumbnail(url);
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));

    if (
      title == '' &&
      description == '' &&
      category == '' &&
      uri == '' &&
      thumbnail == ''
    ) {
      ToastAndroid.show('Fill all the fields', ToastAndroid.SHORT);
    } else {
      firestore()
        .collection('Videos')
        .doc(title)
        .set({
          title,
          description,
          uri,
          thumbnail,
          likes,
          dislikes,
          views,
          category,
          user,
        });
      ToastAndroid.show('Video posted', ToastAndroid.SHORT);
    }
  };

  // ___THUMBNAIL FUNC___
  const selectThumbnail = () => {
    const options = {
      title: 'Select Thumbnail',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        console.log('Uri', uri);
        // const imageName = title+"_thumbnail"
        setimageName(title + '_thumbnail')
        console.log("sshxvsbxsbsksbsxlbsbskbsbsb",imageName)
        firebase
          .storage()
          .ref(`/Thumbnails/${imageName}`)
          .putFile(uri)
          .then(snapshot => {
            //You can check the image is now uploaded in the storage bucket
            console.log(`${imageName} has been successfully uploaded.`);
          })
          .catch(e => console.log('uploading image error => ', e));

        // __Retrieve Image From Firebase Cloud Storage__
      }
    });
  };

  // ___select video function to open video library__
  const selectVideo = () => {
    ImagePicker.showImagePicker(
      {mediaType: 'video', includeBase64: true,title:"Select Video"},
      response => {
        if (response.didCancel) {
          console.log('User cancelled Video picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri = response.uri;

          console.log('VideoUri', uri);

          // const videoName = title+"_video"
          setvideoName(title + '_video');
          firebase
            .storage()
            .ref(`/Videos/${videoName}`)
            .putFile(uri)
            .then(snapshot => {
              //You can check the Video is now uploaded in the storage bucket
              console.log(`${videoName} has been successfully uploaded.`);
            })
            .catch(e => console.log('uploading Video error => ', e));

          // __Retrieve Video From Firebase Cloud Storage__
        }
      },
    );
  };

  return (
    <>
      <Modal isVisible={isModalVisible}>
        <LinearGradient colors={['#0cbaba', '#380036']}>
          <TouchableOpacity onPress={() => toggleModal()}>
            <View style={{alignSelf: 'flex-end', margin: '2%', padding: '2%'}}>
              <Icon name="close-outline" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <View
            style={{
              color: 'white',
              alignItems: 'center',
              padding: '15%',
              marginTop: '-10%',
            }}>
            <View>
              <Text style={{fontSize: 35, color: 'white', fontWeight: 'bold'}}>
                Add Video
              </Text>
            </View>

            <View style={Model.field}>
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={e => settitle(e)}
              />
            </View>

            <View style={Model.field}>
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={e => setdescription(e)}
              />
            </View>

            <View>
              <Picker
                style={Model.Picker}
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) =>
                  setcategory(itemValue)
                }>
                <Picker.Item label="Nature" value="Nature" />
                <Picker.Item label="Music" value="Music" />
                <Picker.Item label="Animals" value="Animals" />
                <Picker.Item label="Funny" value="Funny" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Sports" value="Sports" />
                <Picker.Item label="Action" value="Action" />
              </Picker>
            </View>

            <View
              style={{
                padding: '1%',
                backgroundColor: '#380036',
                alignSelf: 'flex-start',
                marginBottom: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <Icons name="image-plus" size={35} color={'white'} />
              <Text
                onPress={() => selectThumbnail()}
                style={Home_Style.ButtonStyle}>
                Add Thumbnail
              </Text>
            </View>

            <View
              style={{
                paddingRight: '10%',
                backgroundColor: '#380036',
                alignSelf: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <Icons name="video-plus" size={40} color={'white'} />

              <Text
                onPress={() => selectVideo()}
                style={Home_Style.ButtonStyle}>
                Add Video
              </Text>
            </View>

            <View
              style={{
                marginTop: '10%',
                paddingLeft: '10%',
                paddingRight: '10%',
                backgroundColor: '#380036',
              }}>
              <Text onPress={() => post_video()} style={Home_Style.ButtonStyle}>
                POST
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
  };
}

export default connect(mapStateToProps, null)(Video_Post);