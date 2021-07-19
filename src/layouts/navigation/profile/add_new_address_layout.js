'use strict'
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import strings from '../../../material/strings'
import { loadCityData, loadDataCountry, loadProvinceData } from '../../../services/load_list/load_address_detail'
import InputText from '../../items/text_input'
import TextTitle from '../../items/title_text'
import ArrowBottom from '../../../icons/arrow-bottom.svg'

import RNPickerSelect from 'react-native-picker-select'
import CustomButton from '../../button/default_button'
import { CustomProgressBar } from '../../items/progress_bar'
import { showSnackBar } from '../../../functions/helper'
import { getTokenData } from '../../../services/account_process'
import {addNewAddressProcess, editAddress, loadDetailAddress} from '../../../services/address_process'

const placeholderArea = [
    { label: 'Gender', value: null },
    { label: 'Country', value: null},
    { label: 'Province', value: null},
    { label: 'City', value: null}
]

var arrayCountry = loadDataCountry()
export default class AddNewAddressLayout extends Component{
    constructor(props){
        super(props)
        this.state = {
            provinceData: [],
            cityData: [],
            province: '',
            city: '',
            firstName: '',
            idShipment: '',
            lastName: '',
            country: '',
            kecamatan: '',
            phone: '',
            note: '',
            process: false,
            zipcode: '',
            fullAddress: ''
        }

        this.AddressPicker = this.AddressPicker.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.AddresAdd = this.AddresAdd.bind(this)
        this.firstLoad = this.firstLoad.bind(this)
        this.actionButton = this.actionButton.bind(this)
        
    }

    componentDidMount(){
        this.firstLoad()
    }



    firstLoad(){
        const params = this.props.route.params
        this.setState({idShipment: params.idShipment})
        if(params.idShipment != '0'){
            (async () =>{
                this.setState({process: true})
                //load data alamat
                var tokenUser = await getTokenData()
                var addressData = await loadDetailAddress(params.idShipment, tokenUser)
                this.setState({
                    process: false,
                    firstName: addressData.first_name,
                    lastName: addressData.last_name,
                    zipcode: addressData.zip,
                    phone: addressData.tel,
                    fullAddress: addressData.address,
                    note: addressData.shipment_note,
                    kecamatan: addressData.district
                })
            })()
        }
    }

