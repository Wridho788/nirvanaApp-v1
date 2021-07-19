'use strict'

import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import color from "../../material/color";
import ukuran from "../../material/dimen";
import TextTitle from "../items/title_text";
import InputText from "../items/text_input";
import Email from '../../icons/mail'
import Password from '../../icons/password'
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../button/default_button";
import strings from "../../material/strings";
import { useState } from "react";
import {emailValidation, showSnackBar} from '../../functions/helper'
import {OneMessageProgress, CustomProgressBar} from '../items/progress_bar';
import {authAccountProccess} from '../../services/account_process'
import Constant from "../../material/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginLayout = (props) => {

    const [layoutStatus, setLayoutStatus] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailForgot, setEmailForgot] = useState('')
    const [process, setProcess] = useState(false)
    const [informationDialog, setInformationDialog] = useState(false)

    function processForgot(){
       
        if(emailForgot.length > 0 && emailValidation(emailForgot)){
            (async () =>{
                setProcess(true)
                let body = {
                    email: emailForgot
                }
                var responseForgot = await authAccountProccess(body, Constant.forgotPassword)
                if(responseForgot == 'OK'){
                    setInformationDialog(true)
                }else{
                    showSnackBar(responseForgot.message)
                }
                setProcess(false)
            })()
        }else{
            showSnackBar(strings.empty_detect + ' or ' + strings.email_not_valid)
        }

    }

    function loginProcess(pass, mail) {
       var emailUser = String(mail)
       var passwordUser = String(pass)

       if(emailValidation(emailUser)){
           //email valide
           if(passwordUser.length > 0){
               //process login
               (async ()=> {
                setProcess(true)
                const registerBody = JSON.stringify({
                    "email":  emailUser,
                    "password": passwordUser,
                    "signed": true
                })
                var loginResponse = await authAccountProccess(registerBody, Constant.loginProcess)
                if(String(loginResponse).length > 170){
                    var tokenLogin  = String(loginResponse)
                    AsyncStorage.setItem('tokenLogin', tokenLogin)
                    //showSnackBar(strings.success_login)
                    props.navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}]
                    })
                }else{
                    var errMessage = loginResponse.message
                    console.log("Error Login" + errMessage)
                    showSnackBar(errMessage)
                }
                setProcess(false)
            })()

           }else{
               showSnackBar(strings.empty_detect)
           }
       }else{
           showSnackBar(strings.email_not_valid)
       }
    }
    const forgotLayout = () => {
        return (
            <>
                <TextTitle fontSize={ukuran.dp_20} tipe={'bold'} align={'center'} text={String(strings.forgot_password)} bottom={ukuran.dp_24} />
                <InputText placeholder={strings.enterEmail} icon={Email} useIcon={true} onKetik={e => setEmailForgot(e)}/>
                <TouchableOpacity
                    onPress={()=> {
                        setLayoutStatus('login')
                        setEmailForgot('')}}>
                    <TextTitle bottom={ukuran.dp_20} fontSize={ukuran.dp_14} text={strings.login} align={'right'} decoration={'underline'} />
                </TouchableOpacity>
                <CustomButton
                    width={'match'}
                    onpressed={e => processForgot()}
                    backgroundColor={color.defaultColor}
                    text={strings.continue} />
            </>
        )
    }

    const loginLayout = () => {
        return (
            <>
                <TextTitle fontSize={ukuran.dp_24} tipe={'bold'} align={'center'} text={String(strings.login.toUpperCase())} bottom={ukuran.dp_24} />
                <InputText placeholder={strings.enterEmail} icon={Email} useIcon={true} onKetik={e=> setEmail(e)} data={email}/>
                <InputText placeholder={strings.password} icon={Password} isPassword={true} useIcon={true} onKetik={e=> setPassword(e)} />
                <TouchableOpacity
                    onPress={()=> setLayoutStatus('forgot')}>
                    <TextTitle bottom={ukuran.dp_20} fontSize={ukuran.dp_14} text={strings.forgot_password} align={'right'} decoration={'underline'} />
                </TouchableOpacity>
                <CustomButton
                    width={'match'}
                    onpressed={e => loginProcess(password, email)}
                    backgroundColor={color.defaultColor}
                    text={strings.login} />
                <Text style={{ alignSelf: 'center' }}>
                    <View>
                        <TextTitle fontSize={ukuran.dp_14} text={strings.didn_have_account} align={'center'} />
                    </View>
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Register')}
                        >
                        <TextTitle fontSize={ukuran.dp_14} text={strings.signup_here} align={'center'} warna={color.redNirvana} decoration={'underline'} />
                    </TouchableOpacity>
                </Text>
            </>
        )
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.white, height: ukuran._matchparent }}>
                <View style={styleLogin.parent}>
                    {(layoutStatus == 'login') ? loginLayout() : forgotLayout()}
                </View>
                {process && (<CustomProgressBar isVisible={process}/>)}
                {informationDialog && (<OneMessageProgress onClick={()=>{
                    setLayoutStatus('login')
                    setInformationDialog(false)
                    setEmailForgot('')
                }} isVisible={informationDialog} message={'A recovery email has been sent to your email address. Please follow and follow the next rules'}/>)}
            </SafeAreaView>
        </>
    )
}

export default LoginLayout

const styleLogin = StyleSheet.create({
    parent: {
        width: ukuran.wpPercent90,
        alignSelf: 'center',
        marginTop: 120,
    },


})

