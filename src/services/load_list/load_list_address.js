'use strict'

import React from 'react'
import AddressData from '../../layouts/items/data_address'

const LoadUserAddress = (props) =>{
    var dataMap = []
    var mapData = []
    for(let i = 0; i < props.data.length; i++){
        var address = props.data[i]
        mapData.push({
            shippingid: address.shippingid,
            tag: address.tag,
            nama: address.name,
            phone: address.tel,
            detail: address.address,
            costumerid: String(address.customerid)
        })
    }
    dataMap = mapData.map(alamat =>(
        <AddressData routing={props.routing} nama={alamat.nama} nohp={alamat.phone} detailAddress={alamat.detail}
            shippingid={alamat.shippingid} isDefault={(alamat.costumerid != 'null') ? true : false} reload={props.isLoad}/>
    ))

    return(
        <>
            {dataMap}
        </>
    )
}


export default LoadUserAddress