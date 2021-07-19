import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { G } from 'react-native-svg'
import Constant from '../material/constant'

export function getDetailProduct(idProduct, callback, setLoading, setImageDetail){
        function getData(){
            axios.get(Constant.detailProduct + idProduct, {
                headers:{
                    'origin':  "https://nirvanastore.id" 
                }
            })
            .then(res =>{
                callback(res.data)
                setImageDetail(res.data['stock'][0].preview_url)
                setLoading(true)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    
        useEffect(() =>{
            getData()
        }, [null])
}

export function setListImages(arrayGambar){
    console.log("Teslaaa       "+ arrayGambar)
}