'use strict'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from '../items/title_text'
import Money from '../../icons/money.svg'
import Copy from '../../icons/copy.svg'
import Clipboard from '@react-native-clipboard/clipboard'
import { showSnackBar } from '../../functions/helper'
import strings from '../../material/strings'


const CouponData = (props) => {

    return (
        <View style={styleCoupon.parentCoupon}>
            <View style={{ margin: ukuran.dp_16 }}>
                <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'bold'} text={strings.cashback}
                    maxLine={1} warna={color.defaultColor} />
                <TextTitle fontSize={ukuran.dp_18} align={'left'} tipe={'bold'} text={props.nominal}
                    maxLine={1} warna={color.defaultColor} top={ukuran.dp_4} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: ukuran.dp_16 }}>
                    <Money />
                    <View style={{ marginStart: ukuran.dp_6 }}>
                        <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={strings.min_transaction}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_4} />
                        <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'bold'} text={props.min}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_4} />
                    </View>
                    <View style={{ flex: 1, marginEnd: ukuran.dp_8 }}>
                        <TextTitle fontSize={ukuran.dp_12} align={'right'} tipe={'normal'} text={strings.coupon_code}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_4} />
                        <TextTitle fontSize={ukuran.dp_12} align={'right'} tipe={'bold'} text={props.code}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_4} />
                    </View>
                    <TouchableOpacity
                        onPress={() =>{
                            Clipboard.setString(props.code)
                            showSnackBar(strings.copied)
                        }}>
                        <Copy />
                    </TouchableOpacity>
                </View>
                <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={`Exp Date: ${props.exp}`}
                    maxLine={1} warna={color.defaultColor} top={ukuran.dp_16} />
            </View>
        </View>
    )
}


const styleCoupon = StyleSheet.create({
    parentCoupon: {
        borderRadius: ukuran.dp_10,
        shadowColor: color.white_300,
        backgroundColor: color.white,
        elevation: 3,
        shadowOpacity: 0.8,
        shadowOffset: { width: 1, height: 1 },
        marginBottom: ukuran.dp_24,
    },
})

export default CouponData