import axios from 'axios'
import Constant from '../../material/constant'


export function loadDataCountry(){
    return require('../../local_file/country_data.json')
}

export async function loadProvinceData(countryId){
    var data = []
    var mapData = []
    await axios.get(Constant.provinceList + countryId, {
        headers: {
            origin: Constant.origin
        }
    })
        .then(resource => {
            data = resource.data
        })
        .catch(err => {
        }) 

    for(let i = 0; i < data.length; i++){
        mapData.push({
            label: data[i].province,
            value: data[i].province
        })

    }
    return mapData
}

export function loadDataPhoneCode(){
    var callingArr = require('../../local_file/country_phone.json')
    var pushData = []
    for(let i = 0; i < callingArr.length; i++){
        pushData.push({
            label: callingArr[i].dial_code,
            value: String(callingArr[i].dial_code).replace('+', '')
        })

    }
    return pushData
}

export async function loadCityData(provinceId){
    var data = []
    var mapData = []
    await axios.get(Constant.cityList + provinceId, {
        headers: {
            origin: Constant.origin
        }
    })
        .then(resource => {
            data = resource.data
        })
        .catch(err => {
        }) 

    for(let i = 0; i < data.length; i++){
        mapData.push({
            label: data[i].city,
            value: data[i].city
        })

    }
    return mapData
}