import React, { Component } from 'react'
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import color from "../../material/color";
import ukuran from "../../material/dimen";
import strings from '../../material/strings';
import InputText from '../items/text_input';
import TextTitle from "../items/title_text";
import Lock from '../../icons/lock'
import User from '../../icons/user-register'
import Calendar from '../../icons/calendar'
import Location from '../../icons/location'
import ArrowBottom from '../../icons/arrow-bottom'
import StepIndicator from 'react-native-step-indicator'
import CustomButton from '../button/default_button';
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {emailValidation, showSnackBar} from '../../functions/helper'
import {loadDataCountry, loadProvinceData, loadCityData, loadDataPhoneCode} from '../../services/load_list/load_address_detail'
import moment from 'moment';
import CustomCheckBox from '../items/custom_checkbox';
import {TermText} from '../items/term_condition_text'
import { useRef } from 'react';
import Constant from '../../material/constant';
import ConfirmGoogleChaptcha from 'react-native-google-recaptcha-v2'
import {authAccountProccess, getTokenData} from '../../services/account_process'
import {OneMessageProgress, CustomProgressBar, ViewCustomDialog} from '../items/progress_bar';
import VerifMethodDialog from '../items/register_verif_dialog';

const label = ["", "", ""]
const stepStyle = {
    stepIndicatorSize: 50,
    currentStepIndicatorSize: 50,
    stepStrokeCurrentColor: color.defaultColor,
    separatorUnFinishedColor: color.white_300,
    separatorFinishedColor: color.defaultColor,
    stepIndicatorCurrentColor: color.defaultColor,
    stepIndicatorFinishedColor: color.defaultColor,
    stepIndicatorUnFinishedColor: color.white_300
}
const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
]
const placeholderArea = [
    { label: 'Gender', value: null },
    { label: 'Country', value: null},
    { label: 'Province', value: null},
    { label: 'City', value: null},

    {label: '+62', value: '62'},
]
const countryJson = require('../../local_file/country_data.json')
export default class RegisterLayout extends Component {
    constructor() {
        super()
        this.state = {
            firstLayout: true    ,
            secondView: false,
            thirdView: false,
            stepPosition: 0,
            stepStatus: strings.account,
            dateShow: false,
            dateMode: 'date',
            selectedDate: 'DD/MM/YYYY',
            full_name: '',
            phone: '',
            gender: '',
            email: '',
            calling_code: '62',
            sentMethod: '',
            password: '',
            confirmation_password: '',
            country: '',
            province: '',
            isMethodDialog: false,
            city: '',
            process: false,
            processFinish: false,
            isVerify: false,
            gToken: '',
            tipeVerif: '',
            provinceData: [],
            cityData: [],
            termSetuju: false,
            fullAddress:''
        }
        this.FirstView = this.FirstView.bind(this)
        this.SecondView = this.SecondView.bind(this)
        this.ThirdView = this.ThirdView.bind(this)
        this.AddressPicker = this.AddressPicker.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.checkValue = this.checkValue.bind(this)
        this.registerProcess = this.registerProcess.bind(this)
    }

    FirstView() {
        return (
            <>
                    <InputText placeholder={strings.enterEmail} onKetik={this.onChangeText('email')} data={this.state.email} />
                    <InputText placeholder={strings.password} isPassword={true} onKetik={this.onChangeText('password')} data={this.state.password} />
                    <InputText placeholder={strings.confirmPassword} isPassword={true} onKetik={this.onChangeText('confirmation_password')} data={this.state.confirmation_password} />
              
            </>
        )
    }

