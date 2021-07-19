'use strict'

import axios from "axios"
import { showSnackBar } from "../functions/helper"
import Constant from "../material/constant"
import strings from "../material/strings"
import { getTokenData } from "./account_process"

export async function requestDataMat(codeMat){
    var token = await getTokenData()
    var response = null
    await axios.get(Constant.getMatData + codeMat, {
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

export async function requestListMat(){
    var token = await getTokenData()
    var response = null
    await axios.get(Constant.addMatData, {
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

export async function requestAddMatData(codeMat){
    var token = await getTokenData()
    var response = null
    console.log(codeMat)
    let body = {
        code: codeMat
    }
    await axios.post(Constant.addMatData, body, {
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

export function getResponseMat(response){
    if(response == 'OK'){
        return strings.sucess
    }else{
        if(response.code != undefined && response.code != null){
            return response.message
        }else{
            return strings.something_wrong
        }
    }
}