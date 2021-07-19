'use strict'

import React, {Component} from 'react'
import axios from 'axios'
import { useState } from 'react'

import { View } from 'react-native'
import { useEffect } from 'react'
import strings from '../material/strings'
import KategoriHome from '../layouts/items/home_kategori_layout'
import CategoryText from '../layouts/items/category_text_layout'
import Constant from '../material/constant'


const CategoryData = (props) => {
    var categoryMap = []
    var dataMap = []
    const [isLoading, setLoading] = useState(false) //true berarti data terload
    const [dataArray, setCategoryData] = useState([])
    useEffect(() =>{
        getData()
    }, [null])
    for(let i = 0; i < dataArray.length; i++){
        categoryMap.push(
            {
                categoryId: dataArray[i].categoryid,
                category_name: dataArray[i].category_name,
                collectionid: dataArray[i].collectionid,
                cat_img: strings.imageMainBase + dataArray[i].cat_img,
                category_visible: dataArray[i].category_visible
            }
        )
    }
    if(props.position == strings.homeData){   
        dataMap = categoryMap.map(category => (
            <KategoriHome url={category.cat_img}
            text={category.category_name}  onpressed={e => {
                props.navigation.setOptions({headerShown:false})
                props.navigation.push('Shop', {
                    screen: 'Shoping',
                    params: {catid: category.categoryId}
                })
        
        }}/>
      ))    
    }else if(props.position == 'Shop'){
        props.dataCat(dataArray)
        dataMap = categoryMap.map(category => (
            <CategoryText categoryName={category.category_name}  onpressed={e => props.selectId(category.categoryId)}/>
      )) 
    }
    return(
        <>
            {dataMap}
        </>
    )
    async function getData(){
        await axios.get(props.url ,{
            headers: {
                'Content-Type': 'application/json',
                origin: Constant.origin,
                Accept: "application/json"
            }
        })
             .then(res =>{
                 setCategoryData(res.data)
             })
             .catch(err =>{
                 console.log("Err: " +err)
             })
     }
 
     function categoryClick(id){
         console.log('ID: ' + id)
     }

}

export default CategoryData