'use strict'

import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { showSnackBar } from '../../functions/helper'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import { getTokenData } from '../../services/account_process'
import { getAllStockCartItem, getTotalHargaCart } from '../../services/database/service_sqlite'
import LoadCartData from '../../services/load_list/load_cart_data'
import EmptyBoxLayout from '../items/empty_box'
import CheckoutButton from '../items/floating_checkout_button'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CartLayout = (props) =>{

    const [priceTotal, setPriceTotal] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [isLoaded, setLoaded] = useState(false)
    const [isChange, setIsChange] = useState(true)


    useEffect(() => {
        if(isChange){
            (async () => {
                var totalHarga = 0
                var data = await getTotalHargaCart()
                setPriceTotal(data)
                setIsChange(false)
            })()
        }



      }, [isChange])

    function getData(){
        (async () => {
            var data = await getAllStockCartItem()
            var tokenUser = await getTokenData()
            if(data.stockIdData.length > 0){
                if(tokenUser != null){
                    props.navigation.navigate('Checkout')
                }else{
                    props.navigation.reset({
                        index: 0,
                        routes: [{name: 'Profile'}]
                    })
                }
            }else{
                showSnackBar(strings.empty_cart_detect)
            }
        })()
    }
    

    return(
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleCart.parent}>
                       <LoadCartData data={'cart'} isChange={e => setIsChange(true)} isLoaded={e => setLoaded(e)} totalData={total => setTotalData(total)} totalHarga={total => console.log('')}/>       
                    </View>
                </ScrollView>
                <CheckoutButton priceTotal={priceTotal} onpress={e => getData()} textButton={'Checkout'}/>
                {(totalData == 0) ? <EmptyBoxLayout/> : null}
            </SafeAreaView>
        </>
    )

}


const styleCart = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        marginEnd: ukuran.dp_14,
        marginStart: ukuran.dp_14
    }
})

export default CartLayout