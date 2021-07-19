'use strict'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Row, Table } from 'react-native-table-component'
import { useEffect, useState } from 'react'
import { convertPrice, dateFormat, showSnackBar } from '../../../functions/helper'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../../items/title_text'
import UnderlineLayout from '../../items/underline_layout'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group'
import strings from '../../../material/strings'
import CustomButton from '../../button/default_button'
import { ConfirmationDialog, CustomProgressBar, OneMessageProgress } from '../../items/progress_bar'
import { checkResponseMidtrans, loadDataBank, loadDataPayment, requestBankTransfer, requestMidtrandsPayment, requestWebhook } from '../../../services/payment_process'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'


const radioProps = [
    {
        label: 'Direct Payment (Auto Confirmation)',
        value: 0
    },
    {
        label: 'Bank Transfer (Manual Confirmation)',
        value: 1
    }
]

const methodPaymentData = [{
    id: 0,
    label: 'Direct Payment (Auto Confirmation)',
    value: 'Direct Payment',
    selected: true,
    size: 18,
},
{
    id: 1,
    label: 'Bank Transfer (Manual Confirmation)',
    value: 'Manual Transfer',
    selected: false,
    size: 18
}]
const PaymentLayout = (props) => {
    const [isLoaded, setLoaded] = useState(true)
    const [isProgress, setProgress] = useState(false)
    const [isBankSuccess, setIsBankSuccess] = useState(false)
    const [bankPaymentMessage, setBankMessage] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cashback, setCashBack] = useState(0)
    const [pricingTotal, setPricingTotal] = useState(0)
    const [radioButtons, setRadioButtons] = useState(radioProps)
    const [selectedRadio, setSelectedRadio] = useState(-1)
    const [idOrder, setIdOrder] = useState(0)
    const [dataBank, setDataBank] = useState([])
    const [confirmDialog, setStatusConfirmation] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState(strings.infoBankTransfer)
    const [dateOrder, setDateOrder] = useState('')
    const [isDialog, setDialogStatus] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('')
    const [isPayed, setPayed] = useState(false)
    const [midtransCek, setMidtransCek] = useState(false)
    const [snapToken, setSnapToken] = useState('')

    const subTotalData = [setTableText('Sub-Total'), setTableText(""), setTableText(convertPrice(subTotal))]
    const shippingFeeData = [setTableText('Shipping Fee'), setTableText(''), setTableText(convertPrice(shippingFee))]
    const discountData = [setTableText('Discount'), setTableText(''), setTableText(`- ${convertPrice(discount)}`)]
    const cashBackData = [setTableText('Cashback'), setTableText(''), setTableText(`+${cashback} points`)]
    const totalData = [setTableText('Total', 'bold'), setTableText(''), setTableText(convertPrice(pricingTotal), 'bold')]

    function setTableText(text, tipe) {
        return <TextTitle warna={color.black} tipe={tipe} text={text} transform={'none'} align={'right'} />
    }

    function onPressRadioButton(radioButtonsArray) {
        // setRadioButtons(radioButtonsArray);
        // for (let i = 0; i < radioButtonsArray.length; i++) {
        //     if (radioButtonsArray[i].selected == true) {
        //         setSelectedRadio(radioButtonsArray[i].id)
        //     }
        // }
        console.log(radioButtonsArray)
        setSelectedRadio(radioButtonsArray)
    }

    const processPayment = async () => {
        if (selectedRadio != -1) {
            let paymentBody = {
                orderid: idOrder
            }
            if (selectedRadio == 0) {
                //direct transfer
                setProgress(true)
                var dataCreateMidtrans = await requestMidtrandsPayment(paymentBody)
                props.navigation.navigate('MidtransPage', { urlWeb: dataCreateMidtrans.redirect_url })
                setMidtransCek(true)
                setProgress(false)
            } else {
                setStatusConfirmation(true)
            }
        } else {
            showSnackBar(strings.select_payment_method_message)
        }
    }

    const processBankPayment = async () =>{
        setProgress(true)
        let paymentBody = {
            orderid: idOrder
        }
        var responseBankTransfer = await requestBankTransfer(paymentBody)
        setProgress(false)
        if(responseBankTransfer == "OK"){
            setIsBankSuccess(true)
            setBankMessage(
                <TextTitle fontSize={ukuran.dp_16} align={'center'} tipe={'normal'} text={`Silahkan transfer ke bank dibawah\n${dataBank.rek} a/n ${dataBank.name} (${dataBank.bank})`}
                maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20} />)

        }else{
            console.log(responseBankTransfer)
            showSnackBar(strings.something_wrong)
        }
    }

    const fetchResponseDataPayment = (response) => {
        setCashBack(response.cashback)
        setSubTotal(response.subtotal)
        setShippingFee(response.tax)
        setDiscount(response.discount)
        setPricingTotal(response.total)
        setDateOrder(dateFormat(response.create_date, 'DD MMMM YYYY HH:mm:ss A'))
    }

    const loadPaymentData = async () => {
        var orderId = props.route.params.idOrder
        
        var responsePayment = await loadDataPayment(orderId)
        var responseDataBank = await loadDataBank()
        if(midtransCek){
            redirectSuccess()
        }
        if(responsePayment.payment_method != null && responsePayment.payment_method == 'midtrans'){
            setSnapToken(responsePayment.snap_token)
            setPayed(true)
        }
        //console.log(responsePayment.ord.status)
        setDataBank(responseDataBank)
        fetchResponseDataPayment(responsePayment)
        setIdOrder(props.route.params.idOrder)
        setLoaded(false)
    }

    const midtransCheck = async () => {
        var midtransResponse = await checkResponseMidtrans(props.route.params.idOrder)

        var statusCode = midtransResponse.status_code
        if(statusCode != '404'){
            if(statusCode != '200' || statusCode != '201'){
                setDialogStatus(true)
                setDialogMessage(strings.transactionMessageEmail)
            }else{
                var sendWebHook = await requestWebhook(midtransResponse)
                redirectSuccess()
            }
        }
    }

    const redirectSuccess = () =>{
        setDialogStatus(false)
        setIsBankSuccess(false)
        showSnackBar(strings.transactionSuccess)
        props.navigation.reset({
            index: 0,
            routes: [{name: 'Rumah'}]
        })
    }

    useEffect(() => {

        props.navigation.addListener(
            //jika user focus ke halaman
            'focus',
            () =>{
                props.navigation.setOptions({headerShown:true})
                setLoaded(true)
            }
        )

        if (isLoaded) {
            loadPaymentData()
            if(midtransCek){
                midtransCheck()
            }
        }
    }, [isLoaded])

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {confirmDialog && (<ConfirmationDialog isVisible={confirmDialog}
                        message={confirmMessage}
                        onClick={() => {
                            setStatusConfirmation(false)
                            processBankPayment()
                        }}
                        onDismiss={() => {
                            setStatusConfirmation(false)
                        }} />)}
                    {isLoaded && (<CustomProgressBar isVisible={isLoaded} />)}
                    {isDialog && (<OneMessageProgress isVisible={isDialog} message={dialogMessage} onClick={()=>redirectSuccess()} />)}
                    {isBankSuccess && (<OneMessageProgress isVisible={isBankSuccess} message={bankPaymentMessage} onClick={()=>redirectSuccess()} />)}
                    {isProgress && (<CustomProgressBar isVisible={isProgress} />)}
                    <View style={stylePayment.parent}>
                        <TextTitle fontSize={ukuran.dp_22} align={'center'} tipe={'normal'} text={String(strings.payment).toUpperCase()}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20} />
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={`ORDER: #${idOrder}`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20} />
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={dateOrder}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_10} />
                        <UnderlineLayout />
                        <View style={stylePayment.secondPoint}>
                            <Table>
                                <Row data={subTotalData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={shippingFeeData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={discountData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={cashBackData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={totalData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                            </Table>
                        </View>
                        <UnderlineLayout />
                        
                        {!isPayed ? <View>
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={`Payment Options`}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_20} bottom={ukuran.dp_16} />
                            {/* <RadioGroup
                            
                            onPress={onPressRadioButton}
                            radioButtons={radioButtons} /> */}
                            <RadioForm
                                initial={-1}
                                animation={false}
                                onPress={onPressRadioButton}
                                buttonColor={color.defaultColor}>
                                {
                                    radioButtons.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={selectedRadio === i}
                                        onPress={onPressRadioButton}
                                        borderWidth={1}
                                        buttonInnerColor={color.defaultColor}
                                        buttonOuterColor={selectedRadio === i ? color.defaultColor : color.defaultColor}
                                        buttonSize={14}
                                        buttonOuterSize={20}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{marginLeft: 10}}
                                        />
                                        <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={onPressRadioButton}
                                        labelStyle={{fontSize: ukuran.dp_14, color: color.defaultColor}}
                                        labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                    ))
                                } 
                                </RadioForm>
                            <View style={{ marginTop: ukuran.dp_24 }} />
                            <CustomButton
                                width={'match'}
                                onpressed={e => processPayment()}
                                backgroundColor={color.defaultColor}
                                text={strings.continue} />
                            <CustomButton
                                width={'match'}
                                onpressed={e => {
                                    props.navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Rumah'}]
                                    })
                                }}
                                backgroundColor={color.white}
                                text={'Back to home'} />   
                        </View> : null}
                        <View style={{ marginTop: ukuran.dp_24 }} />
                        {isPayed &&<CustomButton
                            width={'match'}
                            onpressed={e => {
                                props.navigation.navigate('MidtransPage', { urlWeb: strings.veriTransSnap + snapToken})
                                setMidtransCek(true)
                            }}
                            backgroundColor={color.defaultColor}
                            text={'Pay Now'} />}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    )
}

const stylePayment = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    radioButtons: {
        backgroundColor: color.white_300,
    },


    secondPoint: {
        marginTop: ukuran.dp_16,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
})

export default PaymentLayout