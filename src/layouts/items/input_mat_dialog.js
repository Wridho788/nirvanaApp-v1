'use strict'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import Input from '../../icons/input.svg'
import TapIt from '../../icons/cellphone.svg'
import TextTitle from './title_text'
import strings from '../../material/strings'
const DialogSelectInputMat = (props) => {

    return(
        <>
            <View style={styleMat.parent}>
            <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`Select`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_16}/>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onInputIDClick}>
                    <View style={styleMat.parentItem}>
                        <Input/>
                        <View style={{marginStart: ukuran.dp_16}}/>
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={strings.input_mat_id}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} right={ukuran.dp_14}/>
                    </View> 
                </TouchableOpacity>   
                <TouchableOpacity activeOpacity={0.5} onPress={props.onTapItClick}>
                    <View style={styleMat.parentItem}>
                        <TapIt/>
                        <View style={{marginStart: ukuran.dp_16}}/>
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={strings.tap_it}
                            maxLine={1} warna={color.defaultColor} />
                    </View> 
                </TouchableOpacity>
            </View>
        </>
    )
}

const styleMat = StyleSheet.create({
    parent: {
        alignContent: 'flex-start',
        width: ukuran.wpPercent90
    },

    parentItem:{
        flexDirection: 'row',
    }
})

export default DialogSelectInputMat