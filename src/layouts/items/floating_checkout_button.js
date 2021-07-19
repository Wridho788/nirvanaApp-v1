import { StyleSheet, Text, View } from "react-native"
import color from "../../material/color"
import React from 'react'
import ukuran from "../../material/dimen"
import { TouchableOpacity } from "react-native-gesture-handler"
import strings from "../../material/strings"
import UnderlineLayoutGrey from "./underline_layout_grey"
import PriceNumber from "./number_format"

const CheckoutButton = (props) =>{
    var textButton = (props.textButton == strings.checkout || props.textButton == strings.payment) ? props.textButton : strings.buy_now
    return(
        <View style={styles.parent}>
            <UnderlineLayoutGrey/>
            <View style={styles.parentHorizontal}>
                <View style={styles.firstItem}>
                    <Text style={styles.normalText}>Total</Text>
                    <PriceNumber price={props.priceTotal} gaya={styles.priceStyle}/>
                </View>
                {(!props.isNotAvail) ?
                <View style={{flex:1}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.secondItem}
                        onPress={props.onpress}>
                        <Text style={styles.buyStyle}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.secondItemNotAvailable}>
                    <Text style={styles.buyStyle}>Sold out</Text>
                </View>
                }
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    parent:{
        backgroundColor: color.white,
        bottom: 0,
        alignSelf: 'baseline',
        width: '100%',
    },

    parentHorizontal:{
        width: '100%',
        flexDirection: 'row',
    },

    firstItem:{
        width: '60%',
        padding: ukuran.dp_14,
        backgroundColor: color.white
    },

    secondItem: {
        height: 80,
        alignItems: 'center',
        color: color.white,
        justifyContent: 'center',
        backgroundColor: color.defaultColor
    },

    secondItemNotAvailable:{
        width: '40%',
        alignItems: 'center',
        color: color.white,
        justifyContent: 'center',
        backgroundColor: color.white_100
    },


    buyStyle: {
        fontSize: ukuran.dp_16,
        fontFamily: strings.montserrat_bold,
        color: color.white
    },
    priceStyle:{
        fontSize: ukuran.dp_16,
        marginTop: ukuran.dp_8,
        fontFamily: strings.montserrat_bold,
        color: color.defaultColor
    },

    normalText: {
        fontSize: ukuran.dp_14,
        fontFamily: strings.montserrat_normal,
        color: color.defaultColor
    }
})

export default CheckoutButton