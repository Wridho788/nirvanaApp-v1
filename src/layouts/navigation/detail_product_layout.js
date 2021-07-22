'use strict'

import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Image } from "react-native"
import color from "../../material/color"
import { SliderBox } from 'react-native-image-slider-box'
import ukuran from '../../material/dimen'
import UnderlineLayout from '../items/underline_layout'
import LoadProductData from '../../services/produk_list_load'
import strings from '../../material/strings'
import Constant from '../../material/constant'
import ListImage from '../../services/load_image_product_detail'
import { getDetailProduct, setListImages } from '../../services/data_detail_product'
import { useState } from 'react'
import { getImageList } from '../../functions/get_image_detail_list'
import PriceNumber from '../items/number_format'
import ListChipColor from '../../services/load_list/load_chip_color_list'
import CheckoutButton from '../items/floating_checkout_button'
import HTML from 'react-native-render-html'
import BottomSheet from 'reanimated-bottom-sheet'
import { useRef } from 'react'
import PopupOrderDetail from '../items/modal_detail_add_to_cart'
import Animated from 'react-native-reanimated'
import TextTitle from "../items/title_text";
import LoadingAnimationLayout from '../items/loading_animation'
import TopHomeBar from '../items/home_top'
import { getAllCartItem, getAllStockCartItem } from '../../services/database/service_sqlite'
import DetailTopBar from '../items/detail_top_bar'

const DeatailProduct = (props) => {
    //USING array.map untuk identifikasi posisi thumbnail image
    const [data, setData] = useState({})
    const sheetRef = useRef(null)
    const [isLoading, setLoading] = useState(false)
    const [imageDetail, setImageDetail] = useState(0)
    const [onDisableView, setDisableView] = useState('')
    const [dataCart, setDataCart] = useState(0)
    const [imageUrlDetail, setImageDetailUrl] = useState('')
    
    useEffect(() =>{
        (async ()=> {
            var data = await getAllStockCartItem()
            setDataCart(data.stockIdData.length)
        })()
    }, [null])


    getDetailProduct(props.route.params.idProduct, setData, setLoading, setImageDetailUrl)
    if (!isLoading) {
        return <LoadingAnimationLayout />
    }


    var dataArra = JSON.stringify(data['image'])
    var dataSlider = getImageList(dataArra)
    var detailProduct = data['product']
    var stockData = JSON.stringify(data['stock'])
    const bottomSheetContent = () => {
        return (<PopupOrderDetail isSelected={e => {
            if (e == "success") {
                setDataCart(dataCart+1)
                sheetRef.current.snapTo(1)
                
            }else if(e == "avail"){
                sheetRef.current.snapTo(1)
            }
        }} colorList={stockData} detail={detailProduct} productId={props.route.params.idProduct} />)
    }

    let fall = new Animated.Value(1);
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
        inputRange: [0, 1],
        outputRange: [0.5, 0],
    });

    return (
        <>
            <DetailTopBar navigasi={props.navigation} cart={dataCart} />
            <ScrollView style={{ backgroundColor: color.white, position: 'relative', alignSelf: 'baseline' }} pointerEvents={onDisableView} showsVerticalScrollIndicator={false}>
                <View style={styleDetail.parent}>
                    <Image
                        resizeMode="contain"
                        fadeDuration={0}
                        resizeMethod="resize"
                        style={styleDetail.sliderImage}
                        source={{ uri: strings.imageMainBase+ imageUrlDetail }}
                    />
                    {/*<SliderBox
                        images={dataSlider}
                        style={styleDetail.sliderImage}
                        inactiveDotColor={color.white_300}
                        activeOpacity={1}
                        resizeMethod={'resize'}
                        resizeMode={'cover'}
                        autoPlay={true}
                        dotColor={color.defaultColor}
                        dotStyle={{
                            width: ukuran.dp_8,
                            height: ukuran.dp_8,
                        }}/>*/}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: ukuran.dp_24 }}>
                        <View
                            style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <ListImage image={dataSlider} onImageSelected={index => {
                                setImageDetailUrl(dataSlider[index])}} />
                        </View>
                    </ScrollView>
                    <UnderlineLayout />
                    <Text style={styleDetail.titleBoldStye}>{strings.color}</Text>
                    <View style={{
                        width: ukuran.wpMatchParent,
                        alignSelf: 'center',
                        marginBottom: ukuran.dp_20,
                        marginTop: ukuran.dp_16,
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <ListChipColor stockData={stockData} onpressed={(e, h, i) => setImageDetailUrl(i)} />
                    </View>

                    {(detailProduct.free_grafir != 0) ?
                        <Text style={styleDetail.labelCustomize}>Free Customize Name</Text>
                        : null}

                    <Text style={styleDetail.titleStyle}>{detailProduct.name}</Text>
                    <PriceNumber gaya={styleDetail.priceStyle} price={detailProduct.final_price} />
                    {(detailProduct.sale != 0) ?
                        <View style={styleDetail.saleStyle}>
                            <View style={{ backgroundColor: color.redNirvana }}>
                                <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'bold'} text={`${detailProduct.sale}%`}
                                    end={ukuran.dp_4} start={ukuran.dp_4}
                                    maxLine={1} warna={color.white} top={ukuran.dp_4} bottom={ukuran.dp_4} />
                            </View>
                            <PriceNumber price={detailProduct.price} gaya={styleDetail.priceTextBefore} />
                        </View>
                        : null}
                    <UnderlineLayout />
                    <Text style={styleDetail.description}>{strings.description}</Text>
                    {(String(detailProduct.description).length > 0) ?
                        <HTML source={{ html: detailProduct.description.replace('<p><br></p>', '') }} containerStyle={styleDetail.description} />
                        : null
                    }
                    <UnderlineLayout />
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View
                            style={{ flexWrap: 'wrap', flexDirection: 'row', marginStart: ukuran.dp_18, marginBottom: ukuran.dp_14 }}>
                            <LoadProductData type={strings.hightLightText} url={Constant.highlightProduct} navigation={props.navigation}
                                nextRoute={'DetailProduct'} />
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <CheckoutButton
                isNotAvail={(detailProduct.available != 0) ? false : true}
                priceTotal={detailProduct.final_price} onpress={e => {
                sheetRef.current.snapTo(0)
                setDisableView('none')
            }} />

            <BottomSheet
                ref={sheetRef}
                snapPoints={['70%', 0, 0]}
                borderRadius={30}
                callbackNode={fall}
                initialSnap={1}
                onCloseEnd={() => setDisableView('')}
                renderContent={bottomSheetContent} />

            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: "#000",
                        opacity: animatedShadowOpacity,
                    },
                ]}
            />
        </>

    )



}

