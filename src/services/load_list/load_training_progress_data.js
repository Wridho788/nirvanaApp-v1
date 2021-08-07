import axios from "axios"
import { convertSeconds, dateFormat } from "../../functions/helper"
import ProgressInputTraining from "../../layouts/items/training_mat_section/progress_input_data"
import Constant from "../../material/constant"
import { getTokenData } from "../account_process"
import React from 'react'

export async function loadVideoUrl(){
    var url = "https://admin-strapi.nirvanastore.id/bulletins/random"
    var urlData = ""
    await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            Accept: "application/json"
        }
    })
        .then(resource => {
            urlData = resource.data
        })
        .catch(err => {
            urlData = err
        })
    return urlData.training_video
}

export async function loadTrainingProgreessData(page, code){
    var mapData = []
    var dataMap = []
    var response = []
    var url = `${Constant.inputTraining}/histories?mnm_code=${code}&page=${page}`
    
    var token = await getTokenData()
    await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            'Authorization': `Bearer ${token}`,
            Accept: "application/json"
        }
    })
        .then(resource => {
            response = resource.data
        })
        .catch(err => {
            response = err
        })

    for(var i = 0; i < response.length; i++){
        var dataS = response[i]
        mapData.push({
            id: dataS.taining_historyid,
            codeMat: dataS.mnm_code,
            duration: dataS.duration,
            location: dataS.location,
            activity_name: dataS.activity_name,
            yoga_name: dataS.yoga_name,
            date_recorded: dataS.date_recorded,
        })
        
    }
    dataMap = mapData.map(training => (
        <ProgressInputTraining
            isHistories={true}
            date={dateFormat(training.date_recorded, 'DD MMMM YYY HH:mm A')}
            idTraining={training.id} 
            time={convertSeconds(training.duration)}
            codeMat={training.codeMat} locationYoga={training.location}
            yogaName={training.yoga_name} titleYoga={training.activity_name}/>
    ))
    return dataMap
}