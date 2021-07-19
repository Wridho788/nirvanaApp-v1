'use strict'
import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import ImageBackground from 'react-native/Libraries/Image/ImageBackground'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import UnderLineCustom from './custom_underline'
import TextTitle from './title_text'
import UnderlineLayoutGrey from './underline_layout_grey'

const ClassProgress = (props) => {
    var classid = props.classid
    var idClass = require(`../../../assets/emblem/4.png`)
    if(classid == 1){
        idClass = require(`../../../assets/emblem/1.png`)
    }else if(classid == 2){
        idClass = require(`../../../assets/emblem/2.png`)
    }else if(classid == 3){
        idClass = require(`../../../assets/emblem/3.png`)
    }else if(classid == 4){
        idClass = require(`../../../assets/emblem/4.png`)
    }else if(classid == 5){
        idClass = require(`../../../assets/emblem/5.png`)
    }
    var uri = 'https://img.freepik.com/free-photo/panorama-view-beautiful-sunrise-landscape-forest_41898-467.jpg?size=626&ext=jpg'
    return (
        <>
            <View style={styleClass.parent}>
                <ImageBackground style={styleClass.image} imageStyle={{ borderRadius: ukuran.dp_10, opacity: 0.3 }} source={{ uri: uri }}>
                    <View style={styleClass.firstItem}>
                        {(props.classid != 0) ? <Image source={idClass} style={styleClass.emblem}/> : null}
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`${props.class}\t\t`}
                            maxLine={1} warna={color.white} start={ukuran.dp_10} top={ukuran.dp_10} />
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`${props.nowPoint}/${props.need}`}
                            maxLine={1} warna={color.white} start={ukuran.dp_10} top={ukuran.dp_10} />
                    </View>
                    <UnderLineCustom height={ukuran.dp_4} color={color.white} margin={ukuran.dp_10} />
                    <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`Get ${props.progress} more XP to ${props.next}`}
                        maxLine={2} warna={color.white} start={ukuran.dp_10} bottom={ukuran.dp_14} />
                </ImageBackground>
            </View>
        </>
    )
}

const styleClass = StyleSheet.create({

    parent: {
        width: ukuran.wpPercent90,
        alignSelf: 'center',
        borderRadius: ukuran.dp_10,
        marginBottom: ukuran.dp_24
    },

    image: {
        flex: 1,
        borderRadius: ukuran.dp_10,
        backgroundColor: color.defaultColor,
        width: null,
        height: null
    },
    firstItem: {
        flexDirection: 'row'

    },
    emblem:{
        width: 18,
        height: 22,
        marginStart: 8,
        marginTop: ukuran.dp_10
    }
})

export default ClassProgress