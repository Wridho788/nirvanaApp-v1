'use strict'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import LoadCouponData from '../../services/load_list/load_coupon_list'
import EmptyBoxLayout from '../items/empty_box'

const CouponLayout = (props) => {

    const [isEmpty, setEmpty] = useState(false)

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleCoupon.parent}>   
                        <LoadCouponData isEmpty={e => setEmpty(e)}/>
                    </View>
                </ScrollView>
                {isEmpty && <EmptyBoxLayout/>}
            </SafeAreaView>
        </>
    )
}

const styleCoupon = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

})

export default CouponLayout