'use strict'

import {StyleSheet} from 'react-native'
import color from '../material/color'
import ukuran from '../material/dimen'

const textStyle = StyleSheet.create({

    titleBoldStye:{
        fontSize: ukuran.dp_18,
        color: color.defaultColor,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'montserrat-bold',
        width: ukuran.wpMatchParent
    },

    redBoldText: {
        fontFamily: 'montserrat-bold',
        fontSize: ukuran.dp_14,
        color: color.redNirvana,
        margin: ukuran.dp_10,
        alignSelf: 'flex-end'
    }

})

export default textStyle