    AddressPicker = (props) => {
        return(
            <View style={styleAddress.dateStyle}>
                    <View style={{ 
                        marginStart: ukuran.dp_24,
                        width: '90%'}}>
                    <RNPickerSelect
                        style={{ 
                            placeholder: {
                                fontSize: ukuran.dp_18
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
                        <ArrowBottom fill={Platform.OS == 'ios' ? color.defaultColor : color.white}  />
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

    onChangeText(variable){
        return(text) =>{
            this.setState({ [variable]: text})
        }
        
    }
    AddresAdd(){

        //lakukan pengecekan dulu
        var firstName = String(this.state.firstName).trim()
        var lastName = String(this.state.lastName).trim()
        var zip = String(this.state.zipcode).trim()
        var city = String(this.state.city)
        var country = String(this.state.country)
        var province = String(this.state.province)
        var district = String(this.state.kecamatan).trim()
        var fullAddress = String(this.state.fullAddress).trim()
        var nohp = String(this.state.phone).trim()
        var note = String(this.state.note).trim()

        if(firstName.length > 0 && lastName.length > 0 && zip.length > 0 && district.length > 0
            && fullAddress.length > 0 && nohp.length > 0 && note.length > 0){
                if(country != 'null' && country.length > 1){
                    if(province != 'null' && province.length > 1){
                        if(city != 'null' && city.length > 1){
                            (async ()=> {
                                this.setState({process: true})
                                //pengiriman dan penerimaan response tambah alamat disini nanti
                                const bodyAlamat = JSON.stringify({
                                    'first_name': firstName,
                                    'last_name': lastName,
                                    'zip': zip,
                                    'city': city,
                                    'district': district,
                                    'address': fullAddress,
                                    'tel' : nohp,
                                    'shipment_note' : note
                                })
                                var tokenUser = await getTokenData()
                                if(this.state.idShipment == '0'){
                                    console.log('Add')
                                    var addAddressResponse = await addNewAddressProcess(bodyAlamat, tokenUser)
                                    if(addAddressResponse == "OK"){
                                        showSnackBar(strings.new_address_added)
                                        this.props.navigation.goBack()
                                    }else{
                                        showSnackBar(strings.something_wrong)
                                    }
                                }else{
                                    console.log('Edit')
                                    var editAddressResponse = await editAddress(bodyAlamat, tokenUser, this.state.idShipment)
                                    if(editAddressResponse == "OK"){
                                        showSnackBar(strings.address_edited)
                                        this.props.navigation.goBack()
                                    }else{
                                        showSnackBar(strings.something_wrong)
                                    }
                                }
                                this.setState({process: false})
                            })()
                        }else{
                            showSnackBar(strings.city_detect)
                        }
                    }else{
                        showSnackBar(strings.province_detect)
                    }
                }else{
                    showSnackBar(strings.country_detect)
                }
        }else{
            showSnackBar(strings.empty_detect)
        }

    }

    actionButton(){
        
    }

    render(){
        return(
            <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styleAddress.parent}>
                        {this.state.process && (<CustomProgressBar isVisible={this.state.process}/>)}
                        <TextTitle fontSize={ukuran.dp_18} tipe={'bold'} align={'center'} text={String('Add New Address'.toUpperCase())} bottom={ukuran.dp_24}/>
                        <View style={styleAddress.nameParent}>
                        <InputText placeholder={'First Name'} onKetik={this.onChangeText('firstName')} data={this.state.firstName} />
                        <InputText placeholder={'Last Name'} onKetik={this.onChangeText('lastName')} data={this.state.lastName} />
                        <this.AddressPicker item={arrayCountry} placeholder={placeholderArea[1]}  variable={'country'}/>
                        {((String(this.state.country).length > 0 && String(this.state.country) != 'null') ?
                            <this.AddressPicker item={this.state.provinceData} placeholder={placeholderArea[2]}  variable={'province'}/> : null)}
                        {((String(this.state.province).length > 0 && String(this.state.province) != 'null'
                            && String(this.state.country).length > 0 && String(this.state.country) != 'null') ?
                            <this.AddressPicker item={this.state.cityData} placeholder={placeholderArea[3]}  variable={'city'}/> : null)}
                            <InputText placeholder={strings.zipcode} onKetik={this.onChangeText('zipcode')} data={this.state.zipcode} textInput={'number-pad'}/>
                            <InputText placeholder={strings.kecamatan} onKetik={this.onChangeText('kecamatan')} data={this.state.kecamatan} />
                            <InputText placeholder={strings.address} onKetik={this.onChangeText('fullAddress')} data={this.state.fullAddress} />
                            <InputText placeholder={strings.phone} onKetik={this.onChangeText('phone')} data={this.state.phone}  textInput={'number-pad'}/>
                            <InputText placeholder={strings.note} onKetik={this.onChangeText('note')} data={this.state.note} />
                            <Text
                                style={{marginBottom: ukuran.dp_24, fontFamily: 'montserrat'}}>{strings.addNewAddressMessage}</Text>
                            <CustomButton
                                width={'match'}
                                onpressed={e => this.AddresAdd()}
                                backgroundColor={color.defaultColor}
                                text={strings.continue} />
                            <CustomButton
                                width={'match'}
                                onpressed={e => this.props.navigation.goBack()}
                                backgroundColor={color.white}
                                text={strings.back} />    
                        </View>
                     </View>
                </ScrollView>
            </SafeAreaView>    
            </>
        )
    }


}


const styleAddress = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        marginEnd: ukuran.dp_14,
        marginStart: ukuran.dp_14
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
})
