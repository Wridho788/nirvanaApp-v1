'use strict'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { capitalize, showSnackBar, spacingUpperCase } from '../../../../functions/helper'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import strings from '../../../../material/strings'
import { getResponseMat, requestAddMatData } from '../../../../services/mat_process'
import CustomButton from '../../../button/default_button'
import { CircleProgressBar } from '../../../items/progress_bar'
import TextTitle from '../../../items/title_text'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'

const NfcPopup = (props) => {

    return(
        <>
           <View style={styleMat.parent}>
                <View style={{margin: ukuran.dp_14}}>
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} tipe={'bold'} text={'Ready to Scan'}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={ukuran.dp_14} />
                    <View style={{height: ukuran.matPreviewHeight}}>
                        {/* <FastImage style={styleMat.image} source={gifUrl ? { uri: 'gifUrl' } : null} /> */}
                        <Video source={require('../../../../../assets/video/gif_scan.mp4')}
                            style={{width: 110, height: 110, borderRadius: 110/2, alignSelf: 'center'}} repeat={true} resizeMode="cover"/>
                        <TextTitle fontSize={ukuran.dp_16} align={'center'} text={`Move closer to your Nirvana Mat`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20} top={ukuran.dp_20}/>

                        <CustomButton
                            onpressed={props.onBackPressed}
                            backgroundColor={color.white}
                            text={strings.back} />    
                    </View>              
                </View>
               
            </View>  
        </>
    )
}

const styleMat = StyleSheet.create({
    parent: {
        height: ukuran._matchparent,
        borderRadius: ukuran.dp_30,
        backgroundColor: color.white
    },

    progress:{
        alignSelf: 'center',
        position: 'absolute',
        top: '30%',
    },

    image:{
        height: undefined,
        width: '100%',
        flex: 1,
        aspectRatio: 1,
        backgroundColor: color.white
    }
})

export default NfcPopup