'use strict'

import axios from "axios"
import Constant from "../material/constant"
import { getTokenData } from "./account_process"

export async function requestDataInvoice(orderid){
    var response = null
    var token = await getTokenData()
    await axios.get(Constant.invoiceData + orderid, {
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

export async function requestCancelOrder(idOrder){
    let body = {
        orderid: idOrder,
        statusid: 5
    }
    var response = null
    var token = await getTokenData()
    await axios.put(Constant.changeOrder, body, {
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