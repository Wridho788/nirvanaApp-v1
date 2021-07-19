import axios from "axios"
import Constant from "../material/constant"
import { getTokenData } from "./account_process"

export async function addNewAddressProcess(body, token) {
    var datas = []
    await axios.post(Constant.addNewAddress, body, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            console.log(err)
        })


    return datas
}


export async function loadDetailAddress(shippingId, token){
    var messageResponse = ""
    await axios.get(Constant.detailAddress + shippingId, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(resource => {
            messageResponse = resource.data
        })
        .catch(err => {
            messageResponse = err
        })


    return messageResponse
}

export async function editAddress(body, token, shippingId){
    var messageResponse = ""
    await axios.post(Constant.editAddress + shippingId, body, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            messageResponse = resource.data
        })
        .catch(err => {
            messageResponse = err
        })

    return messageResponse
}

export async function loadListUserAddress() {
    var datas = []
    var token = await getTokenData()
    await axios.get(Constant.loadAddress,{
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            console.log(err)
            datas = err
        })

        return datas
}

export async function setDefaultAddress(shippingId, token){
    var messageResponse = ""
    await axios.put(Constant.setDefaultAddress + shippingId, null,{
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(resource => {
            messageResponse = resource.data
        })
        .catch(err => {
            messageResponse = err
        })


    return messageResponse
}


export async function deleteAddress(shippingId, token){
    var messageResponse = ""
    await axios.put(Constant.deleteAddress + shippingId, null,{
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(resource => {
            messageResponse = resource.data
        })
        .catch(err => {
            messageResponse = err
        })


    return messageResponse
}