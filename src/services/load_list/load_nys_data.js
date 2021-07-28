import axios from "axios"
import NewsYoga from "../../layouts/items/yoga_news_section/article_yoga_news"
import Constant from "../../material/constant"
import React from 'react'
import TipsCategoryData from "../../layouts/items/yoga_news_section/tips_training_nys"

export async function loadListNysData(categoryId, page, nav, isSlider){
    var mapData = []
    var dataMap = []
    var response = []
    var url = ''
    if(categoryId == 0){
        url = `${Constant.baseNys}?_page=${page}`
    }else{
        url = `${Constant.baseNys}?_page=${page}&news_categories.id=${categoryId}`
    }
    await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
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
            title: dataS.title,
            shortDesc: dataS.shortDesc,
            publishDate: dataS.published_at,
            permalink: dataS.permalink,
            thumbnail: dataS.cover.url
        })
        
    }
    dataMap = mapData.map(news => (
        <NewsYoga title={news.title} shortDesc={news.shortDesc}
            date={news.publishDate} thumbnail={news.thumbnail} onPressed={e => nav.push('DetailNys', {permalink: news.permalink})} isSlider={isSlider}/>
    ))
    return dataMap
}

export async function loadVideoDataNys(categoryId, page, nav, isSlider){
    var mapData = []
    var dataMap = []
    var response = []
    var url = ''
    if(categoryId == 0){
        url = `${Constant.baseNys}?_page=${page}`
    }else{
        url = `${Constant.baseNys}?_page=${page}&news_categories.id=${categoryId}`
    }
    await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
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
            title: dataS.title,
            shortDesc: dataS.shortDesc,
            publishDate: dataS.published_at,
            permalink: dataS.permalink,
            thumbnail: dataS.cover.url
        })
        
    }
    dataMap = mapData.map(news => (
        <TipsCategoryData title={news.title} thumbnail={news.thumbnail} onPressed={e => nav.push('DetailNys', {permalink: news.permalink})} isSlider={isSlider}/>
    ))
    return dataMap
}


export async function loadDetailNys(permalink){
    var url = `${Constant.baseNys}/${permalink}`
    var response = null
    await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            origin: Constant.origin,
            Accept: "application/json"
        }
    })
        .then(resource => {
            response = resource.data
        })
        .catch(err => {
            response = err
        })
    return response    
}

