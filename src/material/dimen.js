'use strict'

import { Dimensions } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

var matchParent = Dimensions.get("window").height
var matchParentWidth = Dimensions.get("window").width
const ukuran = {
    dp_4: 4,
    dp_6: 6,
    dp_10: 10,
    dp_20: 20,
    dp_12: 12,
    dp_14: 14,
    dp_18: 18,
    dp_30: 30,
    dp_24: 24,
    dp_16: 16,
    dp_22: 22,
    dp_40: 40,
    dp_80: 80,
    witdthMatch: matchParentWidth,
    imageHorizontalThumbnail: 80,
    productListWidth: 180,
    fontMedium: 16,
    dp_8: 8,
    matPreviewHeight: 250,
    heightMp: hp('100%'),
    _matchparent: matchParent,
    wpPercent90: wp('90%'),
    wpMatchParent: wp('100%'),
    hpPercent1: hp('1.5%'),
    widthPercent2: wp('2%'),
    sliderHeight: 414,
}

export default ukuran