'use strict'
import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from './title_text'

const ChipSize = ({textSize, onpressed, position, clickedPosition}) =>{
    return(
        <TouchableHighlight
            underlayColor={color.white_300}
            style={[(clickedPosition == position) ? styleCh.parentClick : styleCh.parent]}
            
            onPress={()=> {
                onpressed(textSize)
            }}
            >
            <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} text={textSize}/>
        </TouchableHighlight>
    )
}

const styleCh = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        borderColor: color.defaultColor,
        borderWidth: 1,
        paddingTop: ukuran.dp_6,
        paddingBottom: ukuran.dp_6,
        paddingEnd: ukuran.dp_30,
        paddingStart: ukuran.dp_30,
        marginTop: ukuran.dp_10,
        marginStart: ukuran.dp_20,
        alignSelf: 'baseline',
        borderRadius: ukuran.dp_8
    },

    parentClick:{
        backgroundColor: color.white_300,
        borderColor: color.defaultColor,
        borderWidth: 1,
        paddingTop: ukuran.dp_6,
        paddingBottom: ukuran.dp_6,
        paddingEnd: ukuran.dp_30,
        paddingStart: ukuran.dp_30,
        marginTop: ukuran.dp_10,
        marginStart: ukuran.dp_20,
        alignSelf: 'baseline',
        borderRadius: ukuran.dp_8
    }
})

export default ChipSize