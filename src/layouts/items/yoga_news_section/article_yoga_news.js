import React from 'react'
import { Dimensions, ImageBackground, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../title_text'

const NewsYoga = (props) => {


    const styleNews = StyleSheet.create({
        parent: {
            marginStart: props.isSlider ? 0: ukuran.dp_20,
            maxWidth: props.isSlider ? ukuran.wpMatchParent - 50 : null,
            marginBottom: ukuran.dp_16,
            marginEnd: ukuran.dp_20
        },
        img: {
            flex: 1,
            borderRadius: ukuran.dp_20,
            backgroundColor: color.defaultColor,
            width: null,
            height: null
        },
    })

    return (
        <>
            <TouchableOpacity activeOpacity={0.8}
                underlayColor={color.white}
                style={styleNews.parent}
                onPress={props.onPressed}>
                    <ImageBackground source={{uri: props.thumbnail}}
                         style={styleNews.img} imageStyle={{borderRadius: ukuran.dp_20, opacity: 0.4}}>               
                        <TextTitle text={props.title} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14}
                             warna={color.white} tipe={'bold'} fontSize={ukuran.dp_14}/>
                        <TextTitle text={props.shortDesc} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14}
                             warna={color.white}fontSize={ukuran.dp_14} maxLine={3}/>     
                        <TextTitle text={props.date} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14} bottom={ukuran.dp_14}
                             warna={color.white}fontSize={ukuran.dp_14}/>      
                    </ImageBackground>
            </TouchableOpacity>
        </>
    )
}

export default NewsYoga