'use strict'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"
import ArrowUp from '../../icons/arrow-up.svg'
import color from '../../material/color'
import ukuran from '../../material/dimen'

const GoTopButton = (props) => {

    return(
        <>
        <TouchableOpacity activeOpacity={0.9}
        style={styleB.goTopButton}
            onPress={props.onpressed}>
            <View>
                <ArrowUp/>         
            </View>
        </TouchableOpacity>
        </>
    )
}

const styleB = StyleSheet.create({
    goTopButton:{
        width: 45,
        height: 45,
        borderRadius: 45/2,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        end: 0,
        marginEnd: ukuran.dp_24,
        marginBottom: ukuran.dp_24,
        backgroundColor: color.defaultColor
    }
})

export default GoTopButton