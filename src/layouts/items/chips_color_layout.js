'use strict'

import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { spacingUpperCase } from '../../functions/helper'
import color from '../../material/color'
import ukuran from '../../material/dimen'


const ChipColor = ({color, onpress, textData, clickedPosition, position}) =>{


    return(
        <>
            <TouchableOpacity
            activeOpacity={0,6}
                onPress={onpress}
                style={[(clickedPosition == position) ? styleChip.parentClick : styleChip.parent]}>
                    <ColorItem background={color}/>
                    <Text style={styleChip.text}>{spacingUpperCase(textData)}</Text>
            </TouchableOpacity>
        </>
    )

}

const ColorItem = ({background}) =>{
    var textBack = background.substring(0,1)
    if(textBack == "#"){

        return(
            <View style={{width: 35,
                height: 35,
                borderWidth: 0.5,
                marginTop: ukuran.dp_8,
                marginStart: ukuran.dp_8,
                backgroundColor: background,
                marginBottom: 1,
                borderColor: color.white_300,
                borderRadius: 35/2
                    }}>        
            </View>
        )
    }else{ 
        return(
            <View style={{width: 35,
                height: 35,
                marginTop: ukuran.dp_8,
                backgroundColor: background,
                marginStart: ukuran.dp_8,
                marginBottom: 1,
                borderRadius: 20/2
                    }} >
                <ImageBackground
                    style={{
                        width: 35,
                        height: 35,}}
                    imageStyle={{borderRadius: 35/2}}    
                    source={{uri: background}}/>          
            </View>
        )
    }
}

const styleChip = StyleSheet.create({
    parent:{
        flexWrap: 'wrap',
        backgroundColor: color.white,
        alignItems: 'center',
        marginStart: ukuran.dp_16,
        marginBottom: ukuran.dp_16,
        borderColor: color.white_300,
        borderRadius: ukuran.dp_24,
        borderWidth: 1,
        flexDirection: 'row'
    },

    parentClick:{
        flexWrap: 'wrap',
        backgroundColor: color.white,
        alignItems: 'center',
        marginStart: ukuran.dp_16,
        marginBottom: ukuran.dp_16,
        borderColor: color.black,
        borderRadius: ukuran.dp_24,
        borderWidth: 1,
        flexDirection: 'row'
    },

    text:{
        marginEnd: ukuran.dp_8,
        fontSize: ukuran.dp_16,
        marginStart: ukuran.dp_6,
        fontFamily: 'Montserrat',
        color: color.defaultColor
    }
})

export default ChipColor