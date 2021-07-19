
import React from "react"
import { useState } from "react"
import ChipColor from "../../layouts/items/chips_color_layout"
import strings from "../../material/strings"

const ListChipColor = (props) => {

   var mapData = []
   var data  = []
   var colorBefore = []
   const [clickPostion, setPosition] = useState(0)
   const {stockData} = props
   var dataStock = JSON.parse(stockData)
   if(data.length > 0){
       data = []
       mapData = []
   }
   function processClick(id){
    setPosition(id)
}
   for(var i = 0; i < dataStock.length; i++){
       var stokData = dataStock[i]
       if(stokData.stock_show != '0'){
           if(stokData.type == "color"){
               if(!colorBefore.includes(stokData.hexcode)){
                   colorBefore.push(stokData.hexcode)
                   getStockData(stokData)
               }
           }else if(stokData.type == "pattern"){
               if(!colorBefore.includes(stokData.url)){
                   colorBefore.push(stokData.url)
                   getStockData(stokData)
               }
           }
       }
   }
    return(
        <>
        {data}
        </>
    )


    function getStockData(stokData){
        mapData.push({
            position: i,
            stockId: stokData.stockid,
            stock: stokData.stock,
            create_date: stokData.date_create,
            productId: stokData.productid,
            sizeId: stokData.sizeid,
            color: stokData.color,
            stockShow: stokData.stock_show,
            hexCode: stokData.hexcode,
            type: stokData.type,
            url: stokData.url,
            previewUrl: String(stokData.preview_url).split('||')[0]
        })
 
        data = mapData.map(colorData => (
            <ChipColor textData={colorData.color} color={(
                 colorData.type == "color") ? colorData.hexCode : strings.imageMainBase + colorData.url
                 } onpress={e=> {
                     props.onpressed(colorData.stockId, colorData.color, colorData.previewUrl)
                     processClick(colorData.position)
                    }}
                    position={colorData.position} clickedPosition={clickPostion}/>
        ))
    }
}

export default ListChipColor