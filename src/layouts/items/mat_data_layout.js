'use strict'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { capitalize, dateFormat, spacingUpperCase } from '../../functions/helper'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from './title_text'


const MatData = (props) => {

    return (
        <>
            <TouchableOpacity onPress={props.onpressed} activeOpacity={0.8}>
                <View style={styleMat.parentMat}>
                    <Image style={styleMat.image} source={{uri: props.image}} />
                    <View style={{ margin: ukuran.dp_10 }}>
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`${props.matName} -${spacingUpperCase(capitalize(props.matColor))}`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_14} />
                        <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={props.matCode}
                            maxLine={1} warna={color.white_100} bottom={ukuran.dp_14} />
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`Start Date: ${dateFormat(props.startDate, 'DD MMMM YYYY')}`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_14} />
                        <View style={{ height: 1, backgroundColor: color.white_300 }} />

                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={props.status}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_10} />
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styleMat = StyleSheet.create({
    

    parentMat: {
        borderRadius: ukuran.dp_10,
        shadowColor: color.white_300,
        backgroundColor: color.white,
        elevation: 3,
        shadowOpacity: 0.8,
        shadowOffset: {width: 1, height:1},
        marginBottom: ukuran.dp_24,
    },

    image:{
        height: 130,
        borderTopEndRadius: ukuran.dp_10,
        borderTopStartRadius: ukuran.dp_10,
        backgroundColor: color.white_300
    }

})

export default MatData