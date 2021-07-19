import axios from "axios";
import Constant from "../material/constant";
import strings from "../material/strings";
import { getTokenData } from "./account_process";
import { loadListUserAddress } from "./address_process";


export async function loadDefaultAddress(){
    var dataUserAddress = await loadListUserAddress()
    var idDefault = -2 //-1 = data address tidak ada, -2 = belum default
    //cek data ada atau tidak  
    if(dataUserAddress.length > 0){
        for(let i = 0; i < dataUserAddress.length; i++){
            var addressData = dataUserAddress[i]
            if(addressData.customerid != null){
                //id sudah ada yg default
                idDefault = addressData.shippingid
            }
        }
    }else{
        idDefault = -1
    }
    return idDefault
}

export async function requestCheckout(body){
    var token = await getTokenData()
    var response = null
    await axios.post(Constant.urlCheckout, body, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            response = resource.data
        })
        .catch(err => {
            response = err
        })
    return response
}


export async function getCookie(){
    var token = await getTokenData()
    var response = null
    await axios.get(Constant.urlCheckout, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            response = resource
        })
        .catch(err => {
            response = err
        })
    return response
}

export async function checkPricingProcess(body){
    var token = await getTokenData()
    var response = null
    await axios.post(Constant.checkPricingUrl, body, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            response = resource.data
        })
        .catch(err => {
            response = err
        })
    return parsedPricingData(response)
}

function parsedPricingData(response){

    var discountData = null
    var discountType = response.discount
    if(discountType.discountTotal == undefined || discountType.discountTotal == null){
        if(discountType.message == undefined || discountType.message == null){
            discountData = ({
                messageCoupon : '',
                discount: 0
            })
        }else{
            discountData = ({
                messageCoupon : discountType.message,
                discount: 0
            })
        }
    }else{
        discountData = ({
            messageCoupon : '',
            discount: discountType.discountTotal
        })
    }

    var data = ({
        message: (response.checkoutMessage == strings.notIndonesianCodeMessage) ? 0 : 1,
        subtotal: response.subtotal,
        cashback: response.cashback,
        pointUsage: response.point_usage,
        tax: response.tax,
        total: response.total,
        discount: discountData
    })

    return data
    
}