import React, { Component } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import MainLayout from './src/layouts/Main';
import { Linking, LogBox } from 'react-native';
 
const Stack = createStackNavigator()
const linking = {
  prefixes: ['myapp://returnapp', '']
}

export default class App extends Component{

  // componentDidMount() { // B
  //   if (Platform.OS === 'ios') {
  //     Linking.getInitialURL().then(url => {
  //       console.log(url)
  //     });
  //   } else {
  //       //Linking.addEventListener('url', this.handleOpenURL);
  //     }
  //   }
    
  //   componentWillUnmount() { // C
  //     Linking.removeEventListener('url', this.handleOpenURL);
  //   }
  //   handleOpenURL = (event) => { // D
  //     console.log('URL' +event.url)
  //   }

  render(){
   LogBox.ignoreLogs(['Warning:'])
    //LogBox.ignoreAllLogs()
    return (
      <>
          {/* <View style={styleData.darkStatusBar}>
            <StatusBar
              barStyle='light-content'/>
          </View>
          <TopHomeBar />
          <Router/> */}
          <NavigationContainer linking={linking}>
              <Stack.Navigator>
                  <Stack.Screen name="MainLayout" component={MainLayout} options={{headerShown: false}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </>
    );
  }
  
};