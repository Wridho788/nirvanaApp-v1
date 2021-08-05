import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Constant from "../material/constant"

export async function authAccountProccess(data, url){
    var datas = ""
    await axios.post(url, data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            datas = err
        })


    return datas
}

export async function requestChangePassword(data, url){
    var datas = ""
    var token = await getTokenData()
    await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            datas = err
        })


    return datas
}

export async function getTokenData(){
    return await AsyncStorage.getItem('tokenLogin')
}

export async function loadProgressUser(data, token){
    var datas = []
    var urlData = `${Constant.urlClass}${data.classid}&progress=${data.progress}`
    await axios.get(urlData, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            console.log(err)
        })


    return datas
}


export async function loadUserData(token) {
    var datas = []
    await axios.get(Constant.profileDetail, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`
        }
    })
        .then(resource => {
            datas = resource.data
        })
        .catch(err => {
            console.log(err)
        })


    return datas
}