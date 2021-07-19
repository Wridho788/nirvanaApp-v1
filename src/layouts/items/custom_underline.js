'use strict'
import React from 'react'
import { View } from "react-native"
import ukuran from '../../material/dimen'

const UnderLineCustom = (props) => {


    return(
        <>
        <View style={{flex: 1, height: props.height, backgroundColor: props.color, margin: props.margin}}></View>
        </>
    )
}

export default UnderLineCustom