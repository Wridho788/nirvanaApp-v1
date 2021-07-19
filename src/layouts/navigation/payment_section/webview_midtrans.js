'use strict'
import React from 'react'
import { Linking } from 'react-native'
import WebView from 'react-native-webview'
import { showSnackBar } from '../../../functions/helper'


const WebViewMidtrans = (props) =>{

    let urlWeb = props.route.params.urlWeb
    if(urlWeb == null || urlWeb == undefined){
        urlWeb = 'https://nirvanastore.id/notfound'
    }
    return(
        <>
            <WebView source={{uri: urlWeb}} onLoadProgress={({path}) => {
                console.log(path)
            }} javaScriptEnabled={true} onNavigationStateChange={(event) =>{
                if(event.url.match(/\/feedback\/payment\/done/ig)){
                    props.navigation.goBack()
                }
            }}/>
        </>
    )
}

export default WebViewMidtrans