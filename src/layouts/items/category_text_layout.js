'use strict'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from './title_text'

const CategoryText = (props) =>{

    var backgroundColor = (props.background == undefined) ? color.white : color.defaultColor

    return(
        <>
            <TouchableOpacity style={{
                 borderRadius: ukuran.dp_8,
                 marginEnd: ukuran.dp_14,
                 backgroundColor: props.background,
                 justifyContent: 'center',
                 borderColor: color.white,
                 borderWidth: 2,
                 marginTop: ukuran.dp_24
            }} activeOpacity={0.6} onPress={props.onpressed}>
                <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={props.categoryName}
                        maxLine={1} warna={backgroundColor} bottom={ukuran.dp_12} 
                        left={ukuran.dp_14} end={ukuran.dp_14} start={ukuran.dp_14} top={ukuran.dp_12}/>
           </TouchableOpacity> 
        </>
    )
}


const styleShop = StyleSheet.create({
    

    categoryItem:{
       
    }
})

export default CategoryText
