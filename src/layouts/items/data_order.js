'use strict'

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { capitalize, convertPrice } from '../../functions/helper'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import TextTitle from './title_text'
import UnderlineLayout from './underline_layout'
import UnderlineLayoutGrey from './underline_layout_grey'

const DataOrder = (props) => {


    return (
        <>
            <View style={styleOrder.parent}>
                <View style={styleOrder.parentData}>
                    <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`#${props.orderid}`}
                        maxLine={1} warna={color.white_100} />
                    <View style={styleOrder.firstItem}>
                        <Image style={styleOrder.image} source={{
                            uri: strings.imageThumbnail + props.productImage
                        }} />
                        <View style={styleOrder.firstItemVertical}>
                            <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'left'} text={props.productName} maxLine={1} />
                            <TextTitle fontSize={13} align={'left'} text={`Color: ${capitalize(props.colorName)}`} top={ukuran.dp_8} maxLine={1} />
                        </View>
                    </View>
                    <UnderlineLayoutGrey />
                    <TextTitle fontSize={ukuran.dp_14} align={'right'} tipe={'bold'} text={convertPrice(props.priceTotal)}
                        maxLine={1} warna={color.defaultColor} top={ukuran.dp_10} bottom={ukuran.dp_10} />
                    <UnderlineLayoutGrey />
                    <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={capitalize(String(props.statusOrder))}
                        maxLine={1} warna={color.redNirvana} top={ukuran.dp_10} bottom={ukuran.dp_10} />
                    <UnderlineLayoutGrey />
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity style={styleOrder.buttonStyle}
                            onPress={() =>{
                                props.navigasi.navigate('Invoice', {orderid: props.orderid})
                            }}>
                            <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={'Detail'}
                                maxLine={1} warna={color.white} top={ukuran.dp_10} bottom={ukuran.dp_10} />
                        </TouchableOpacity>
                    </View>
                    <UnderlineLayout/>
                </View>
            </View>
        </>
    )
}

const styleOrder = StyleSheet.create({
    parent: {
        width: ukuran.wpPercent90,
        alignSelf: 'center',
    },

    parentData: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: ukuran.dp_14
    },
    firstItem: {
        flexDirection: 'row',
        flex: 1,
        marginTop: ukuran.dp_10,
        marginBottom: ukuran.dp_10
    },
    buttonStyle: {
        backgroundColor: color.redNirvana,
        flexShrink: 1,
        paddingEnd: ukuran.dp_14,
        paddingStart: ukuran.dp_14,
        marginTop: ukuran.dp_10,
        marginBottom: ukuran.dp_10
    },

    firstItemVertical: {
        flex: 1,
        alignItems: 'flex-start',
        marginStart: ukuran.dp_10,
        backgroundColor: color.white
    },

    image: {
        height: ukuran.dp_80,
        width: ukuran.dp_80,
        borderRadius: ukuran.dp_8,
        backgroundColor: color.white_300
    },
})

export default DataOrder