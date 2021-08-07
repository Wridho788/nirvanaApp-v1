import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import { convertSeconds, showSnackBar } from '../../../../../functions/helper'
import StopWatchReact from '../../../../../functions/stopwatch'
import color from '../../../../../material/color'
import Constant from '../../../../../material/constant'
import ukuran from '../../../../../material/dimen'
import strings from '../../../../../material/strings'
import { authAccountProccess, requestChangePassword } from '../../../../../services/account_process'
import { loadVideoUrl } from '../../../../../services/load_list/load_training_progress_data'
import { ConfirmationDialog, CustomProgressBar, ViewCustomDialog } from '../../../../items/progress_bar'
import TextTitle from '../../../../items/title_text'
import ProgressInputTraining from '../../../../items/training_mat_section/progress_input_data'
import UnderlineLayoutGrey from '../../../../items/underline_layout_grey'

const PageTraining = (props) => {
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'))
    const [textAction, setTextAction] = useState('Start')
    const [time, setTime] = useState(0)
    const [finishBtn, setShowFinishBtn] = useState(false)
    const [saveBtn, setSaveBtn] = useState(false)
    const [startStopwatch, setStartStopWatch] = useState(false)
    const [saveInputData, showSetInputData] = useState(false)
    const [process, setProcess] = useState(false)
    const [isDiscard, setDiscard] = useState(false)
    const [timeNow, setTimeNow] = useState(Date.now())
    const [areaTraining, showAreaTraining] = useState(true)
    const [isPaused, setPaused] = useState(true)
    const [urlVideo, setUrlVideo] = useState('')
    
    //save data section
    const [typeYoga, setTypeYoga] = useState('')
    const [placeYoga, setPlaceYoga] = useState('')
    const [titleYoga, setTitleYoga] = useState('')

    var withOur = props.route.params.withOur

    const inputToDb = async () => {
        if(typeYoga.length > 0 && titleYoga.length > 0 && placeYoga.length > 0){
            setStartStopWatch(false)
            setProcess(true)
            var timeMilisec = time * 1000
            var endTime = timeNow + timeMilisec
            var codeMat = props.route.params.codeMat
            let body = {
                start_time: timeNow,
                end_time: endTime,
                mnm_code: codeMat,
                yoga_name: typeYoga,
                activity_name: titleYoga,
                location: placeYoga,
            }
            //make function change password juga bisa :v
            var response = await requestChangePassword(body, Constant.inputTraining)
            if(response.status == 200){
                props.navigation.goBack()
                showSnackBar('Save successfully')
            }else{
                showSnackBar(response.message)
            }
            setProcess(false)
        }else{
            showSnackBar(strings.empty_detect)
        }
    }

    useEffect(() =>{
        (async () =>{
            BackHandler.addEventListener('hardwareBackPress', () => true)
            var videoUrl = await loadVideoUrl()
            setUrlVideo(videoUrl)
            setCurrentTime(moment().format('HH:mm'))        
        })()
    }, [])

    return(
        <>
        {process && (<CustomProgressBar isVisible={process}/>)}
        {isDiscard && (<ViewCustomDialog onDismiss={() => setDiscard(false)} isVisible={isDiscard} view={<DiscardLayout 
            onCancel={e => setDiscard(false)} onYes={e => {
                setDiscard(false)
                props.navigation.goBack()
                }}/>}/>)}
           <View style={{backgroundColor: color.white, flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
               <View style={stylePage.parent}>
                    {areaTraining && withOur ? <Video paused={isPaused} controls={true} source={{uri: urlVideo}}
                        style={stylePage.videoBackground} repeat={true} resizeMode="cover"/> : null}
                        {areaTraining && <View>
                            <TextTitle fontSize={ukuran.dp_18} align={'center'} text={`Clock`.toUpperCase()}
                                maxLine={1} warna={color.defaultColor}/>
                            <TextTitle fontSize={60} align={'center'} tipe={'bold'} text={currentTime}
                                maxLine={1} warna={color.defaultColor} top={ukuran.dp_10}/>
                             <UnderlineLayoutGrey/>
                        </View>    }
                        {saveInputData && <ProgressInputTraining 
                            onDiscardClick={e => setDiscard(true)}
                            setAddYoga={e => setTypeYoga(e)}
                            setAddPlace={e => setPlaceYoga(e)}
                            setAddTitle={e => setTitleYoga(e)} time={convertSeconds(time)} date={moment().format('DD MMMM YYYY HH:mm A')}/> } 
                        {areaTraining && <TextTitle fontSize={ukuran.dp_18} align={'center'} text={`Yoga Time`.toUpperCase()}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_20}/> }
                        {areaTraining && <StopWatchReact start={startStopwatch} onTick={detik => setTime(detik)}/>}
                        <View style={stylePage.areaButton}>
                            <TouchableOpacity style={stylePage.button} activeOpacity={0.5} onPress={e => {
                                if(startStopwatch){ 
                                    setShowFinishBtn(true)
                                    setStartStopWatch(false)
                                    setPaused(true)
                                    setTextAction('Resume')
                                }else if(saveBtn){
                                    inputToDb()
                                }else{
                                    setShowFinishBtn(true)
                                    setStartStopWatch(true)
                                    setPaused(false)
                                    setTextAction('Pause')
                                }
                            }}>
                                <TextTitle fontSize={ukuran.dp_10} align={'center'} text={textAction.toUpperCase()}
                                    maxLine={1} warna={color.defaultColor}/>
                            </TouchableOpacity>
                            {finishBtn && <TouchableOpacity style={stylePage.button} activeOpacity={0.5} onPress={e => {
                                setStartStopWatch(false)
                                setShowFinishBtn(false)
                                setSaveBtn(true)
                                showAreaTraining(false)
                                setPaused(true)
                                showSetInputData(true)
                                setTextAction('Save')
                            }}>
                                <TextTitle fontSize={ukuran.dp_10} align={'center'} text={`Finish`.toUpperCase()}
                                    maxLine={1} warna={color.defaultColor}/>
                            </TouchableOpacity> }
                            
                        </View>        
               </View>
           </View> 
        </>
    )
}



const DiscardLayout = (props) => {
    return(
        <>
        <View>
            <TextTitle fontSize={ukuran.dp_14} align={'center'} tipe={'bold'} text={'Discard this activity'.toUpperCase()}
                maxLine={1} warna={color.defaultColor} top={ukuran.dp_10}/>
                <TextTitle fontSize={ukuran.dp_12} align={'center'}text={'Discarding this activity will erase it\npermanently.'}
                    maxLine={2} warna={color.defaultColor} top={ukuran.dp_10}/>
                <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'bold'} text={'Are you sure?'}
                    maxLine={1} warna={color.defaultColor} top={ukuran.dp_10}/>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity activeOpacity={0.6} onPress={props.onCancel} style={stylePage.dButton}>
                    <TextTitle fontSize={ukuran.dp_12} align={'center'} text={'Cancel'}
                        maxLine={1} warna={color.defaultColor}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={props.onYes}  style={stylePage.dButton}>
                    <TextTitle fontSize={ukuran.dp_12} align={'center'} text={'Yes'}
                        maxLine={1} warna={color.defaultColor}/>
                </TouchableOpacity>
            </View>         
        </View>
        </>
    )
}

const stylePage = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: color.white
    },

    videoBackground: {
        height: 240,
        marginBottom: ukuran.dp_24
    },

    areaButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: ukuran.dp_24,
        marginBottom: ukuran.dp_30
    },

    button: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        borderRadius: 75/2,
        borderColor: color.defaultColor,
        borderWidth: 1,
        marginEnd: ukuran.dp_10,
        marginStart: ukuran.dp_10,
    },

    dButton : {
        borderRadius: ukuran.dp_10,
        padding: ukuran.dp_8,
        marginEnd: 5,
        marginStart: 5,
        borderWidth: 1,
        marginTop: ukuran.dp_20,
        borderColor: color.defaultColor
    }
})

export default PageTraining