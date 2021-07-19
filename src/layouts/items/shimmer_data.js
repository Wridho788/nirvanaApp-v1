import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import Shimmer from 'react-native-shimmer'

const ShimmerData = (props) => {


    return(
        <>
        <Shimmer animationOpacity={1} opacity={0.5} pauseDuration={400} duration={1000}>  
            <View style={{backgroundColor: color.white}}>
                <View style={styleShim.parent}>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                </View>
                <View style={styleShim.parent}>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                </View>
                <View style={styleShim.parent}>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                </View>
                <View style={styleShim.parent}>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                    <View style={styleShim.parentItem}>
                        <View style={styleShim.image}></View>
                        <View style={styleShim.item}></View>
                        <View style={styleShim.item}></View>
                    </View>
                </View>
            </View>
        </Shimmer>
        
        </>
    )
}

const styleShim = StyleSheet.create({

    parent:{
        marginBottom: ukuran.dp_18,
        flexDirection: 'row',
    },

    parentItem:{
        marginStart: ukuran.dp_14,
        width:Dimensions.get('window').width/2.3,
    },

    image:{
        marginTop: ukuran.dp_20,
        marginStart: ukuran.dp_10,
        height: Dimensions.get('window').width/2,
        borderRadius: ukuran.dp_10,
        backgroundColor: color.white_300,
    },

    item:{
        marginStart: ukuran.dp_10,
        marginTop: ukuran.dp_10,
        height: 20,
        borderRadius: ukuran.dp_10,
        backgroundColor: color.white_300,
    }


})

export default ShimmerData