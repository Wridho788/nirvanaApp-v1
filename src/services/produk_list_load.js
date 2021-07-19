'use strict'

import React, {Component} from 'react'
import axios from 'axios'
import { useState } from 'react'
import ProductLayout from '../layouts/items/product_data_layout'
import { useEffect } from 'react'
import strings from '../material/strings'
import { CommonActions } from '@react-navigation/routers'
import Constant from '../material/constant'

const LoadProductData = (props) =>{
    var productMap = []
    var dataMap = []
    const [dataArray, setDataProduct] = useState([])

    useEffect(() =>{
        getData()
    }, [null])
        if(props.type == strings.hightLightText){
            if(props.shop){
                props.dataget(dataArray.length)
            }
            for(let i = 0; i < dataArray.length; i++){
                productMap.push({
                        price: dataArray[i].final_price,
                        titleProduct: dataArray[i].name,
                        beforePrice: dataArray[i].price,
                        freeGrafir: dataArray[i].free_grafir,
                        sale: dataArray[i].sale,
                        preview: strings.imageThumbnail+ dataArray[i].preview,
                        color: dataArray[i].color,
                        image: dataArray[i].image,
                        productid: dataArray[i].productid
                    }
                )
                dataMap = productMap.map(product => (
                    <ProductLayout price={product.price} bPrice={product.beforePrice} titleProduct={product.titleProduct} 
                        url={product.preview} colorData={product.color} imageData={product.image}
                        percentDiscount={product.sale}
                        freeGrafir={product.freeGrafir}
                        onpressed={e => goToDetail(product.productid)}/>
                ))
            }
         }else if(props.type == strings.homeData){
             Object.keys(dataArray).forEach(function(key, index){
                 if(key == props.keya){
                     getDataHome()
                 }
             })
            
         }
         return(
            <>
               {dataMap}
               
           </>
        )

    async function getData(){
       await axios.get(props.url, {
           headers:{
               'origin':  Constant.origin 
           }
       })
            .then(res =>{
                if(props.homepage){
                    props.isLoaded(true)
                }
                setDataProduct(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    function goToDetail(id){
        //props.navigation.navigate(props.nextRoute, {idProduct: id})

        props.navigation.setOptions({headerShown:false})
        props.navigation.push(props.nextRoute, {idProduct: id})
    }


    function getDataHome(){
        var panjang = dataArray[props.keya].length >= 4 ? 4:  dataArray[props.keya].length
        for(let i = 0; i < panjang; i++){
            productMap.push(
                {
                    price: dataArray[props.keya][i].final_price,
                    titleProduct: dataArray[props.keya][i].name,
                    beforePrice: dataArray[props.keya][i].price,
                    freeGrafir: dataArray[props.keya][i].free_grafir,
                    sale: dataArray[props.keya][i].sale,
                    preview: strings.imageThumbnail+ dataArray[props.keya][i].preview,
                    color: dataArray[props.keya][i].color,
                    image: dataArray[props.keya][i].image,
                    productid: dataArray[props.keya][i].productid
                }
            )
            dataMap = productMap.map(product => (
                <ProductLayout price={product.price} bPrice={product.beforePrice} titleProduct={product.titleProduct} 
                    url={product.preview} colorData={product.color} imageData={product.image}
                    percentDiscount={product.sale}
                    freeGrafir={product.freeGrafir}
                    onpressed={e => goToDetail(product.productid)}/>
            ))
        }
    }
}

export default LoadProductData