    SecondView(){
        var arrayPhone = loadDataPhoneCode()
        return (
            <>
                <InputText placeholder={strings.fullname} onKetik={this.onChangeText('full_name')} data={this.state.full_name}/>
                <View style={styleData.horizontalView}>
                    <View style={{width: '30%', marginEnd: ukuran.dp_14}}>
                    <View style={styleData.dateStyle}>
                        <View style={{ 
                            width: '100%'}}>
                        <RNPickerSelect
                            style={{ 
                                inputIOSContainer: {
                                    marginStart: ukuran.dp_12,
                                    fontSize: ukuran.dp_14
                                },
                                placeholder:{
                                    color: color.defaultColor
                                },
                                inputAndroidContainer:{
                                    marginStart: ukuran.dp_12,
                                    fontSize: ukuran.dp_14,
                                    
                                },
                                inputAndroid: {
                                    color: color.defaultColor
                                }
                            }}
                            onValueChange={(value) => {
                                this.setState({calling_code: value})
                            }}
                            items={arrayPhone}
                            placeholder={placeholderArea[4]} />
                        </View>
                        <View style={{
                            padding: Platform.OS == 'ios' ? ukuran.dp_22 : 28,
                            marginLeft: 'auto'
                        }}>
                            <ArrowBottom fill={Platform.OS == 'ios' ? color.defaultColor : color.white} />
                        </View>
                    </View>
                    </View>
                    <View style={{flex: 1}}>
                        <InputText placeholder={strings.phone} onKetik={this.onChangeText('phone')} data={this.state.phone} textInput={'number-pad'}/>
                    </View>
                </View>
                <View style={styleData.dateStyle}>
                    <View style={{ marginStart: ukuran.dp_24 }} />
                    <TextTitle fontSize={ukuran.dp_18} warna={color.defaultColor} text={this.state.selectedDate} />
                    <TouchableOpacity style={styleData.iconDate}
                        onPress={e =>this.showDatePicker()}>
                        <Calendar />
                    </TouchableOpacity>
                </View>
                <View style={styleData.dateStyle}>
                    <View style={{ 
                        marginStart: ukuran.dp_24,
                        width: '90%'}}>
                    <RNPickerSelect
                        style={{ 
                            placeholder: {
                                fontSize: ukuran.dp_18,
                                color: color.defaultColor,
                            },    
                            inputAndroidContainer:{
                                marginStart: ukuran.dp_12,
                                fontSize: ukuran.dp_14,
                                
                            },
                            inputAndroid: {
                                color: color.defaultColor
                            }
                        }}
                        onValueChange={(value) => {
                            this.setState({gender: value})}}
                        items={genderData}
                        placeholder={placeholderArea[0]} />
                    </View>
                    <View style={{
                        padding: ukuran.dp_18,
                        marginLeft: 'auto'
                    }}>
                        <ArrowBottom  fill={Platform.OS == 'ios' ? color.defaultColor : color.white}  />
                    </View>
                </View>
            </>
        )
    }

    ThirdView(){
        var arrayCountry = loadDataCountry()
        const rechaptcha = useRef()
        return(
            <>
                <this.AddressPicker item={arrayCountry} placeholder={placeholderArea[1]}  variable={'country'}/>
                {((String(this.state.country).length > 0 && String(this.state.country) != 'null') ?
                     <this.AddressPicker item={this.state.provinceData} placeholder={placeholderArea[2]}  variable={'province'}/> : console.log(this.state.country))}
                {((String(this.state.province).length > 0 && String(this.state.province) != 'null'
                    && String(this.state.country).length > 0 && String(this.state.country) != 'null') ?
                     <this.AddressPicker item={this.state.cityData} placeholder={placeholderArea[3]}  variable={'city'}/> : console.log(this.state.province))}
                    <InputText placeholder={strings.address} onKetik={this.onChangeText('fullAddress')} data={this.state.fullAddress} />
                <View style={{marginBottom: ukuran.dp_20, flexDirection: 'row', marginEnd: ukuran.dp_20}}>
                    <CustomCheckBox onCheck={(value) => this.setState({termSetuju: value}, 
                        rechaptcha.current.show())}/>
                    <TermText/>
                    <ConfirmGoogleChaptcha
                        ref={rechaptcha}
                        siteKey={Constant.captchaSiteKey}
                        baseUrl={Constant.origin}
                        languagecode='en'
                        onMessage={this.onVerify(rechaptcha)}/>
                </View>
            </>
        )
    }

    onVerify = (rechaptcha) =>{
        return (token) =>(
            this.checkToken(token, rechaptcha)
        )
    }

    checkToken = (token, rechaptcha) =>{
        if(token && token.nativeEvent.data){
            if(['cancel', 'error', 'expired'].includes(token.nativeEvent.data)){
                rechaptcha.current.hide()
                return
            }else{
                var googleToken = token.nativeEvent.data
                this.setState({gToken: googleToken, isVerify: true})
                rechaptcha.current.hide()
            }
        }
    }

    AddressPicker = (props) => {
        return(
            <View style={styleData.dateStyle}>
                    <View style={{ 
                        marginStart: ukuran.dp_24,
                        width: '90%'}}>
                    <RNPickerSelect
                        style={{ 
                            placeholder: {
                                fontSize: ukuran.dp_18
                            },
                            inputAndroidContainer:{
                                marginStart: ukuran.dp_12,
                                fontSize: ukuran.dp_14,
  
                            },
                            inputAndroid: {
                                color: color.defaultColor
                            }    
                        }}
                        onValueChange={(value) => this.addressDataSelect(value, props.variable)}
                        items={props.item}
                        placeholder={props.placeholder} />
                    </View>
                    <View style={{
                        padding: ukuran.dp_18,
                        marginLeft: 'auto'
                    }}>
                        <ArrowBottom  fill={Platform.OS == 'ios' ? color.defaultColor : color.white} />
                    </View>
                </View>
        )
    }

