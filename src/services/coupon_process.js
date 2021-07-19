'use strict'

import axios from "axios"
import Constant from "../material/constant"
import { getTokenData } from "./account_process"

export async function getCouponData(){
    var token = await getTokenData()
    var response = null
    await axios.get(Constant.getCoupon, {
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