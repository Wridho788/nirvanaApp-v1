'use strict'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { showSnackBar } from '../../../functions/helper'
import color from '../../../material/color'
import Constant from '../../../material/constant'
import ukuran from '../../../material/dimen'
import strings from '../../../material/strings'
import { authAccountProccess, requestChangePassword } from '../../../services/account_process'
import CustomButton from '../../button/default_button'
import { CustomProgressBar } from '../../items/progress_bar'
import InputText from '../../items/text_input'
import TextTitle from '../../items/title_text'

export default class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            isloaded: false,
            confirmPassword: ''
        }

        this.onChangeText = this.onChangeText.bind(this)
        this.changeProcess = this.changeProcess.bind(this)
    }
    
    onChangeText(variable){
        return(text) =>{
            this.setState({ [variable]: text})
        }
    }

    changeProcess(){
        (async() =>{
            var oldPas = String(this.state.oldPassword).trim()
            var newPas = String(this.state.newPassword).trim()
            var confirmPas = String(this.state.confirmPassword).trim()
            if(oldPas.length > 0 && newPas.length >= 6 && confirmPas.length >= 6){
                if(newPas == confirmPas){
                    this.setState({isloaded: true})
                    let body = {
                        oldPassword: oldPas,
                        password: newPas
                    }
                    var changePassword = await requestChangePassword(body, Constant.changePassword)
                    //response
                    if(String(changePassword).length > 200){
                        AsyncStorage.setItem('tokenLogin', changePassword)
                        showSnackBar('Password changed')
                        this.props.navigation.goBack()
                    }else{
                        if(changePassword.message != null && changePassword.message != undefined){
                            showSnackBar(changePassword.message)
                        }else{
                            showSnackBar(changePassword)
                        }
                    }

                    this.setState({isloaded: false})
                }else{
                    showSnackBar(strings.confirmation_password_not_matched)
                }
            }else{
                showSnackBar(strings.password_length_check)
            }
        
        })()
    }

    render(){
        return(
            <>
                <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styleChange.parent}>
                            {this.state.isloaded && <CustomProgressBar isVisible={this.state.isloaded}/>}   
                            <TextTitle fontSize={ukuran.dp_18} align={'center'} tipe={'bold'} text={strings.change_password}
                                maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} />
                            <InputText placeholder={'Old Password'} onKetik={this.onChangeText('oldPassword')} isPassword={true} data={this.state.oldPassword} />
                            <InputText placeholder={'New Password'} onKetik={this.onChangeText('newPassword')} isPassword={true} data={this.state.newPassword} />  
                            <InputText placeholder={'Re-enter new password'} onKetik={this.onChangeText('confirmPassword')} isPassword={true} data={this.state.confirmPassword} />
                            <CustomButton
                                width={'match'}
                                onpressed={e => this.changeProcess()}
                                backgroundColor={color.defaultColor}
                                text={strings.continue} />     
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
    
}

const styleChange = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

})
