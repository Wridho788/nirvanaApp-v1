'use strict'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { useRef, useState } from 'react'
import { showSnackBar } from '../../../../functions/helper'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import strings from '../../../../material/strings'
import { requestDataMat } from '../../../../services/mat_process'
import CustomButton from '../../../button/default_button'
import MatData from '../../../items/mat_data_layout'
import { CircleProgressBar } from '../../../items/progress_bar'
import InputText from '../../../items/text_input'
import TextTitle from '../../../items/title_text'

const MatPopup = (props) => {
    const [codeMat, setCodeMat] = useState('')
    const [keyboardOffset, setKeyboardOffset] = useState(0)
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height)
    const onKeyboardHide = () => setKeyboardOffset(0)
    const keyboardDidShowListener = useRef()
    const keyboardDidHideListener = useRef()
    const [isProgess, setProgress] = useState(false)
    function onChangeText(variable){
        return(text) =>{
            setCodeMat(text)
        }
    }

    useRef(() => {
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow)
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide)
        return() =>{
            keyboardDidShowListener.current.remove()
            keyboardDidHideListener.current.remove()
        }
    }, [])

    const addNewAddressProcess = async () =>{
        if(codeMat.length > 0){
            //props.showPreview(true, codeMat)
            setProgress(true)
            var requestMatData = await requestDataMat(codeMat)
            if(requestMatData != strings.mat_not_found_code && requestMatData.name != null && requestMatData.name != undefined){
                props.showPreview(true, requestMatData)
            }else{
                showSnackBar(requestMatData.message)
            }
            setProgress(false)
        }else{
            showSnackBar(strings.empty_detect)
        }
    }

    return(
        <>
        <KeyboardAvoidingView>
            <View style={styleMat.parent}>
                {!isProgess &&
                <View style={{margin: ukuran.dp_14}}>
                    <TextTitle fontSize={ukuran.dp_16} align={'center'} tipe={'bold'} text={'ADD NEW MAT'}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_14} top={ukuran.dp_14} />
                    
                    <InputText placeholder={'Enter Mat ID'} onKetik={onChangeText('oldPassword')} data={codeMat} />
                    <CustomButton
                        width={'match'}
                        onpressed={e => addNewAddressProcess()}
                        backgroundColor={color.defaultColor}
                        text={strings.continue} /> 
                    <CustomButton
                        width={'match'}
                        onpressed={props.onBackPressed}
                        backgroundColor={color.white}
                        text={strings.back} />    
                </View>
                }
                {isProgess && 
                <View style={styleMat.progress}>
                    <CircleProgressBar/>
                </View>}
            </View>
                    </KeyboardAvoidingView>    
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
        top: '15%',
    }
})

export default MatPopup