'use strict'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Video from 'react-native-video'
import color from '../../material/color'
import ukuran from '../../material/dimen'
const LoadingAnimationLayout = (props) => {


    return(
        <>
            <View style={styleSplash.parent}>
                <View style={{flex:1, backgroundColor: color.white}}> 
                   <Video source={require('../../../assets/gif/yoga-animation.mp4')}
                     style={styleSplash.videoBackground} rate={2} repeat={true} resizeMode="contain"/>
                </View>
            </View>
        </>
    )
}

const styleSplash = StyleSheet.create({
    parent: {
        flex: 1,
       backgroundColor: color.white
    },

    videoBackground: {
        flex: 1,
        width: ukuran.wpMatchParent,
    }
})

export default LoadingAnimationLayout