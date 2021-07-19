
import React from 'react'
import {View, StyleSheet, ScrollView, LogBox} from "react-native"
import color from "../../material/color"
import ukuran from '../../material/dimen'

const UnderlineLayout = () => {
    return(
        <View
            style={{
                alignSelf: 'center',
            }}>
                <View style={{
                    width: ukuran.wpPercent90,
                    height: 1,
                    backgroundColor: color.defaultColor
                }}/>
        </View>
    )
}

export default UnderlineLayout