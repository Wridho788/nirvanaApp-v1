'use strict'

import React from 'react'
import { Circle } from 'react-native-progress'
import { useEffect, useState } from 'react'
import {CartData, CartDataCheckout} from '../../layouts/items/cart_data'
import { CircleProgressBar, CustomProgressBar } from '../../layouts/items/progress_bar'
import Constant from '../../material/constant'
import strings from '../../material/strings'
import { loadCartData } from '../cart_process'
import { getAllCartItem, getAllStockCartItem } from '../database/service_sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertPrice } from '../../functions/helper'

const LoadCartData = (props) =>{
    var cartMap = []
    var mapCart = []
    const [totalHarga, setTotalHarga] = useState(0)
    const [quantityData, setQuantityData] = useState([]) 
    const [noteData, setNoteData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [positionDel, setPosition] = useState(-1)
    const [isDelete, setDeleted] = useState(false)
    const [cartData, setCartData] = useState([])
    var hargaTotal = 0
    useEffect(()=>{
        if(!isLoaded){
            // cartMap = []
            // mapCart = []
            // setCartData([])
            //setQuantityData([])
            getData()
            if(props.data == 'cart'){
                props.isChange(true)
                if(isDelete){
                    if(positionDel != -1){
                        mapCart.slice(positionDel, 1)
                        setDeleted(false)
                        setPosition(-1)
                        AsyncStorage.setItem('cartUp', 'yes')
                    }
                }
            }
        }
    }, [isLoaded])


    const getData = async () =>{
        var stockData = await getAllStockCartItem()
        setQuantityData(stockData.quantityData)
        setNoteData(stockData.noteDataCart)
        let data = {
            stock: stockData.stockIdData
        }
        props.totalData(stockData.stockIdData.length)
        var dataKeranjang = await loadCartData(data, Constant.urlListCart)
        setLoaded(true)
        setCartData(dataKeranjang.reverse())
    }

    for(let i = 0; i < cartData.length; i++){
        var indexData = cartData[i]
        hargaTotal += indexData.final_price * quantityData[i]
        mapCart.push({
            position: i,
            stockId: indexData.stockid,
            color: indexData.color,
            sizeid: (indexData.sizeid == null) ? '-' : indexData.sizeid,
            productName: indexData.name,
            price: indexData.final_price,
            qty: quantityData[i],
            note: noteData[i],
            productImage: indexData.img
        })
    }

    if(props.data == 'cart'){
        //data cart
        cartMap = mapCart.map(dataCart =>(
            
            <CartData productName={dataCart.productName}
                productQty={dataCart.qty} hargaSatuan={dataCart.price}
                onDeleted={e => {
                    setPosition(dataCart.position)
                    setDeleted(true)
                    setLoaded(false)
                }}
                note={dataCart.note}
                stockId={dataCart.stockId} onChange={total => {
                    
                    setLoaded(false)
                }}
                productImage={strings.imageThumbnail + dataCart.productImage}
                productColor={dataCart.color} productSize={dataCart.sizeid}/>
        ))
    }else{
        //data checkout
        cartMap = mapCart.map(dataCart =>(
            
            <CartDataCheckout productName={dataCart.productName}
                productQty={dataCart.qty} hargaSatuan={dataCart.price}
                stockId={dataCart.stockId} 
                note={(dataCart.note.length > 0) ? dataCart.note : '-'}
                productImage={strings.imageThumbnail + dataCart.productImage}
                productColor={dataCart.color} productSize={dataCart.sizeid}/>
        ))
    }
    return(
        <>
            {cartMap}
        </>
    )
}

export default LoadCartData