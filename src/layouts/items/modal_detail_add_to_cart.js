'use strict'

import React from 'react'
import {StyleSheet, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import ListChipColor from '../../services/load_list/load_chip_color_list'
import ChipSize from './chips_size_layout'
import ImageListThumbnail from './detail_image_horizontal'
import PriceNumber from './number_format'
import TextTitle from './title_text'
import Counter from 'react-native-counters'
import CustomButton from '../button/default_button'
import strings from '../../material/strings'
import { useState } from 'react'
import {loadSizeData} from '../../services/load_list/load_size_data_list'
import {insertProductToDatabase} from '../../services/database/service_sqlite'
import LoadSizeData from '../../services/load_list/new_load_size_data'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PopupOrderDetail = (props) => {
    var detail = props.detail
    var [idStock, setStockId] = useState('')
    var [nameColor, setColorName] = useState('')
    var [qtyProduct, setQuantity] = useState(1)
    var sizeArray = []
    var thumbnailJson = JSON.parse(props.colorList)
    var thumbnail  = strings.imageMainBase + thumbnailJson[0].preview_url
    var [imgUrlData, setImgUrl] = useState(thumbnail)

    if(nameColor != ''){
        if(idStock != 'NULL'){
            //sizeArray = loadSizeData(nameColor, setStockId, props.colorList)
            sizeArray =  <LoadSizeData colorName={nameColor} setStockId={setStockId} stockData={props.colorList}/>
        }
    }

    const setSelectedItem =(stokid, colorName, position) => {
        setStockId(stokid)
        setColorName(colorName)
        setImgUrl(strings.imageMainBase + position)
    }

    const processAddToCart = (qty, stokId, idProduk, finalPrice) => {
        
        (async () =>{
            var respon = await insertProductToDatabase(qty, stokId, idProduk, finalPrice)
            if(respon == "success" || respon == "avail"){
                props.isSelected(respon)
                AsyncStorage.setItem('cartUp', 'yes')
            }
        })()
    }

    return (
            <View style={styleData.parent}>
                <View style={styleData.detailFirst}>
                    <ImageListThumbnail imageUrl={imgUrlData}/>
                    <View style={styleData.verticalFirst}>
                        <TextTitle maxLine={2} fontSize={ukuran.dp_18} tipe={'bold'} text={detail.name}/>
                        <PriceNumber price={detail.final_price} gaya={styleData.priceText}/>
                    </View>
                </View>

                <View style={styleData.detailSecond}>
                    <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={strings.color}/>
                    <View style={{
                            width: ukuran.wpMatchParent,
                            alignSelf: 'center',
                            marginTop: ukuran.dp_16,
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                        <ListChipColor stockData={props.colorList} onpressed={(stockId, colorName, position) => setSelectedItem(stockId, colorName, position)}/>
                        </View>
                    <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={strings.size}/>
                    <View style={{
                            width: ukuran.wpMatchParent,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            {sizeArray}
                    </View>
                    <View style={styleData.qty}>
                        <View style={{
                            marginEnd: 30,
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                        <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={'Qty'}/>
                        </View>
                        <Counter start={1} min={1} 
                            onChange={number => setQuantity(number)}
                            max={20} buttonStyle={styleData.counterButton} 
                            buttonTextStyle={styleData.counterButton}
                            countTextStyle={styleData.counterButton}/>
                    </View>
                    <CustomButton
                            width={'match'}
                            onpressed={e => {
                                //AsyncStorage.removeItem('cart')
                                processAddToCart(qtyProduct, idStock, props.productId, detail.final_price)
                                
                            }}
                            backgroundColor={color.defaultColor}
                            text={strings.add_to_cart}/> 
                </View>
            </View>
    )

}

const styleData = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        height: ukuran._matchparent
    },

    qty:{
        marginTop: ukuran.dp_20,
        marginBottom: ukuran.dp_20,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },

    counterButton: {
        borderRadius: 39,
        color: color.defaultColor,
        fontSize: ukuran.dp_14,
        borderColor: color.defaultColor
    },

    detailFirst: {
        flexDirection: 'row',
    },

    detailSecond : {
        margin: ukuran.dp_22
    },

    verticalFirst: {
        marginStart: ukuran.dp_16,
        marginEnd: 100,
        marginTop: ukuran.dp_24,
        alignSelf: 'center'
    },

    priceText: {
        fontSize: ukuran.dp_18,
        marginTop: ukuran.dp_16,
        color: color.defaultColor,
        fontFamily: 'Montserrat',
    }

})

export default PopupOrderDetail