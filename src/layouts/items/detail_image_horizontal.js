import React from 'react'
import ukuran from '../../material/dimen'
import { TouchableRipple} from 'react-native-paper'
import { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity} from "react-native"
import color from "../../material/color"
import FastImage from 'react-native-fast-image'

const ImageListThumbnail = ({ onpress, imageUrl, clicked, clickedPosition, position}) => {
    const [imageKlik, setImageClick] = useState(false)
    const [imageDataUri, setImageDataUri] = useState(imageUrl)
    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    height: ukuran.imageHorizontalThumbnail, width: ukuran.imageHorizontalThumbnail, borderRadius: ukuran.dp_10,
                    marginTop: ukuran.dp_24, marginStart: ukuran.dp_14
                }}
                onPress={onpress}>
                <FastImage source={{ uri: imageUrl}} style={[(clickedPosition == position) ? styleDetail.imageHorizontalListClick : styleDetail.imageHorizontalList]}/>
            </TouchableOpacity>
        </>
    )
}
const styleDetail = StyleSheet.create({

    imageHorizontalList:{
        width: ukuran.imageHorizontalThumbnail,
        height: ukuran.imageHorizontalThumbnail,
        backgroundColor: color.white_300,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: ukuran.dp_10,
    },

    imageHorizontalListClick:{
        width: ukuran.imageHorizontalThumbnail,
        height: ukuran.imageHorizontalThumbnail,
        backgroundColor: color.white_300,
        borderColor: color.defaultColor,
        borderWidth: 1,
        borderRadius: ukuran.dp_10,
    }
})
export default ImageListThumbnail