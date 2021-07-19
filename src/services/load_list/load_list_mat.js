'use strict'
import React from 'react'
import { Text } from 'react-native'
import { capitalize } from '../../functions/helper'
import EmptyBoxLayout from '../../layouts/items/empty_box'
import MatData from '../../layouts/items/mat_data_layout'

const LoadListMatData = (props) =>{
    var data = props.data
    var dataMap = []
    var mapData = []

    for(let i = 0; i < data.length; i++){
        var matData = data[i]
        mapData.push({
            image: matData.mnm_images_url,
            matName: matData.name,
            matCode: matData.mnm_code,
            status: matData.mnm_status,
            matColor: matData.color,
            startDate: matData.active_date
        })
    }

    dataMap = mapData.map(mat => (
        <MatData image={mat.image} matName={mat.matName} matCode={mat.matCode}
            status={capitalize(mat.status)} matColor={mat.matColor} startDate={mat.startDate} onpressed={() => props.onClick(mat.matCode)}/>
    ))

    return(
        <>
          {(dataMap.length > 0) ? dataMap : null}
        </>
    )
}

export default LoadListMatData