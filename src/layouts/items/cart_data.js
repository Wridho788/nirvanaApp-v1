import React from 'react'
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from './title_text'
import Trash from '../../icons/trash.svg'
import Counter from 'react-native-counters'
import { capitalize, convertPrice, spacingUpperCase } from '../../functions/helper'
import UnderlineLayout from './underline_layout'
import { useState } from 'react'
import { deleteItemCart,  updateNoteCart,  updateQtyCart } from '../../services/database/service_sqlite'
import strings from '../../material/strings'
import InputText from './text_input'

const CartData = (props) =>{
    const [total, setTotalHarga] = useState(props.productQty * props.hargaSatuan)
    const [note, setNoteData] = useState(props.note)
    function onChangeNumber(number){
        (async () => { 
            setTotalHarga(number * props.hargaSatuan)
            var update = await updateQtyCart(props.stockId, number)
            if(update){
                props.onChange(number * props.hargaSatuan)
            }
        })()
    }

    const deleteDataCart = async (stockId) =>{
        var deleteData = await deleteItemCart(stockId)
        if(deleteData){
            props.onDeleted(true)    
        }    
    }

    const onChangeText = async(text) => {
        await updateNoteCart(props.stockId, text)
        setNoteData(text)
    }

    return(
        <>
            <View style={styleCart.parent}>
                <View style={styleCart.firstItem}>
                    <Image style={styleCart.image} source={{
                        uri: props.productImage
                    }}/>
                    <View style={styleCart.firstItemVertical}>
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'left'} text={props.productName} maxLine={1}/>
                        <TextTitle fontSize={13} align={'left'} text={`Color: ${spacingUpperCase(capitalize(props.productColor))}`} top={ukuran.dp_8} maxLine={1}/>
                        <TextTitle fontSize={13} align={'left'} text={`Size: ${capitalize(props.productSize)}`} top={ukuran.dp_8} maxLine={1}/>
                        
                    </View>
                    <TouchableOpacity
                        onPress={() => deleteDataCart(props.stockId)}>
                        <Trash/>
                    </TouchableOpacity>
                </View>
                <View style={styleCart.qty}>
                        <View style={{
                            marginEnd: ukuran.dp_30,
                            justifyContent: 'center'
                        }}>
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} text={'Qty'}/>
                        </View>
                        <Counter start={props.productQty} min={1} 
                            onChange={number => onChangeNumber(number)}
                            max={20} buttonStyle={styleCart.counterButton} 
                            buttonTextStyle={styleCart.counterButton}
                            countTextStyle={styleCart.counterButton}/>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                marginStart: ukuran.dp_10,
                                alignItems: 'flex-end'
                            }}>
                                <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'left'} text={convertPrice(total)} maxLine={1}/>
                            </View>

                </View>

                <TextInput
                                style={{ 
                                    padding: (Platform.OS == 'ios') ? ukuran.dp_8 : ukuran.dp_8,
                                    marginBottom: ukuran.dp_12,
                                    borderColor: color.defaultColor, borderWidth: 1, borderRadius: ukuran.dp_10, 
                                    flex: 1, marginEnd: ukuran.dp_8}}
                                    placeholder={strings.order_note}
                                    placeholderTextColor={color.white_100}
                                    underlineColorAndroid="transparent"
                                    textContentType="name"
                                    keyboardType="default"
                                    onChangeText={onChangeText}
                                    value={note}
                                    key={'I'}
                                autoCapitalize="none" />
                {/* <UnderlineLayout/> */}
            </View>
        </>
    )

}

const CartDataCheckout = (props) => {

    const [total, setTotalHarga] = useState(props.productQty * props.hargaSatuan)
    return(
        <>
            <View style={styleCart.parent}>
                <View style={styleCart.firstItem}>
                    <Image style={styleCart.image} source={{
                        uri: props.productImage
                    }}/>
                    <View style={styleCart.firstItemVertical}>
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'left'} text={props.productName} maxLine={1}/>
                        <TextTitle fontSize={13} align={'left'} text={`Color: ${spacingUpperCase(capitalize(props.productColor))}`} top={ukuran.dp_8} maxLine={1}/>
                        <TextTitle fontSize={13} align={'left'} text={`Size: ${capitalize(props.productSize)}`} top={ukuran.dp_8} maxLine={1}/>
                        
                    </View>
                </View>
                <View style={styleCart.qty}>
                        <View style={{
                            marginEnd: ukuran.dp_20,
                            justifyContent: 'center'
                        }}>
                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} text={'Qty'}/>
                        </View>

                        <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} text={props.productQty}/>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                marginStart: ukuran.dp_10,
                                alignItems: 'flex-end'
                            }}>
                                <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} align={'left'} text={convertPrice(total)} maxLine={1}/>
                            </View>

                </View>

                <TextTitle fontSize={ukuran.dp_12} align={'left'} text={`${strings.order_note}: ${props.note}`} maxLine={3}/>
            </View>
        </>
    )
}

const styleCart = StyleSheet.create({
    parent: {
        marginBottom: ukuran.dp_24,
        backgroundColor: color.white,
    },

    firstItem: {
        flexDirection: 'row',
        flex: 1,
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
        borderRadius: ukuran.dp_10,
        backgroundColor: color.white_300
    },

    qty:{
        marginTop: ukuran.dp_10,
        marginBottom: ukuran.dp_10,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },

    counterButton: {
        borderRadius: 39,
        color: color.defaultColor,
        fontSize: ukuran.dp_14,
        borderColor: color.defaultColor
    },
})

export {CartData, CartDataCheckout}