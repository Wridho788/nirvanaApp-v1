'use strict'

import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight} from "react-native";
import color from "../../material/color";
import ukuran from "../../material/dimen";

const KategoriHome = ({url, text, id, onpressed}) =>{

    return(
        <TouchableHighlight
            underlayColor={color.white}
            onPress={onpressed}
        >
        <View
            style={styleKategori.parent}> 
            <Image style={styleKategori.image} source={{
                uri: url
            }}/>
            <Text style={styleKategori.text}>{text}</Text>
        </View>
        </TouchableHighlight>
    )
}

export default KategoriHome

const styleKategori = StyleSheet.create({
    
    parent: {
        alignSelf: 'baseline',
        alignItems: 'center',
        marginEnd: ukuran.fontMedium
    },

    image:{
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ukuran.dp_10
    },

    text : {
        fontFamily: 'Montserrat',
        color: color.defaultColor,
        marginTop: ukuran.dp_8,
        textAlign: 'center'
    }
})