import React, { Component } from "react";
import styleData from '../values/style'
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
    Platform,
} from 'react-native';
import Router from "./bottom_tabs/Router";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../material/color";
export default class MainLayout extends Component {

    constructor(props){
        super(props)

        this.state = {
            isFirst :false,
            
        }
    }

    // componentDidMount() { // B
    //     if (Platform.OS === 'ios') {
    //       Linking.getInitialURL().then(url => {
    //         console.log(url)
    //       });
    //     } else {
    //         //Linking.addEventListener('url', this.handleOpenURL);
    //       }
    //     }
        
    //     componentWillUnmount() { // C
    //       Linking.removeEventListener('url', this.handleOpenURL);
    //     }
    //     handleOpenURL = (event) => { // D
    //       console.log('URL' +event.url)
    //     }

    componentDidMount(){
        AsyncStorage.setItem('splash', '')
        this.setState({isFirst: false})
    }
    componentDidUpdate(){
        (async () => {
            var first = await AsyncStorage.getItem('splash')
            if(first == 'pass'){
                AsyncStorage.setItem('splash', '')
                this.setState({isFirst: true})
            }
        })()
    }
    render() {
        return (
           <> 
           {this.state.isFirst && 
           <View style={styleData.darkStatusBar}>
                <StatusBar
                    backgroundColor={color.defaultColor}
                    translucent={true}
                    barStyle='light-content' />
            </View>}

            {(Platform.OS == 'android' && !this.state.isFirst) ? 
                <StatusBar
                    backgroundColor="transparent"
                    barStyle='dark-content' 
                    translucent={true} />
            : null
            }
            
            <Router/>
        </>
        )
    }
}