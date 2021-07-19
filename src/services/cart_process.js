'use strict'

import axios from "axios"
import Constant from "../material/constant"
import { getAllStockCartItem } from "./database/service_sqlite"

export async function loadCartData(body, url){
    var response = []
    await axios.put(url, body,{
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            Accept: "application/json"
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

export async function getAllStockCartId(){
    var stockData = await getAllStockCartItem()
    let data = {
        stock: stockData.stockIdData
    }

    return data
}