'use strict'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Row, Table } from 'react-native-table-component'
import { useEffect, useState } from 'react'
import { capitalize, convertPrice, dateFormat, showSnackBar } from '../../../../functions/helper'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import strings from '../../../../material/strings'
import { requestCancelOrder, requestDataInvoice } from '../../../../services/invoice_process'
import { loadInvoiceProduct } from '../../../../services/load_list/load_invoice_product'
import CustomButton from '../../../button/default_button'
import { CartDataCheckout } from '../../../items/cart_data'
import { ConfirmationDialog, CustomProgressBar } from '../../../items/progress_bar'
import TextTitle from '../../../items/title_text'
import UnderlineLayoutGrey from '../../../items/underline_layout_grey'
import { loadDataBank } from '../../../../services/payment_process'

const InvoiceLayout = (props) => {

    const [isLoaded, setLoaded] = useState(true)
    const [subTotal, setSubTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [cashback, setCashBack] = useState(0)
    const [isBankTransfer, setIsBankTransfer] = useState(false)
    const [statusPayment, setStatusPayment] = useState('')
    const [pricingTotal, setPricingTotal] = useState(0)
    const [createDate, setCreateDate] = useState('')
    const [productData, setProductData] = useState([])
    const [paymentArea, setPaymentArea] = useState(false)
    const [bankData, setBankData] = useState([])
    const [dataPaymentDate, setDatePayment] = useState('')
    const [amountPayment, setAmountPayment] = useState('')
    const [typePayment, setTypePayment] = useState('')
    const [isCancel, setIsCancel] = useState(false)
    const [cancelDialog, setCancelDialog] = useState(false)
    const [actionArea, setActionArea] = useState(false)
 
    //shipment area
    const [buyerName, setBuyerName] = useState('')
    const [buyerPhone, setBuyerPhone] = useState('')
    const [buyerAddress, setBuyerAddress] = useState('') //detailnya

    const subTotalData = [setTableText('Sub-Total', 'normal', 'right'), setTableText(""), setTableText(convertPrice(subTotal), 'normal', 'right')]
    const shippingFeeData = [setTableText('Shipping Fee', 'normal', 'right'), setTableText(''), setTableText(convertPrice(shippingFee), 'normal', 'right')]
    const discountData = [setTableText('Discount', 'normal', 'right'), setTableText(''), setTableText(`- ${convertPrice(discount)}`, 'normal', 'right')]
    const cashBackData = [setTableText('Cashback', 'normal', 'right'), setTableText(''), setTableText(`+${cashback} points`, 'normal', 'right')]
    const totalData = [setTableText('Total', 'bold', 'right'), setTableText(''), setTableText(convertPrice(pricingTotal), 'bold', 'right')]


    const paymentDate = [setTableText('Payment Date', 'left'), setTableText(''), setTableText(dataPaymentDate)]
    const paymentType = [setTableText('Payment Type', 'left'), setTableText(''), setTableText(typePayment)]
    const paymentAmount = [setTableText('Payment Amount', 'left'), setTableText(''), setTableText(convertPrice(amountPayment))]


    function setTableText(text, tipe, align) {
        return <TextTitle warna={color.black} tipe={tipe} text={text} transform={'none'} align={align} />
    }

    useEffect(() => {
        if (isLoaded) {
            getDataInvoice()
        }
    }, [isLoaded])

    const getDataInvoice = async () => {
        var dataInvoice = await requestDataInvoice(props.route.params.orderid) //response dalam bentuk array
        fetchData(dataInvoice)
        setLoaded(false)
    }

    const cancelProcess = async () =>{
        var cancelResponse = await requestCancelOrder(props.route.params.orderid)
        if(cancelResponse == 'OK'){
            setIsCancel(false)
            showSnackBar('Order canceled')
            props.navigation.goBack()
        }else{
            showSnackBar(strings.something_wrong)
        }
        
    }

    const fetchData = async (data) => {
        var priceData = data.ord
        var dataProduct = data.orp
        var dataShip = data.shp

        if(priceData.statusid == 1){
            setActionArea(false)
        }else{
            setActionArea(true)
        }

        if (data.pay != undefined && data.pay != null) {
            var payData = data.pay
            var paymentMethod = (payData.payment_method == 'm_tf') ? 'Transfer Bank' : payData.payment_method
            setIsBankTransfer((payData.payment_method == 'm_tf') ? true : false)
            if(payData.payment_method == 'm_tf'){
                var dataBank = await loadDataBank()
                setBankData({
                    norek: dataBank.rek,
                    an: dataBank.name,
                    bank: dataBank.bank
                })
            }
            setPaymentArea(true)
            if (payData.payment_date != null && payData.payment_amount != null) {
                setDatePayment(dateFormat(payData.payment_date, 'DD MMMM YYYY HH:mm:ss A'))
                setAmountPayment(payData.payment_amount)
            } else {
                setDatePayment(strings.payment_not_confirmed)
                setAmountPayment(0)
            }
            setTypePayment(`${capitalize(paymentMethod)} (${capitalize(payData.payment_type)})`)
        }
        setBuyerName(`${dataShip.first_name} ${dataShip.last_name}`)
        setBuyerPhone(`${dataShip.tel}`)
        setBuyerAddress(`${dataShip.address}, ${dataShip.district}, ${dataShip.city}, ${dataShip.province}, ${dataShip.country} (${dataShip.zip})`)
        setProductData(loadInvoiceProduct(dataProduct))
        setSubTotal(priceData.subtotal)
        setShippingFee(priceData.tax)
        setStatusPayment(priceData.status)
        setDiscount(priceData.discount)
        setCashBack(priceData.cashback)
        setCreateDate(dateFormat(priceData.create_date, 'DD MMMM YYYY HH:mm:ss A'))
        setPricingTotal(priceData.total)
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isLoaded && <CustomProgressBar isVisible={isLoaded}/>}
                    {isCancel && <CustomProgressBar isVisible={isCancel}/>}
                    {cancelDialog && (<ConfirmationDialog isVisible={cancelDialog}
                        message={strings.cancel_message}
                        onClick={() => {
                            setCancelDialog(false)
                            setIsCancel(true)
                            cancelProcess()
                        }}
                        onDismiss={() => {
                            setCancelDialog(false)
                        }} />)}

                    <View style={styleInvoice.parent}>
                        <TextTitle fontSize={ukuran.dp_22} align={'center'} tipe={'normal'} text={`INVOICE`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_10} />
                        <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'normal'} text={`ORDER: #${props.route.params.orderid}`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_20} />
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'normal'} text={createDate}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_10} />
                        <UnderlineLayoutGrey />
                        <View style={{ marginBottom: ukuran.dp_10 }} />
                        {productData}
                        <UnderlineLayoutGrey />
                        <TextTitle fontSize={ukuran.dp_12} align={'right'} tipe={'bold'} text={`${productData.length} Product`}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_10} top={ukuran.dp_10} />
                        <UnderlineLayoutGrey />
                        <TextTitle fontSize={ukuran.dp_12} align={'left'} tipe={'normal'} text={capitalize(statusPayment)}
                            maxLine={1} warna={color.redNirvana} bottom={ukuran.dp_10} top={ukuran.dp_10} />
                        <UnderlineLayoutGrey />
                        <View style={styleInvoice.secondPoint}>
                            <Table>
                                <Row data={subTotalData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={shippingFeeData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={discountData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={cashBackData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                                <Row data={totalData} widthArr={[110, 20, 130]} style={{ marginBottom: ukuran.dp_16 }} />
                            </Table>
                        </View>
                        {paymentArea &&
                            <View style={styleInvoice.thirdPoint}>
                                <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={strings.payment} bottom={ukuran.dp_14} />
                                <Table>
                                    <Row data={paymentDate} widthArr={[130, 20, 190]} style={{ marginBottom: ukuran.dp_16 }} />
                                    <Row data={paymentType} widthArr={[130, 20, 190]} style={{ marginBottom: ukuran.dp_16 }} />
                                    <Row data={paymentAmount} widthArr={[130, 20, 190]} style={{ marginBottom: ukuran.dp_16 }} />
                                </Table>
                            </View>}
                        <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={strings.shipping_address}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_10} top={ukuran.dp_10} />
                        <UnderlineLayoutGrey />
                        <View style={styleInvoice.alamatData}>
                            <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={buyerName}
                                top={ukuran.dp_8} maxLine={1} warna={color.defaultColor} />
                            <TextTitle fontSize={ukuran.dp_14} align={'left'} text={buyerPhone}
                                top={ukuran.dp_8} maxLine={1} warna={color.defaultColor} />
                            <TextTitle fontSize={ukuran.dp_14} align={'left'} text={buyerAddress}
                                top={ukuran.dp_8} maxLine={2} warna={color.defaultColor} />
                        </View>
                        <UnderlineLayoutGrey />
                        {isBankTransfer && 
                        <View style={styleInvoice.bankInfoData}>
                            <TextTitle fontSize={ukuran.dp_16} align={'center'} tipe={'bold'} text={typePayment}
                                top={ukuran.dp_8} maxLine={1} warna={color.defaultColor} />
                            <TextTitle fontSize={ukuran.dp_12} align={'center'} text={`Rek ${bankData.bank} a/n ${bankData.an}`}
                                top={ukuran.dp_8} maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_6}/>
                            <Text selectable={true} style={{textAlign: 'center'}} selectionColor={color.white_100}>
                                <TextTitle fontSize={ukuran.dp_18} align={'center'} tipe={'bold'} text={bankData.norek}
                                    top={ukuran.dp_8} maxLine={2} warna={color.redNirvana} />
                            </Text>    
                            <TextTitle fontSize={ukuran.dp_12} align={'center'} text={strings.bank_confirmation_message}
                                top={ukuran.dp_8} maxLine={99} warna={color.defaultColor}  bottom={ukuran.dp_20}/>    
                        </View>
                        }
                        {!actionArea &&
                            <View>
                                <CustomButton
                                    width={'match'}
                                    onpressed={e => props.navigation.navigate('Payment', { idOrder: props.route.params.orderid })}
                                    backgroundColor={color.defaultColor}
                                    text={'Pay Now'} />
                                <CustomButton
                                    width={'match'}
                                    onpressed={e => setCancelDialog(true)}
                                    backgroundColor={color.white}
                                    text={'Cancel'} />
                            </View>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styleInvoice = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

    alamatData: {
        marginBottom: ukuran.dp_16
    },

    thirdPoint: {

        marginTop: ukuran.dp_16,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },

    secondPoint: {
        marginTop: ukuran.dp_16,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
})

export default InvoiceLayout