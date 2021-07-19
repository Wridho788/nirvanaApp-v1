'use strict'
import strings from "../material/strings"
import React from 'react'
import ImageListThumbnail from "../layouts/items/detail_image_horizontal"
import { useState } from "react"

var imageData = []
var imageMap = []
const ListImage = (props) =>{
    const {image} = props
    const [clickPostion, setPosition] = useState(0)
    const [clicked, setClicked] = useState(false) 
    if(imageData.length > 0){
        imageData = []
        imageMap = []
    }

    function processClick(id){
        setPosition(id)
    }

    for(let i = 0; i < image.length; i++){
        imageMap.push({
            position: i,
            colorName : image[i],
            imageList: image[i]
        })
        imageData = imageMap.map(data => (  
            <ImageListThumbnail
            onpress={e => {
                processClick(data.position)
                props.onImageSelected(data.position)
            }} position={data.position} clickedPosition={clickPostion} clicked={clicked} imageUrl={strings.imageMainBase + data.imageList}/>
        ))
    }

    return(
        <>
            {imageData}
        </>
    )
}

export default ListImage