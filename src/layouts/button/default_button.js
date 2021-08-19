'use strict'

import React, { Component } from 'react'
import { Text, ToastAndroid, TouchableHighlight, View } from "react-native"
import color from '../../material/color'
import ukuran from '../../material/dimen'

const CustomButton = ({width, backgroundColor, text, onpressed}) =>{
    let panjang = (width == 'wrap') ? 'center' : 'stretch'
    let colorOnpress = (backgroundColor == color.defaultColor) ? color.white : color.white_300
    let textColor = (backgroundColor == color.defaultColor) ? color.white : color.defaultColor
    return(
      <View style={{
        marginBottom: ukuran.dp_4,
        marginLeft: ukuran.dp_8,
        alignItems: panjang}}>
    <TouchableHighlight
      underlayColor={colorOnpress}
      style={{borderRadius: ukuran.dp_8, width: 340, height: 40}}
      onPress={onpressed}>
      <View
          style={{ 
          backgroundColor: backgroundColor,
          borderColor: color.defaultColor,
          borderWidth: 2,
          borderRadius: ukuran.dp_8}}>
          <Text style={{fontSize: ukuran.fontSmall,
              fontFamily: 'montserrat-bold',
              paddingTop: ukuran.hpPercent1-3,
              paddingBottom: ukuran.hpPercent1,
              paddingEnd: ukuran.dp_20,
              paddingStart: ukuran.dp_20,
              textAlign: 'center',
              color: textColor}}>{text}</Text>
      </View>

    </TouchableHighlight>
  </View>  
      
    )
}

export default CustomButton