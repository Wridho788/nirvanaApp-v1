'use strict'

import { CartDataCheckout } from "../../layouts/items/cart_data"
import strings from "../../material/strings"
import React from 'react'
export function loadInvoiceProduct(data){
    var mapData = []
    var dataMap = []

    if(mapData > 0){
        mapData = []
        dataMap = []
    }
    for(let i = 0; i < data.length ; i++){
        var dataSet = data[i]
        mapData.push({
            color: dataSet.color,
            sizeid: (dataSet.sizeid == null) ? '-' : dataSet.sizeid,
            productName: dataSet.name,
            productTotalPrice: dataSet.product_price,
            productQty: dataSet.qty,
            productImage: strings.imageThumbnail+ dataSet.img
        })
    }
    dataMap = mapData.map(product => (     
        <CartDataCheckout productName={product.productName}
            productQty={product.productQty} hargaSatuan={product.productTotalPrice / product.productQty}
            stockId={'-'}
            underline={false} 
            productImage={product.productImage}
            productColor={product.color} productSize={product.sizeid}/>  
    ))

    return dataMap
}