    addressDataSelect(value, variable){
        if(variable == 'country'){
            (async ()=> {
                var dataProvince = await loadProvinceData(value)
                this.setState({country: value, city: '', province: '', provinceData: dataProvince})
                
            })()
        }else if(variable == 'province'){
            (async ()=> {
                var dataCity = await loadCityData(value)
                this.setState({province: value, city: '', cityData: dataCity})
            })()
        }else if(variable == 'city'){
            this.setState({city: value})
        }
    }



    stepIcon(position, stepStatus) {
        var positions = position.position
        if (positions == 0) {
            return <Lock />
        } else if (positions == 1) {
            return <User />
        } else if (positions == 2) {
            return <Location fill={color.white} />
        }
    }
    //CHANGE ALL TEXT MESSAGE TO ENGLISH
    checkValue(position){
    //     (async ()=> {
    //         console.log(await getTokenData())
    //     })()
        if (position == 1) {
            var emailUser = this.state.email
            var passwordUser = String(this.state.password)
            var confirmationPassword = String(this.state.confirmation_password)
            if(emailValidation(emailUser)){
                if(passwordUser.length >= 6 && confirmationPassword.length >= 6){
                    if(passwordUser == confirmationPassword){
                        this.updateStepPosition(position)
                    }else{
                        showSnackBar(strings.confirmation_password_not_matched)
                    }
                }else{
                    showSnackBar(strings.password_length_check)
                }
            }else{
                showSnackBar(strings.email_not_valid)
            }
        } else if (position == 2) {
            var fullName = String(this.state.full_name)
            var phoneNumber = String(this.state.phone)
            var gender = String(this.state.gender)
            var tanggalLahir = String(this.state.selectedDate)

            if(fullName.length > 0 && phoneNumber.length > 0){
                if(gender != 'null' && gender.length > 1){
                    if(tanggalLahir != 'DD/MM/YYYY'){
                        this.updateStepPosition(position)
                    }else{
                        showSnackBar(strings.select_birthdate)
                    }
                }else{
                    showSnackBar(strings.select_gender)
                }
            }else{
                showSnackBar(strings.empty_detect)
            }

        } else if (position == 3){
            var dataNegara = String(this.state.country)
            var dataProvinsi = String(this.state.province)
            var dataCity = String(this.state.city)
            var addressDetail = String(this.state.fullAddress)

                if(dataNegara != 'null' && dataNegara.length > 1){
                    if(dataProvinsi != 'null' && dataProvinsi.length > 1){
                        if(dataCity != 'null' && dataCity.length > 1){
                            if(addressDetail.length > 0){
                                if(this.state.termSetuju){
                                    if(this.state.isVerify){
                                        this.setState({isMethodDialog: true})
                                    }else{
                                        showSnackBar('Captcha tidak valid')
                                    }
                                }else{
                                    showSnackBar(strings.syarat_ketentuan_required)
                                }
                            }else{
                                showSnackBar(strings.empty_detect)

                            }
                        }else{
                            showSnackBar(strings.city_detect)
                        }
                    }else{
                        showSnackBar(strings.province_detect)
                    }
                }else{
                    showSnackBar(strings.country_detect)
                }
        }
    }

    updateStepPosition(postion) {
        if (postion == 1) {
            this.setState(
                { stepPosition: 1,
                  stepStatus: "User Information", 
                  firstLayout: false, 
                  secondView: true,
                  thirdView: false,
                  gender: ''
                })
        } else if (postion == 2) {
            this.setState({ stepPosition: 2, 
                stepStatus: "Address", 
                firstLayout: false, 
                secondView: false,
                thirdView: true,
                province: '',
                country: '',
                city: ''
            })
        } else if (postion == 0) {
            this.setState({ stepPosition: 0, 
                stepStatus: "Account", 
                firstLayout: true, 
                secondView: false,
                thirdView: false,
            })
        }
    }

    onChangeText(variable){
        return(text) =>{
            this.setState({ [variable]: text})
        }
        
    }

