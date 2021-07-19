'use strict'
import React from 'react'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { convertPrice, dateFormat } from '../../functions/helper'
import CouponData from '../../layouts/items/coupon_data'
import EmptyBoxLayout from '../../layouts/items/empty_box'
import { CustomProgressBar } from '../../layouts/items/progress_bar'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import { getCouponData } from '../coupon_process'


const LoadCouponData = (props) =>{
    const [isLoaded, setLoaded] = useState(true)
    const [dataCoupon, setDataCoupon] = useState([])
    var mapData = []
    var dataMap = []

    useEffect(()=>{
        if(isLoaded){
            getData()
        }
    }, [isLoaded])


    function fetchData(data){
        for(let i = 0; i < data.customer.length; i++){
            var coupon = dataCoupon.customer[i]
            var nominalDisc = (coupon.discount_type == 'fix-cart') ? convertPrice(coupon.discount) : `${coupon.discount}%`
            mapData.push({
                discount: nominalDisc,
                discountType: coupon.discount_type,
                min_spend: coupon.min_spend,
                max_spend: coupon.max_spend,
                couponTag: coupon.coupon_tag,
                code: coupon.coupon_code,
                expire: dateFormat(coupon.expire_date, 'DD MMMM YYYY')
            })
        }
        for(let i = 0; i < data.global.length; i++){
            var coupon = data.global[i]
            var nominalDisc = (coupon.discount_type == 'fix-cart') ? convertPrice(coupon.discount) : `${coupon.discount}%`
            mapData.push({
                discount: nominalDisc,
                discountType: coupon.discount_type,
                min_spend: coupon.min_spend,
                max_spend: coupon.max_spend,
                couponTag: coupon.coupon_tag,
                code: coupon.coupon_code,
                expire: dateFormat(coupon.expire_date, 'DD MMMM YYYY')
            })
        }
        dataMap = mapData.map(coupon =>(
            <CouponData nominal={coupon.discount}
                min={convertPrice(coupon.min_spend)} code={coupon.code} exp={coupon.expire}/>
        ))
        setDataCoupon(dataMap)
    }

    const getData = async () =>{
        fetchData(await getCouponData())
        setLoaded(false)
    }

    return(
        <>
        {isLoaded && <CustomProgressBar isVisible={isLoaded}/>}
        {(dataCoupon.length > 0) ? dataCoupon : props.isEmpty(true)}
        </>
    )
}
export default LoadCouponData