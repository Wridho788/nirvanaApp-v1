
'use strict'

import color from '../material/color'
import ukuran from '../material/dimen'
import {Platform, StyleSheet} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'

const styleData = StyleSheet.create({


    lightStatusBar: {
        height: getStatusBarHeight(),
        backgroundColor: color.white
    },

    darkStatusBar: {
        height: getStatusBarHeight(),
        backgroundColor: color.defaultColor
    },

    scrollView: {
        width: ukuran.wpMatchParent,
        backgroundColor: color.white,
    },

    navigationTopBar:{
        backgroundColor : color.defaultColor,
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: ukuran.hpPercent1,
        paddingBottom: ukuran.hpPercent1,
        flexDirection: 'row-reverse'
    },

    appNameStyle:{
        color: color.white, 
        paddingBottom: ukuran.dp_8,
        fontSize: ukuran.fontMedium
    }
})

export default styleData