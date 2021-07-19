'use strict'

import React, {Component} from "react"
import { Text } from "react-native"
import NumberFormat from "react-number-format"
const PriceNumber =(props)=>{
    return(
        <NumberFormat value={props.price} displayType='text' decimalSeparator='.' prefix='Rp. ' thousandSeparator={true}
            renderText={formattedValue =><Text style={props.gaya}>{formattedValue.replace(/,/g, '.')}</Text>}/>
    )

}

export default PriceNumber