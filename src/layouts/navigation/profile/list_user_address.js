'use strict'

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { List } from "react-native-paper"
import React from 'react'
import ukuran from "../../../material/dimen"
import color from "../../../material/color"
import TextTitle from "../../items/title_text"
import CustomButton from "../../button/default_button"
import strings from "../../../material/strings"
import AddressData from "../../items/data_address"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/core"
import LoadUserAddress from "../../../services/load_list/load_list_address"
import {useFocusEffect} from '@react-navigation/native'
import {CircleProgressBar} from '../../items/progress_bar'
import { useCallback } from "react"
import { getTokenData } from "../../../services/account_process"
import Constant from "../../../material/constant"
import axios from "axios"

const ListAddressLayout = (props) => {
    //variabel untuk mengetahui data terload apa belum. false = belum, true = sudah
    const [isLoaded, setLoaded] = useState(false)
    const [addressData, setAddressData] = useState([])
    useEffect(()=>{
        props.navigation.addListener(
            //jika user focus ke halaman
            'focus',
            () =>{
                props.navigation.setOptions({headerShown:true})
                setLoaded(false)
            }
        )
        if(!isLoaded){
            console.log('Reloaded')
            setAddressData([])
            getData()
        }
    }, [isLoaded])

    // useFocusEffect(
    //     useCallback(() => {
    //     }, [null])
    // )

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleAddress.parent}>
                        <TextTitle fontSize={ukuran.dp_18} tipe={'bold'} 
                            text={strings.shipping_address} warna={color.defaultColor}
                             bottom={ukuran.dp_24} />
                        {/* Jika status false, munculkan progress bar*/}
                        {!isLoaded && (<CircleProgressBar/>)}
                        {/*Load data alamat melalui component LoadUserAddress dengan mengirim value status load*/}
                        <LoadUserAddress data={addressData} routing={props.navigation} isLoad={e => setLoaded(e)}/>
                        <CustomButton
                            width={'match'}
                            onpressed={e => {
                                props.navigation.navigate('AddNewAddress', {idShipment: '0'})
                                props.navigation.setOptions({headerShown:false})
                            }}
                            backgroundColor={color.white}
                            text={strings.add_new_address} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )



    async function getData() {
        var token = await getTokenData()
        await axios.get(Constant.loadAddress,{
            headers: {
                'Content-Type': 'application/json',
                origin: Constant.origin,
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resource => {
                setLoaded(true)
                setAddressData(resource.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
//Style untuk layout
const styleAddress = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        marginEnd: ukuran.dp_14,
        marginStart: ukuran.dp_14
    }
})

export default ListAddressLayout