    afterFinishReg(){
        this.setState({processFinish: false})
        this.props.navigation.goBack()
    }

    onChange = (selectedDates) =>{
        var selected = moment(selectedDates).format('YYYY-MM-DD')
        this.setState({dateShow: false, selectedDate: selected},
            this.updateStepPosition(this.state.stepPosition)) 
    }
    showDatePicker = () =>{
        this.setState({dateShow: true})
    }

    registerProcess = async (method) => {
            this.setState({process: true, isMethodDialog: false})
            const registerBody = JSON.stringify({
                "full_name": String(this.state.full_name),
                "email":  String(this.state.email),
                "gender": String(this.state.gender),
                "phone": String(this.state.phone),
                "birthdate": String(this.state.selectedDate),
                "city": String(this.state.city),
                'sendTo': String(method),
                "calling_code": String(this.state.calling_code),
                "password": String(this.state.password),
                "gToken" : String(this.state.gToken)
            })
            var registerResponse = await authAccountProccess(registerBody, Constant.registerProcessv2)
            // if(registerResponse .length!= "OK"){
            //     var errCode = registerResponse.errno
            //     if(errCode == 1062){
            //         showSnackBar(strings.email_exist)
            //     }else{
            //         showSnackBar(registerResponse.message)
            //     }
            // }else{
            //     this.setState({processFinish: true})
            // }
            if(String(registerResponse).length > 200){
                    this.props.navigation.navigate('OtpVerif', {jwtToken: registerResponse})
            }else{
                if(registerResponse.message != null && registerResponse.message != undefined){
                    var errMessage = registerResponse.message
                    console.log("Error Login" + errMessage)
                    showSnackBar(errMessage)
                }else{
                    showSnackBar(strings.something_wrong)
                }
            }
            this.setState({process: false})
        
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleData.parent}>
                        <TextTitle fontSize={ukuran.dp_24} tipe={'bold'} align={'center'} text={String(strings.signup.toUpperCase())} bottom={ukuran.dp_24} top={120} />
                        <StepIndicator customStyles={stepStyle} labels={label} stepCount={3} currentPosition={this.state.stepPosition} renderStepIndicator={position => this.stepIcon(position)} />
                        <TextTitle fontSize={ukuran.dp_18} tipe={'bold'} align={'center'} text={this.state.stepStatus} bottom={ukuran.dp_24} />
                        {(this.state.firstLayout ? <this.FirstView/> : null)}
                        {(this.state.secondView ? <this.SecondView/> : null)}
                        {(this.state.thirdView ? <this.ThirdView/> : null)}
                        {this.state.processFinish && (<OneMessageProgress isVisible={this.state.processFinish} message={strings.email_must_confirm} onClick={()=>this.afterFinishReg()}/>)}
                        {this.state.process && (<CustomProgressBar isVisible={this.state.process}/>)}
                    {this.state.dateShow && (<DateTimePicker
                            isVisible={this.state.dateShow}
                            mode="date"
                            onConfirm={this.onChange}
                            onCancel={this.onChange}/>)}
                        <CustomButton
                            width={'match'}
                            onpressed={e => this.checkValue(this.state.stepPosition + 1)}
                            backgroundColor={color.defaultColor}
                            text={strings.continue} />
                        {(!this.state.firstLayout && (<CustomButton
                            width={'match'}
                            onpressed={e => this.updateStepPosition(this.state.stepPosition - 1)}
                            backgroundColor={color.white}
                            text={strings.back} />))}
                        {this.state.isMethodDialog && <ViewCustomDialog onDismiss={() => this.setState({isMethodDialog: false})} isVisible={this.state.isMethodDialog} view={<VerifMethodDialog email={this.state.email} phone={`+${this.state.calling_code}${this.state.phone}`} onMethodWhatsApp={e => this.registerProcess('phone')} onMethodEmail={e =>{
                            this.registerProcess('email')
                        }}/>}/>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styleData = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        width: ukuran.wpPercent90,
        alignSelf: 'center',
    },

    horizontalView:{
        flexDirection: 'row',
        flex: 1
    },

    dateStyle: {
        backgroundColor: color.white,
        borderColor: color.defaultColor,
        borderRadius: ukuran.dp_10,
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: ukuran.dp_16,
        flexDirection: 'row',
    },

    iconDate: {
        padding: ukuran.dp_16,
        marginLeft: 'auto',
        borderTopEndRadius: ukuran.dp_10,
        borderBottomEndRadius: ukuran.dp_10,
        backgroundColor: color.defaultColor,
        borderWidth: 0,

    }

})