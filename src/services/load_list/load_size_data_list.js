import ChipSize from "../../layouts/items/chips_size_layout"
import React from 'react'
import { useState } from "react"


//array, selected id, array from API
export function loadSizeData(colorName, setStockId, stockData){
    var parsedStock = JSON.parse(stockData)
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
            if(colorName == colorPerbandingan){
                if(stokQuantity != "0"){
                    if(sizeString != "NULL" && sizeString != "null"){
                        if(!sizeBefore.includes(sizeString)){
                            sizeBefore.push(sizeString)
                            mapData.push({
                                sizeText: String(position.sizeid).toUpperCase(),
                                stokId: idStok
                            })
                            if(mapData[0].sizeText != 'NULL'){  
                                data = mapData.map ( sizeData => (  
                                    <ChipSize position={i} clickedPostion={positionClick} textSize={sizeData.sizeText} onpressed={e => {
                                        setStockId(sizeData.stokId)
                                        setPosition(i)
                                    }}/>
                                ))
                            }
                        }
                    }
                }
            }
        }
    }
    return data
}