import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from '../Components/Home';
import All_Videos from '../Components/All_Videos';
import Categories from '../Components/Categories';
import Channel from '../Components/Channel';
import Video_Post from '../Components/Video_Post';
import Video from '../Components/Video';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Search from '../Components/Search';






const Stack = createStackNavigator(); 

export default function Navigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="All_Videos" component={All_Videos} options={{ headerShown: false }}/>
                <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
                <Stack.Screen name="Channel" component={Channel} options={{ headerShown: false }} />
                <Stack.Screen name="Video_Post" component={Video_Post} options={{ headerShown: false }} />
                <Stack.Screen name="Video" component={Video} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}