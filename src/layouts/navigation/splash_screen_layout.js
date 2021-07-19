'use strict'
import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import CategoryText from '../items/category_text_layout'
import {TermSplashText} from '../items/term_condition_text'
import TextTitle from '../items/title_text'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isFirstTime } from '../../services/database/service_sqlite'
import strings from '../../material/strings'

const SplashLayout = (props) => {
    var videoUri = '../../../assets/video/'
    const [isRepeat, setRepeat] = useState(false)
    const [urlNow, setVideoUrl] = useState(`${videoUri}${props.route.params.urlFirst}`)
    const [position, setPosition] = useState(props.route.params.position)
    const [buttonText, setButtonText] = useState('Next')
    const [messageIntro, setMessageIntro] = useState(strings.firstIntroMessage)
    console.log(props.route.params.urlVideo)
    function videoPressed(){
        if(position == 2){
            setPosition(3)
            setMessageIntro(strings.secondIntroMessage)
        }else if( position == 3){
            setPosition(4)
            setVideoUrl(`${videoUri}pembayaran3.mp4`)
            setMessageIntro(strings.thirdIntroMessage)
        }else if(position == 4){
            setPosition(5)
            setVideoUrl(`${videoUri}vidmatx.mp4`)
            setMessageIntro('By using Nirvana Store you agreed we Term & Service')
            setButtonText(strings.sign_in)
        }else if(position == 5){
            AsyncStorage.setItem('first', '1')
            setPosition(1)
            setVideoUrl(`${videoUri}lotus.mp4`)
            setRepeat(false)
        }
    }

    function getUrlVideo(){
        if(urlNow == `${videoUri}namaste3.mp4`){

            return require(`${videoUri}namaste3.mp4`)

        }else if(urlNow == `${videoUri}vidwood.mp4`){

            return require(`${videoUri}vidwood.mp4`)

        }else if(urlNow == `${videoUri}pembayaran3.mp4`){

            return require(`${videoUri}pembayaran3.mp4`)

        }else if(urlNow ==`${videoUri}lotus.mp4`){

            return require(`${videoUri}lotus.mp4`)

        }else if(urlNow ==`${videoUri}vidmatx.mp4`){

            return require(`${videoUri}vidmatx.mp4`)

        }
        
    }

    useEffect(() => {
        if(urlNow == `${videoUri}namaste3.mp4`){
            setRepeat(false)
        }else if(urlNow == `${videoUri}lotus.mp4`){
            setRepeat(false)
        }
        if(!isRepeat){
            setTimeout(() =>{
                if(urlNow == `${videoUri}namaste3.mp4`){
                    setVideoUrl(`${videoUri}lotus.mp4`)
                }else if(urlNow == `${videoUri}lotus.mp4`){
                    (async () =>{
                        var statusFirst = await isFirstTime()
                        if(statusFirst == null){
                            if(position == 1){
                                AsyncStorage.setItem('splash', 'pass') 
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{name: 'Main'}]
                                })
                            }else{
                                setPosition(2) 
                                setVideoUrl(`${videoUri}vidwood.mp4`)
                                setRepeat(true)
                            }
                        }else{
                           AsyncStorage.setItem('splash', 'pass') 
                           props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Main'}]
                            })

                        }
                    })()
                }
            }, 4000)
        }
    }, [urlNow])

    return(
        <>
            <View style={styleSplash.parent}>
                <View style={{height: ukuran._matchparent, backgroundColor: color.white, zIndex: 1}}> 
                   <Video source={getUrlVideo()}
                     style={styleSplash.videoBackground} repeat={isRepeat} resizeMode="cover"/>
                </View>
               {(position == 0 || position == 1) ? null : 
                <View style={styleSplash.itemView}>
                    {(position <= 4) ? 
                        <TextTitle start={ukuran.dp_8} end={ukuran.dp_8} fontSize={ukuran.dp_14} tipe={'normal'} align={'center'} text={messageIntro} maxLine={6}/>
                        : null
                    }    
                    <TouchableOpacity style={styleSplash.categoryItem} activeOpacity={0.6} onPress={() => videoPressed()}>
                            <TextTitle fontSize={ukuran.dp_14} align={'left'} tipe={'bold'} text={buttonText}
                                    maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_12} 
                                    left={ukuran.dp_14} end={ukuran.dp_14} start={ukuran.dp_14} top={ukuran.dp_12}/>
                    </TouchableOpacity>
                    {(position > 4) ? 
                        <TermSplashText/>
                        : null
                    }
               </View>
               }
            </View>
        </>
    )
}

const styleSplash = StyleSheet.create({
    parent: {
       height: ukuran._matchparent,
       backgroundColor: color.white
    },
    itemView: {
        position: 'absolute',
        zIndex: 3,
        top: ukuran._matchparent - (ukuran._matchparent * 22/100), //bakal diubah sesuai tinggi view secara dinamis
        width: Dimensions.get("window").width
    },
    categoryItem:{
        borderRadius: ukuran.dp_8,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: color.defaultColor,
        borderWidth: 2,
        marginTop: ukuran.dp_14
    },
    videoBackground: {
        height: ukuran._matchparent,
    }
})

export default SplashLayout