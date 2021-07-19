'use strict'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React from 'react'
import { Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { concat } from 'react-native-reanimated'
import { Row, Table } from 'react-native-table-component'
import { useEffect, useState } from 'react'
import { convertPrice, showSnackBar } from '../../../functions/helper'
import color from '../../../material/color'
import Constant from '../../../material/constant'
import ukuran from '../../../material/dimen'
import strings from '../../../material/strings'
import { getTokenData } from '../../../services/account_process'
import { loadDetailAddress } from '../../../services/address_process'
import { checkPricingProcess, getCookie, loadDefaultAddress, requestCheckout } from '../../../services/checkout_process'
import { getAllStockCartItem, getCartDataObject } from '../../../services/database/service_sqlite'
import LoadCartData from '../../../services/load_list/load_cart_data'
import { CartDataCheckout } from '../../items/cart_data'
import CheckoutButton from '../../items/floating_checkout_button'
import { ConfirmationDialog, CustomProgressBar } from '../../items/progress_bar'
import TextTitle from '../../items/title_text'
import UnderlineLayout from '../../items/underline_layout'

const CheckoutLayout = (props) =>{
    const [totalHarga, setTotalHarga] = useState(0)
    const [statusToken, setStatusToken] = useState(false)
    const [isLoaded, setLoaded] = useState(true)
    const [subTotal, setSubTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cashback, setCashBack] = useState(0)
    const [pricingTotal, setPricingTotal] = useState(0)
    const [confirmDialog, setStatusConfirmation] = useState(false)
    const [confirmMessage, setMessageConfirm] = useState('')
    const [couponText, setCouponText] = useState('')
    const [dataAlamat, setDataAlamat] = useState([])
    const [isCheckout, setCheckout] = useState(false)

    const subTotalData = [setTableText('Sub-Total'), setTableText("") , setTableText(convertPrice(subTotal))]
    const shippingFeeData = [setTableText('Shipping Fee'), setTableText('') , setTableText(convertPrice(shippingFee))]
    const discountData = [setTableText('Discount'), setTableText('') , setTableText(`- ${convertPrice(discount)}`)]
    const cashBackData = [setTableText('Cashback'), setTableText('') , setTableText(`+${cashback} points`)]
    const totalData = [setTableText('Total', 'bold'), setTableText('') , setTableText(convertPrice(pricingTotal), 'bold')]

    function setTableText(text, tipe){
        return <TextTitle warna={color.black} tipe={tipe}text={text} transform={'none'} align={'right'}/>
    }
    function showConfirmationDialog(messageConfirm){
        setStatusConfirmation(true)
        setMessageConfirm(messageConfirm)
    }

    const checkoutProcess = async () =>{
        setCheckout(true)
        var requestCookie = await getCookie()
        if(requestCookie.data == 'OK'){
            var dataCart = await getCartDataObject()
            let body = {
                cartItems : dataCart,
                usePoint : false,
                note: '',
                cartNotes: {},
                useCoupon: couponText
            }
            var requestChec = await requestCheckout(body)
            AsyncStorage.removeItem('cart')
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Payment', params: {idOrder: requestChec.orderid}}]
            })
        }else{
            showSnackBar(requestCookie)
        }
        setCheckout(false)

    }

    const loadCheckoutData = async (props) =>{
        var data = await loadDefaultAddress() //akan return id default dari alamat
        if( data != -1){
            if(data != -2){
                var detailAlamat = await loadDetailAddress(data, await getTokenData())
                var dataCart = await getCartDataObject()
                let body = {
                    cartItems : dataCart,
                    usePoint : false,
                    useCoupon: couponText
                }
                var checkPricing = await checkPricingProcess(body)
                if(checkPricing.message == 1){
                    //success load
                    setDataAlamat({
                        namaPengguna: `${detailAlamat.first_name} ${detailAlamat.last_name}`,
                        nomorHp: detailAlamat.tel,
                        alamat: detailAlamat.address
                    })
                    if(String(checkPricing.discount.messageCoupon).length > 0){
                        showSnackBar(checkPricing.discount.messageCoupon)
                    }
                    setDiscount(checkPricing.discount.discount)
                    setSubTotal(checkPricing.subtotal)
                    setCashBack(checkPricing.cashback)
                    setShippingFee(checkPricing.tax)
                    setPricingTotal(checkPricing.total)
                }else{
                    showConfirmationDialog(strings.notIndonesianMessage)
                }
            }else{
                showConfirmationDialog(strings.no_default_detect)
            }
        }else{
            showConfirmationDialog(strings.empty_address_data)
        }
        setLoaded(false)
    }

    useEffect(() =>{
        props.navigation.addListener(
            //jika user focus ke halaman
            'focus',
            () =>{
                props.navigation.setOptions({headerShown:true})
                setLoaded(true)
            }
        )
        if(isLoaded){
            (async()=>{
               var checkoutData = await loadCheckoutData()
            })()
        }

    }, [isLoaded])

    return(
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleCheckout.parent}>
                        {confirmDialog && (<ConfirmationDialog isVisible={confirmDialog} 
                            message={confirmMessage}
                            onClick={() => {
                                setStatusConfirmation(false)
                                props.navigation.navigate('Profile')
                            }}
                            onDismiss={() => {
                                setStatusConfirmation(false)
                                props.navigation.goBack()
                            }}/>)}
                        {isLoaded && (<CustomProgressBar isVisible={isLoaded}/>)}
                        {isCheckout && (<CustomProgressBar isVisible={isCheckout}/>)}
                        <View style={styleCheckout.firstItem}>
                            <TextTitle fontSize={ukuran.dp_16} align={'left'} tipe={'bold'} text={strings.shipping_address} 
                                maxLine={1} warna={color.defaultColor}/>
                            <TouchableOpacity style={{
                                flex: 1,
                                marginTop: ukuran.dp_4
                            }}
                            onPress={() => props.navigation.navigate('Profile')}>
                                <TextTitle fontSize={ukuran.dp_14} align={'right'} tipe={'bold'} text={strings.change_address} 
                                     maxLine={1} warna={color.redNirvana}/>
                            </TouchableOpacity>
                        </View>
                        <UnderlineLayout/>
                        {/* INI NANTI DATA ALAMAT */}
                        <View style={styleCheckout.alamatData}>
                            <TextTitle fontSize={15} align={'left'} tipe={'bold'} text={dataAlamat.namaPengguna} 
                               top={ukuran.dp_8} maxLine={1} warna={color.defaultColor}/>
                            <TextTitle fontSize={15} align={'left'} text={dataAlamat.nomorHp} 
                               top={ukuran.dp_8} maxLine={1} warna={color.defaultColor}/>

                            <TextTitle fontSize={15} align={'left'} text={dataAlamat.alamat} 
                               top={ukuran.dp_8} maxLine={2} warna={color.defaultColor}/>
                        </View>
                        <UnderlineLayout/>
                        <TextTitle fontSize={ukuran.dp_16} align={'left'} tipe={'bold'} text={`Cart`} top={ukuran.dp_16} bottom={ukuran.dp_16}
                                maxLine={1} warna={color.defaultColor}/>
                       <LoadCartData data={'checkout'} isLoaded={e => console.log('checkout')} totalData={total => console.log(total)} totalHarga={total => setTotalHarga(total)}/>       
                        <View style={styleCheckout.inputCoupon}>
                            <TextInput
                                style={{flex: 1, marginEnd: ukuran.dp_8}}
                                placeholder={strings.use_coupon}
                                placeholderTextColor={color.white_100}
                                underlineColorAndroid="transparent"
                                textContentType="name"
                                keyboardType="default"
                                onChangeText={e => setCouponText(e)}
                                value={props.data}
                                key={'I'}
                                autoCapitalize="none" />
                            <TouchableOpacity
                                onPress={() => setLoaded(true)}
                            >
                                <TextTitle fontSize={ukuran.dp_12} align={'right'} tipe={'bold'} text={`Check`} 
                                     maxLine={1} warna={color.defaultColor} end={ukuran.dp_10}/>
                            </TouchableOpacity>
                        </View>    

                        <View style={styleCheckout.secondPoint}>
                            <Table>
                                <Row data={subTotalData} widthArr={[110,20,130]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={shippingFeeData} widthArr={[110,20,130]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={discountData} widthArr={[110,20,130]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={cashBackData} widthArr={[110,20,130]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={totalData} widthArr={[110,20,130]} style={{marginBottom: ukuran.dp_16}}/>
                            </Table>
                        </View>
                    </View>
                </ScrollView>
                <CheckoutButton priceTotal={pricingTotal} textButton={strings.payment} onpress={()=>{
                    checkoutProcess()
                }}/>
            </SafeAreaView>
        </>
    )
}
const styleCheckout = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    firstItem: {
        flexDirection: 'row',
        marginBottom: ukuran.dp_16
    },

    secondPoint: {
        marginTop: ukuran.dp_16,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },

    alamatData: {
        marginBottom: ukuran.dp_16
    },
    inputCoupon: {
        flexDirection: 'row',
        marginStart: ukuran.dp_40,
        backgroundColor: color.white,
        borderColor: color.defaultColor,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: ukuran.dp_8,
        padding: Platform.OS == 'ios' ? ukuran.dp_10 : 0
    }

    
})

export default CheckoutLayout