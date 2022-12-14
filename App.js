import React from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import {Provider} from "react-redux"
 import store from './src/Store';
 import Navigator from "./src/Config/Navigation"
 
 
 const App = () => {
  //  const isDarkMode = useColorScheme() === 'dark';
 
  //  const backgroundStyle = {
  //    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //  };
 
   return (
     <Provider store={store}>
 
     <Navigator/>
 
     </Provider>
   );
 };
 
 
 export default App;