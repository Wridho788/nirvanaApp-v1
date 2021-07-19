'use strict'
import React from 'react'
import { useState } from 'react'
import ChipSize from '../../layouts/items/chips_size_layout'

const LoadSizeData = (props) =>{
    var parsedStock = JSON.parse(props.stockData)
    var mapData = []
    var data = []
    const [positionClick, setPosition] = useState(0)
    if(data.length > 0){
        data = []
        mapData = []
    }

    if(parsedStock.length > 0){
        var sizeBefore = []
        for(let i = 0; i < parsedStock.length; i++){
            var position = parsedStock[i]
            var colorPerbandingan = position.color
            var stokQuantity = position.stock_show
            var sizeString = position.sizeid
            var idStok = position.stockid
            if(props.colorName == colorPerbandingan){
                if(stokQuantity != "0"){
                    if(sizeString != "NULL" && sizeString != "null"){
                        if(!sizeBefore.includes(sizeString)){
                            sizeBefore.push(sizeString)
                            mapData.push({
                                position: i,
                                sizeText: String(position.sizeid).toUpperCase(),
                                stokId: idStok
                            })
                            if(mapData[0].sizeText != 'NULL'){  
                                data = mapData.map ( sizeData => (  
                                    <ChipSize position={sizeData.position} clickedPosition={positionClick} textSize={sizeData.sizeText} onpressed={e => {
                                        props.setStockId(sizeData.stokId)
                                        setPosition(sizeData.position)
                                    }}/>
                                ))
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <>
            {data}
        </>
    )
}

export default LoadSizeData