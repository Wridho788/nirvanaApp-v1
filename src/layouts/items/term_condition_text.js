'use strict'
import React from 'react'
import {Text, Linking} from 'react-native'
import color from '../../material/color'
import Constant from '../../material/constant'
import ukuran from '../../material/dimen'

const TermText = (props) => {
    return(
        <>
            <Text>I agree to Nirvana Store's
                <Text> </Text>
                <Text
                    style={{color: color.redNirvana, textDecorationLine: 'underline'}}
                    onPress={() => {Linking.openURL(Constant.termUrl)}}>
                    Terms of Service 
                </Text>

                <Text> </Text>
                 acknowledge that Nirvana Store's
                <Text> </Text>
                 <Text
                    style={{color: color.redNirvana, textDecorationLine: 'underline'}}
                    onPress={() => {Linking.openURL(Constant.privacyUrl)}}>
                     Privacy Policy
                </Text>
                <Text> </Text>
                applies to me.
                </Text>
        </>
    )
}

const TermSplashText = (props) =>{
    return(
        <>
            <Text style={{textAlign: 'center', marginTop: ukuran.dp_8, fontSize: ukuran.dp_12}}>By sign in or register, I agree to Nirvana Store's
                <Text> </Text>
                <Text
                    style={{color: color.defaultColor, textDecorationLine: 'underline'}}
                    onPress={() => {Linking.openURL(Constant.termUrl)}}>
                    Terms of Service 
                </Text>

                <Text> </Text>
                 acknowledge that Nirvana Store's
                <Text> </Text>
                 <Text
                    style={{color: color.defaultColor, textDecorationLine: 'underline'}}
                    onPress={() => {Linking.openURL(Constant.privacyUrl)}}>
                     Privacy Policy
                </Text>
                <Text> </Text>
                applies to me.
                </Text>
        </>
    )
}

export {
    TermText, 
    TermSplashText
}