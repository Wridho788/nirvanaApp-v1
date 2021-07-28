import React from 'react'
import { Dimensions, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../title_text'

const TipsCategoryData = (props) => {

    const styleKategori = StyleSheet.create({
        parent: {
            width: ukuran.wpMatchParent /2 - 30,
            marginEnd: Platform.OS == 'ios' ? 9 : 7,
            marginStart: Platform.OS == 'ios' ? 9 : 7,
            height: ukuran.wpMatchParent /2 - 30,
            marginBottom: ukuran.dp_20,
        },
        img: {
            flex: 1,
            alignItems: 'flex-start',
            borderRadius: ukuran.dp_10,
            backgroundColor: color.defaultColor,
            width: null,
            height: null
        },
    })

    return (
        <>
            <TouchableOpacity activeOpacity={0.8}
                underlayColor={color.white}
                style={styleKategori.parent}
                onPress={props.onPressed}>
                    <ImageBackground source={{uri: props.thumbnail}}
                         style={styleKategori.img} imageStyle={{borderRadius: ukuran.dp_8, opacity: 0.5}}>
                        <View style={{position: 'absolute', bottom: 0, marginBottom: ukuran.dp_20, marginStart: ukuran.dp_12}}>
                            <TextTitle text={props.title}
                                align={'left'} maxLine={2} warna={color.white} tipe={'bold'} fontSize={ukuran.dp_14}/>
                        </View>
                    </ImageBackground>
            </TouchableOpacity>
        </>
    )
}

export default TipsCategoryData