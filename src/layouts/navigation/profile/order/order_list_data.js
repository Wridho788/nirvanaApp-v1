'use strict'

import React from 'react'
import { ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import color from '../../../../material/color'
import { getStatusDataOrder } from '../../../../services/load_list/load_order_status'
import DataOrder from '../../../items/data_order'
import EmptyBoxLayout from '../../../items/empty_box'
import { CircleProgressBar } from '../../../items/progress_bar'

const ListOrderData = (props) =>{
    var [dataStatus, setDataStatus] = useState([])
    var [isLoaded, setLoaded] = useState(false)
    var dataMap = []
    var mapData = []

    useEffect(()=>{
        if(!isLoaded){
            getDataOrder()
        }
    }, [isLoaded])

    const getDataOrder = async () =>{
        dataMap = []
        mapData = []
        setDataStatus(await getStatusDataOrder(props.text))
        setLoaded(true)
    }

    if(dataStatus.length > 0){
        fetchData()
    }


    function fetchData(){
        for(let i = 0; i < dataStatus.length; i++){
            var statusData = dataStatus[i]
            mapData.push({
                orderid: statusData.orderid,
                productImage: statusData.img,
                productName: statusData.name,
                priceTotal: statusData.total,
                customerid: statusData.customerid,
                shippingid: statusData.shippingid,
                colorName: statusData.color,
                statusOrder: statusData.status
            })
        }
        dataMap = mapData.map(data => (
            <DataOrder orderid={data.orderid} productImage={data.productImage} productName={data.productName}
                priceTotal={data.priceTotal} customerid={data.customerid} shippingid={data.shippingid}
                statusOrder={data.statusOrder} colorName={data.colorName} navigasi={props.navigasi}/>
        ))
    }




    return(
        <>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: color.white}}>
            {/* Jika status false, munculkan progress bar*/}
            {!isLoaded && (<CircleProgressBar/>)}
            {(dataStatus.length > 0) ? dataMap : null}
        </ScrollView>
        {(dataStatus.length > 0) ? null : <EmptyBoxLayout/>}
        </>
    )
}

export default ListOrderData