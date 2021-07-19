'use strict'

import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import CustomButton from '../button/default_button'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import TextTitle from '../items/title_text'
import { useState ,useEffect} from 'react'
import jwtDecode from 'jwt-decode'
import { showSnackBar } from '../../functions/helper'
import { authAccountProccess } from '../../services/account_process'
import Constant from '../../material/constant'
import { CustomProgressBar } from '../items/progress_bar'

const OtpVerifLayout = (props) =>{
    const [otpCode, setOtpCode] = useState('')
    const [processDialog, setProcess] = useState(false)
    var token = props.route.params.jwtToken
    var decodeJwt = jwtDecode(token)
    var messageSend = decodeJwt.target.message
    const [isResend, setResendStatus] = useState(false)
    const [timer, setCountDownTime] = useState(decodeJwt.resendDuration/1000)
    useEffect(() => {
        if(timer != 0){
            setTimeout(() =>{
                setCountDownTime(timer-1)
            }, 1000)
        }else{
            setResendStatus(true)
        }
      }, [timer])

    const validateProcess = async () =>{
        setProcess(true)
        if(String(otpCode).length == 6){
            let body = JSON.stringify({
                "OTP": otpCode
            })
            var validateResponse = await authAccountProccess(body, Constant.validateOtpUrl)
            if(validateResponse == "OK"){
                showSnackBar(strings.register_completed)
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                })
            }else{
                if(validateResponse.message != null && validateResponse.message != undefined){
                    var errMessage = validateResponse.message
                    console.log("Error Login" + errMessage)
                    showSnackBar(errMessage)
                }else{
                    showSnackBar(strings.something_wrong)
                }
            }
        }else{
            showSnackBar('Incomplete OTP code')
        }
        setProcess(false)
    } 
    
    const resendProcess = async () =>{
        setProcess(true)
        var resendResponse = await authAccountProccess({}, Constant.resendOtpUrl)
        if(String(resendResponse).length > 200){
            setResendStatus(false)
            setCountDownTime(decodeJwt.resendDuration/1000)
            showSnackBar('Code resend')
        }else{
            if(resendResponse.message != null && resendResponse.message != undefined){
                var errMessage = resendResponse.message
                console.log("Error Login" + errMessage)
                showSnackBar(errMessage)
            }else{
                showSnackBar(strings.something_wrong)
            }
        }
        setProcess(false)
    }

    return(
        <>
        <SafeAreaView style={{ backgroundColor: color.white, height: ukuran._matchparent }}>
                {processDialog && (<CustomProgressBar isVisible={processDialog}/>)}
                <View style={styleOtp.parent}>
                    <TextTitle fontSize={ukuran.dp_24} tipe={'bold'} align={'center'} text={String(strings.verification.toUpperCase())} bottom={ukuran.dp_14} top={100} />
                    <TextTitle maxLine={6} bottom={ukuran.dp_20} fontSize={ukuran.dp_14} text={messageSend} align={'center'} warna={color.defaultColor} />
                    <OTPInputView
                            style={{width: '100%', height: 100}}
                            pinCount={6}
                            onCodeChanged = {code => setOtpCode(code)}
                            autoFocusOnLoad
                            codeInputFieldStyle={styleOtp.underlineStyleBase}
                            keyboardType="number-pad"
                            codeInputHighlightStyle={styleOtp.underlineStyleHighLighted}
                            onCodeFilled = {(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                            })}
                        />
                    {isResend &&    
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={e=>{
                            resendProcess()
                        }}
                    >
                       <TextTitle bottom={ukuran.dp_20} fontSize={ukuran.dp_14} text={'Resend code'} align={'right'} warna={color.defaultColor} decoration={'underline'} />
                   </TouchableOpacity>
                    } 
                    <CustomButton
                        width={'match'}
                        onpressed={e => validateProcess()}
                        backgroundColor={color.defaultColor}
                        text={strings.validate} />
                    <TextTitle bottom={ukuran.dp_20} fontSize={ukuran.dp_14} text={`Resend button appears after ${timer}s`} align={'center'} warna={color.white_100} />
                </View>
            </SafeAreaView>
        </>
    )
}

const styleOtp = StyleSheet.create({
    parent:{
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },
    underlineStyleBase: {
        color: color.defaultColor,
        borderWidth: 1,
        borderColor: color.defaultColor
    },
})

export default OtpVerifLayout