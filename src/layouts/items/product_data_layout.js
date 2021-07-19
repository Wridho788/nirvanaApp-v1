'use strict'

import React, { Component } from "react";
import { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions, Platform} from "react-native";
import FastImage from "react-native-fast-image";
import color from "../../material/color";
import ukuran from "../../material/dimen";
import strings from "../../material/strings";
import PriceNumber from "./number_format";
import TextTitle from "./title_text";

const ProductLayout = ({url, titleProduct, price, colorData, imageData, id, onpressed, bPrice, percentDiscount, freeGrafir}) =>{

    const [imageClick, setClickImage] = useState(url)
    var dataWarna = []
    var stringWarna = []
    var colorBefore = ""
    var numberIndex = 0
    var dataWarnaReal = (colorData == null) ? "color=None=#ffffff=NULL" : colorData
    var splitWarnaFirst = dataWarnaReal.split(',')
    for(let i = 0; i < splitWarnaFirst.length; i++){
        var splitWarnaSecond = splitWarnaFirst[i].split('=')
        for(let k = 0; k < splitWarnaSecond.length; k++){
            if (k % 4 == 1){
                var hexColorOrUrlImage = (splitWarnaSecond[2] != "NULL") ? splitWarnaSecond[2] : strings.imageMainBase + splitWarnaSecond[3]
                var colorName = splitWarnaSecond[k]
                if(colorName != colorBefore){
                    if(numberIndex < 6){
                        stringWarna.push({
                            hexColor: hexColorOrUrlImage,
                            colorNameString: colorName
                        })
                        dataWarna = stringWarna.map( warnaInfo => (
                            <ColorChip background={warnaInfo.hexColor} onpressed={e=> onImageClick(imageData, String(warnaInfo.colorNameString))}/>
                        ))
                        numberIndex +=1
                        colorBefore = colorName
                    }
                }
            }
        }
    }
    return(
        <TouchableHighlight
            underlayColor={color.white}
            onPress={onpressed}
        >
        <View
            style={styles.parent}>
            {(percentDiscount != 0) ? 
            <View style={styles.label}>
                <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'bold'} text={`${percentDiscount}%`}
                            end={ukuran.dp_4} start={ukuran.dp_4}
                            maxLine={1} warna={color.white} top={ukuran.dp_4}/>
                <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'bold'} text={`OFF`}
                            end={ukuran.dp_4} start={ukuran.dp_4}
                            maxLine={1} warna={color.white} bottom={ukuran.dp_4}/>            
            </View>
            : null  
            }
            <View style={styles.image}>
                <FastImage style={styles.image} source={{
                    uri: imageClick
                }}/>
                {(freeGrafir == 1) ? 
                    <Text style={styles.labelCustomize}>Free Customize Name</Text>
                : null}
            </View> 
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.titleText}>{titleProduct}</Text> 
            {(price != bPrice) ? 
                <PriceNumber price={bPrice} gaya={styles.priceTextBefore}/> : null
            }
            <PriceNumber price={price} gaya={styles.priceText}/>
            <View style={{flexWrap:'wrap', flexDirection: 'row'}}>
                {dataWarna}
            </View>
        </View>
        </TouchableHighlight>
    )

    function onImageClick(imageData, colorName){
        var splitUrl = imageData.split(',')
        for (let i = 0; i < splitUrl.length; i++){
            var finalUrl = splitUrl[i].split('=')
            for (let k = 0; k < finalUrl.length; k++){
                var colorNameSame = String(finalUrl[k])
                if(colorNameSame.toLowerCase() == colorName.toLowerCase()){
                    var thumbnail = strings.imageThumbnail + finalUrl[k+1]
                    setClickImage(thumbnail)
                }
            }
        }
    }
}

export default ProductLayout

const ColorChip = ({background, onpressed}) =>{
    var textBack = background.substring(0,1)
    if(textBack == "#"){

        return(
            <TouchableOpacity style={{width: 20,
                height: 20,
                borderWidth: 0.5,
                marginTop: ukuran.dp_8,
                backgroundColor: background,
                marginEnd: ukuran.dp_8,
                marginBottom: 1,
                borderColor: color.white_300,
                borderRadius: 20/2
                    }} onPress={onpressed}>        
            </TouchableOpacity>
        )
    }else{ 
        return(
            <TouchableOpacity style={{width: 20,
                height: 20,
                borderWidth: 0.5,
                marginTop: ukuran.dp_8,
                backgroundColor: background,
                marginEnd: ukuran.dp_8,
                marginBottom: 1,
                borderColor: color.white_300,
                borderRadius: 20/2
                    }} onPress={onpressed}>
                <ImageBackground
                    style={{
                        width: 20,
                        height: 20,}}
                    imageStyle={{borderRadius: 20/2}}    
                    source={{uri: background}}/>          
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    
    parent: {
        width:  (Platform.OS == 'ios') ? 180 : ukuran.wpMatchParent / 2 - 10,
        marginStart: (Platform.OS == 'ios') ? 6 : 2,
        marginTop: ukuran.dp_24,
    },

    label: {
        backgroundColor: color.redNirvana,
        alignSelf: 'flex-end',
        borderBottomStartRadius: ukuran.dp_4,
        position: 'absolute',
        zIndex: 20,
        opacity: 0.85
    },  

    labelCustomize: {
        backgroundColor: color.defaultColor,
        alignSelf: 'flex-start',
        bottom: 0,
        color: color.white,
        fontFamily: 'Montserrat',
        fontSize: ukuran.dp_12,
        marginBottom: ukuran.dp_6,
        padding: ukuran.dp_6,
        position: 'absolute',
        zIndex: 20,
        opacity: 0.85
    
    }, 

    image:{
        height: ukuran.productListWidth,
        width: ukuran.productListWidth,
        alignItems: 'center',
        backgroundColor: color.white_300,
        justifyContent: 'center',
        resizeMode: 'cover'
    },

    titleText : {
        maxWidth: ukuran.productListWidth,
        fontFamily: 'montserrat-bold',
        fontSize: ukuran.fontMedium,
        color: color.defaultColor,
        marginTop: ukuran.dp_8
    },

    priceText : {
        maxWidth: ukuran.productListWidth,
        fontFamily: 'Montserrat',
        fontSize: ukuran.fontMedium,
        color: color.defaultColor,
        marginTop: ukuran.dp_8
    },

    priceTextBefore: {
        maxWidth: ukuran.productListWidth,
        fontFamily: 'Montserrat',
        fontSize: ukuran.dp_12,
        textDecorationLine: 'line-through',
        color: color.redNirvana,
        marginTop: ukuran.dp_8
    },

    chipColor:{
        width: 20,
        height: 20,
        borderWidth: 0.5,
        marginTop: ukuran.dp_8,
        borderColor: color.white_300,
        borderRadius: 20/2
    }
})