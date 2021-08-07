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

const PreviewMat = (props) => {

    const [isProgress, setProgress] = useState(false)
    const [matName, setMatName] = useState('')
    const [matId, setMatId] = useState('')
    const [matOwner, setMatOwner] = useState('')
    const [matColor, setMatColor] = useState('')
    const [gifUrl, setMatGifUrl] = useState('')
    const [isUsed, setUsed] = useState(false)

    var componentHide = false

    useEffect(() => {
        fetchData(props.matData)
    }, [props.matData])

    function fetchData(matData) {
        if (matData.full_name != null) {
            setUsed(true)
            setMatId(matData.code)
            setMatName(matData.name)
            setMatColor(matData.color)
            setMatOwner(matData.full_name)
            setMatGifUrl(matData.mnm_animation_url)
        } else {
            setUsed(false)
            setMatId(matData.code)
            setMatName(matData.name)
            setMatOwner('')
            setMatColor(matData.color)
            setMatGifUrl(matData.mnm_animation_url)
        }
        console.log(matOwner)
    }

    const addMatProcess = async () => {
        if (matOwner.length > 0) {
            console.log('Ada' + matOwner)
            showSnackBar(strings.something_wrong)
        } else {
            setProgress(true)
            var reqeuestAddMat = await requestAddMatData(matId)
            var matResponse = getResponseMat(reqeuestAddMat)
            if (matResponse == strings.sucess) {
                showSnackBar(strings.matAdded)
            } else {
                showSnackBar(matResponse)
            }
            props.isAdded(true)
            setProgress(false)
        }
    }

    return (
        <>
            <View style={styleMat.parent}>
                {!isProgress &&
                    <View style={{ margin: ukuran.dp_14 }}>
                        <TextTitle fontSize={ukuran.dp_16} align={'center'} tipe={'bold'} text={matOwner}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_14} top={ukuran.dp_14} />
                        <View style={{ height: 230, alignItems: 'center' }}>
                            <FastImage style={styleMat.image} source={gifUrl ? { uri: gifUrl } : null} />
                        </View>
                        <TextTitle fontSize={ukuran.dp_16} align={'center'} tipe={'bold'} text={`${matName} - ${spacingUpperCase(capitalize(matColor))}`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_14} top={ukuran.dp_16} />
                        {isUsed && <TextTitle fontSize={ukuran.dp_14} align={'center'} text={''}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20}/>}
                        {!isUsed ?
                            <View>
                                <TextTitle fontSize={ukuran.dp_14} align={'center'} tipe={'normal'} text={matId}
                                    maxLine={1} warna={color.white_100} bottom={ukuran.dp_14} />
                                <CustomButton
                                    width={'match'}
                                    onpressed={e => addMatProcess()}
                                    backgroundColor={color.defaultColor}
                                    text={strings.add} />
                            </View>
                            :
                            <View>
                                <CustomButton
                                    width={'match'}
                                    onpressed={props.onStartPress}
                                    backgroundColor={color.defaultColor}
                                    text={!props.onStartText ?`Start Yoga` : props.onStartText} />
                                    
                                <CustomButton
                                    width={'match'}
                                    onpressed={props.onProgressPress}
                                    backgroundColor={color.white}
                                    text={!props.onProgressText ?`Progress` : props.onProgressText} />
                            </View>
                                
                        }
                        <CustomButton
                            width={'match'}
                            onpressed={props.onBackPressed}
                            backgroundColor={color.white}
                            text={strings.back} />
                    </View>
                }
                {isProgress &&
                    <View style={styleMat.progress}>
                        <CircleProgressBar />
                    </View>}
            </View>
        </>
    )
}

const styleMat = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        height: ukuran._matchparent
    },

    progress: {
        alignSelf: 'center',
        position: 'absolute',
        top: '30%',
    },

    image: {
        height: undefined,
        width: '100%',
        flex: 1,
        aspectRatio: 1,
        backgroundColor: color.white
    }
})

export default PreviewMat