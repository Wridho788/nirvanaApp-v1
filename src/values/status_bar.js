'use strict'

import { StatusBar, View } from 'react-native'
import styleData from './style'

const LightStatusBar = () =>{
    return(
        <View style={styleData.lightStatusBar}>
            <StatusBar
                barStyle='light-content'
                translucent/>
        </View>
    )
}


const DarkStatusBar = () =>{
    return(
        <View style={styleData.darkStatusBar}>
            <StatusBar
                barStyle='dark-content'
                translucent/>
        </View>
    )
}

export default DarkStatusBar