const styleDetail = StyleSheet.create({
    container: {
        backgroundColor: color.white,
    },

    saleStyle: {
        flexDirection: 'row',
        marginBottom: ukuran.dp_14,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    parent: {
        width: ukuran.wpMatchParent,
    },

    priceTextBefore: {
        maxWidth: ukuran.productListWidth,
        fontFamily: 'Montserrat',
        marginStart: ukuran.dp_14,
        fontSize: ukuran.dp_14,
        textDecorationLine: 'line-through',
        color: color.redNirvana,
    },

    labelCustomize: {
        backgroundColor: color.defaultColor,
        bottom: 0,
        flexDirection: 'row',
        color: color.white,
        fontFamily: 'Montserrat',
        fontSize: ukuran.dp_14,
        marginBottom: ukuran.dp_10,
        padding: ukuran.dp_6,
        alignSelf: 'flex-start',
        marginStart: '5%',
        alignItems: 'baseline',
        opacity: 0.85

    },

    sliderImage: {
        alignSelf: 'center',
        width: '95%',
        height: ukuran.sliderHeight,
    },
    titleBoldStye: {
        fontSize: ukuran.dp_22,
        color: color.defaultColor,
        fontFamily: 'montserrat-bold',
        marginTop: ukuran.dp_30,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    description: {
        fontSize: ukuran.dp_18,
        color: color.defaultColor,
        fontFamily: 'montserrat-bold',
        marginTop: ukuran.dp_14,
        marginBottom: ukuran.dp_14,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    titleStyle: {
        fontSize: ukuran.dp_22,
        color: color.defaultColor,
        fontFamily: 'montserrat-bold',
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    priceStyle: {
        fontSize: ukuran.dp_18,
        marginTop: ukuran.dp_16,
        marginBottom: ukuran.dp_20,
        color: color.defaultColor,
        fontFamily: 'Montserrat',
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    }


})

export default DeatailProduct