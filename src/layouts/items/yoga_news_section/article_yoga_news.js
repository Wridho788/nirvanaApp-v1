import React from 'react'
import { ImageBackground, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../title_text'

const NewsYoga = (props) => {

    return (
        <>
            <TouchableOpacity activeOpacity={0.8}
                underlayColor={color.white}
                style={styleNews.parent}
                onPress={props.onpressed}>
                    <ImageBackground source={{uri: 'https://nirvana-store-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_tangerines_3192863_1280_c3e8f05379_f6502e2acb.jpg'}}
                         style={styleNews.img} imageStyle={{borderRadius: ukuran.dp_20, opacity: 0.3}}>               
                        <TextTitle text={'ANJASMARA'} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14}
                             warna={color.white} tipe={'bold'} fontSize={ukuran.dp_14}/>
                        <TextTitle text={'Tempor sagittis consectetur pellentesque ut nulla viverra. At quis ultricies erat ultrices viverra erat egestas arcu.'} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14}
                             warna={color.white}fontSize={ukuran.dp_14} maxLine={3}/>     
                        <TextTitle text={'16 Jan 2021'} start={ukuran.dp_20} end={ukuran.dp_20} top={ukuran.dp_14} bottom={ukuran.dp_14}
                             warna={color.white}fontSize={ukuran.dp_14}/>      
                    </ImageBackground>
            </TouchableOpacity>
        </>
    )
}

export default NewsYoga

const styleNews = StyleSheet.create({
    parent: {
        marginStart: ukuran.dp_20,
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