'use strict'
import React from 'react'
import { useState } from 'react'
import { Text } from 'react-native'
import color from '../../material/color'

const TextTitle = (props) =>{
    var warna = (props.warna == null) ? color.defaultColor : props.warna
    const tipeFonts = (props.tipe == "bold") ? 'montserrat-bold' : 'Montserrat'
    var maxLines = (props.maxLine == null) ? 2 : props.maxLine
    return(
        <>
        <Text style={{
            fontFamily: tipeFonts,
            textDecorationLine: props.decoration,
            fontSize: props.fontSize,
            marginBottom: props.bottom,//margin bottom
            marginTop: props.top,
            marginStart: props.start,
            textAlign: props.align,
            marginEnd: props.end,
            textTransform: props.transform,
            color: warna
        }}
        numberOfLines={maxLines} ellipsizeMode={'tail'} 
        >{props.text}</Text>
        </>
    )
}

export default TextTitle