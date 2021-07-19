'use strict'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native'
import { useState } from 'react'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import TextTitle from './title_text'
import ChipSize from './chips_size_layout'
const PopupFilter = (props) => {
    const [isReady, setIsReady] = useState(false)
    var categoryMap = []
    var map3 = []
    var map2 = []
    var map1 = []
    useEffect(()=>{
        if(props.data.length > 0){
            setIsReady(true)   
        }
    }, [props.data])

    if(isReady){
        var dataArray = props.data
        for(let i = 0; i < dataArray.length; i++){
                categoryMap.push(
                    {
                        position: i,
                        categoryId: dataArray[i].categoryid,
                        category_name: dataArray[i].category_name,
                        collectionid: dataArray[i].collectionid,
                        cat_img: strings.imageMainBase + dataArray[i].cat_img,
                        category_visible: dataArray[i].category_visible
                    }
                )
                }
            
    }

    const initializeData = (datArr, number) => {
        var mapData = []
        for(let i =0 ; i < categoryMap.length; i++){
            var dataS = categoryMap[i]
            if(dataS.collectionid == number){
                mapData.push(
                    {
                        position: i,
                        categoryId: dataArray[i].categoryid,
                        category_name: dataArray[i].category_name,
                        collectionid: dataArray[i].collectionid,
                        cat_img: strings.imageMainBase + dataArray[i].cat_img,
                        category_visible: dataArray[i].category_visible
                    }
                )
            }
        }
        return datArr = mapData.map ( sizeData => (  
            <ChipSize position={sizeData.position} textSize={sizeData.category_name} onpressed={e => {
                props.clicked(sizeData.categoryId)
            }}/>
        ))
    }

    return(
            <View style={styleFilter.parent}>
                <TextTitle fontSize={ukuran.dp_16} align={'left'} tipe={'bold'} text={strings.filter.toUpperCase()}
                    maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_12} 
                    left={ukuran.dp_14} end={ukuran.dp_14} start={ukuran.dp_14} top={ukuran.dp_12}/>
                <FilterItem filterTitle={strings.yogaMat} onpressed={e => props.onSeAllClick(3)}/>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {initializeData(map3, 3)}
                </View>    
                <FilterItem filterTitle={strings.accesories} onpressed={e => props.onSeAllClick(2)}/>  
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {initializeData(map2, 2)}
                </View> 
                <FilterItem filterTitle={strings.apparel} onpressed={e => props.onSeAllClick(1)}/>   
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {initializeData(map1, 1)}
                </View> 
            </View>
            
    )
}

const FilterItem = (props) =>{

    return(
        <>
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{width: '75%'}}>
                    <TextTitle fontSize={ukuran.dp_16} align={'left'} tipe={'bold'} text={props.filterTitle}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_12} 
                        left={ukuran.dp_14} end={ukuran.dp_14} start={ukuran.dp_14} top={ukuran.dp_12}/>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onpressed}>
                    <TextTitle fontSize={ukuran.dp_16} align={'left'} text={'See all'}
                        maxLine={1} warna={color.redNirvana} bottom={ukuran.dp_12} 
                        left={ukuran.dp_14} end={ukuran.dp_14} start={ukuran.dp_14} top={ukuran.dp_12}/>  
                </TouchableOpacity>  
            </View>
        </>
    )
}

const styleFilter = StyleSheet.create({
    parent:{
        height: ukuran._matchparent,
        backgroundColor: color.white,
        borderTopEndRadius: ukuran.dp_16,
        borderTopStartRadius: ukuran.dp_16
    }
})

export default PopupFilter