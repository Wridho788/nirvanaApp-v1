'use strict'

import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import color from "../../material/color"
import ukuran from "../../material/dimen"
import TextTitle from "./title_text"
import { useEffect, useState } from "react"
import UnderlineLayout from "./underline_layout"
import strings from "../../material/strings"
import { CustomProgressBar, ConfirmationDialog } from "./progress_bar"
import { deleteAddress, setDefaultAddress } from "../../services/address_process"
import { getTokenData } from "../../services/account_process"
import { showSnackBar } from "../../functions/helper"

const AddressData = (props) =>{
    const [isEnabled, setIsEnabled] = useState(props.isDefault)
    const [showConfirm, setConfirm] = useState(false)
    const [progress, setProgress] = useState(false)
    const toogleSwitch = () => {
        setIsEnabled(isEnabled => !isEnabled)
        if(!isEnabled){
            (async () => {
                setProgress(true)
                var tokenUser = await getTokenData()
                var defaultProcess = await setDefaultAddress(props.shippingid, tokenUser)
                if(defaultProcess == 'OK'){
                    showSnackBar(strings.default_success)
                }else{
                    showSnackBar(strings.something_wrong)
                }
                setProgress(false)
                props.reload(false)
            })()
        }
    }
    return (
        <>
            <View style={styleAddress.parent}>
                <View style={styleAddress.parentTop}>
                    {progress && (<CustomProgressBar isVisible={progress}/>)}
                    {showConfirm &&  (
                            <ConfirmationDialog 
                            isVisible={showConfirm}
                            message={strings.addressDeleteMessage}
                            onDismiss={e=> setConfirm(false)}
                            onClick={e => {
                                    (async () => {
                                        setConfirm(false)
                                        setProgress(true)
                                        var tokenUser = await getTokenData()
                                        var deleteProcess = await deleteAddress(props.shippingid, tokenUser)
                                        if(deleteProcess == 'OK'){
                                            showSnackBar(strings.delete_success)
                                        }else{
                                            showSnackBar(strings.something_wrong)
                                        }
                                        setProgress(false)
                                        props.reload(false)
                                    })()
                            }}/>)
                            }  
                    <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={props.nama} start={ukuran.dp_16} />
                    <View style={{alignContent: 'center', alignSelf: 'center', alignItems: 'flex-end', flex: 1}}>
                        <Switch
                            trackColor={{false: color.white_100, true: '#8bc34a'}}
                            thumbColor={color.white}
                            onValueChange={toogleSwitch}
                            value={isEnabled}
                            ios_backgroundColor={color.white_300}/>
                    </View>
                </View>
                <TextTitle fontSize={ukuran.dp_14} tipe={'normal'} text={props.nohp} start={ukuran.dp_16} bottom={ukuran.dp_16}/>
                <TextTitle fontSize={ukuran.dp_14} tipe={'normal'} text={props.detailAddress}
                     start={ukuran.dp_16} bottom={ukuran.dp_16}/>
                 <View style={{marginStart: ukuran.dp_16, marginEnd: ukuran.dp_16, marginBottom: ukuran.dp_16}}>
                    <UnderlineLayout/>
                 </View>
                 <View style={styleAddress.action}>
                    <TouchableOpacity style={{marginBottom: ukuran.dp_16, marginEnd: ukuran.dp_16}}
                        onPress={()=>{

                            props.routing.setOptions({headerShown:false})
                            props.routing.navigate('AddNewAddress', {idShipment: props.shippingid})
                        }}>
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'center'} warna={color.white_100} text={strings.edit}/>    
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setConfirm(true)
                        }
                        }
                        >
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'center'} warna={color.white_100} text={strings.delete}/>    
                    </TouchableOpacity>
                 </View>
            </View>
        </>
    )
}

const styleAddress = StyleSheet.create({
    parent: {
        borderRadius: ukuran.dp_10,
        shadowColor: color.white_300,
        elevation: 3,
        backgroundColor: color.white,
        shadowOpacity: 0.8,
        shadowOffset: {width: 1, height:1},
        marginBottom: ukuran.dp_24,
    },

    action: {
        flexDirection: 'row',
        marginEnd: ukuran.dp_16,
        alignSelf: 'flex-end',
    },

    parentTop:{
        paddingTop: ukuran.dp_16,
        paddingBottom: ukuran.dp_16,
        marginEnd: ukuran.dp_16,
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
    }

})

export default AddressData