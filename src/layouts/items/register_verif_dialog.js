'use strict'

import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import Email from '../../icons/mail.svg'
import WhatsApp from '../../icons/whatsapp_dark.svg'
import TextTitle from './title_text'
import strings from '../../material/strings'

const VerifMethodDialog = (props) =>{
    return(
        <>
        <View style={styleReg.parent}>
            <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`Select`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_16}/>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onMethodEmail}>
                    <View style={styleReg.parentItem}>
                        <Email/>
                        <View style={{marginStart: ukuran.dp_16, flexShrink: 1}}>
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`${strings.verification_to} ${props.email}`}
                            maxLine={2} warna={color.defaultColor} bottom={ukuran.dp_24} right={ukuran.dp_14}/>
                        </View>
                    </View> 
                </TouchableOpacity>   
                <TouchableOpacity activeOpacity={0.5} onPress={props.onMethodWhatsApp}>
                    <View style={styleReg.parentItem}>
                        <WhatsApp fill="#333"/>
                        <View style={{marginStart: ukuran.dp_16, flexShrink: 1}}>
                            <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`${strings.verification_to} ${props.phone}`}
                            maxLine={2} warna={color.defaultColor} />
                        </View>
                    </View> 
                </TouchableOpacity>
            </View>
        </>
    )
}

const styleReg = StyleSheet.create({
    parent: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    parentItem:{
        marginTop: ukuran.dp_10,
        flexDirection: 'row',
    }
})

export default VerifMethodDialog