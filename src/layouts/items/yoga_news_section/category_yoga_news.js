import React from 'react'
import { ImageBackground, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../title_text'

const CategoryYogaNews = (props) => {



    const styleKategori = StyleSheet.create({
        parent: {
            width: Platform.OS == 'ios' ? 70 : 80,
            marginEnd: props.isLast ? 0 : Platform.OS == 'ios' ? ukuran.dp_18 : ukuran.dp_14,
            height: Platform.OS == 'ios' ? 70 : 80
        },
        img: {
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
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
                onPress={props.onpressed}>
                    <ImageBackground source={{uri: 'https://nirvana-store-assets.s3.ap-southeast-1.amazonaws.com/thumbnail_tangerines_3192863_1280_c3e8f05379_f6502e2acb.jpg'}}
                         style={styleKategori.img} imageStyle={{borderRadius: ukuran.dp_8, opacity: 0.5}}>               
                        <TextTitle text={props.categoryName}
                             align={'center'} warna={color.white} tipe={'bold'} fontSize={ukuran.dp_10}/>
                    </ImageBackground>
            </TouchableOpacity>
        </>
    )
}

export default CategoryYogaNews