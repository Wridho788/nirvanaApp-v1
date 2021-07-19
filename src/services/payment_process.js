import axios from "axios"
import Constant from "../material/constant"
import strings from "../material/strings"
import { getTokenData } from "./account_process"

export async function loadDataPayment(orderId){
    var token = await getTokenData()
    var response = null
    await axios.get(Constant.urlnewPayment + orderId, {
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

export async function checkResponseMidtrans(orderid){
    var response = null
    await axios.get(Constant.midtransMain + orderid + '/status', {
        auth: {
            username: strings.midtransServerKey,
            password: '',
        },
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
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

export async function requestWebhook(body){
    var response = ''
    await axios.post(Constant.webHook, body, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
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


export async function loadDataBank(){
    var token = await getTokenData()
    var response = []
    await axios.get(Constant.dataBank, {
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

export async function requestBankTransfer (body){
    var token = await getTokenData()
    var response = []
    await axios.post(Constant.requestBank, body, {
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

export async function requestMidtrandsPayment(body){
    var token = await getTokenData()
    var response = []
    await axios.post(Constant.requestMidtrans, body, {
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