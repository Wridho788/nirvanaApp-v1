import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import StopWatchReact from '../../../../../functions/stopwatch'
import color from '../../../../../material/color'
import ukuran from '../../../../../material/dimen'
import TextTitle from '../../../../items/title_text'

const PageTraining = (props) => {
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'))
    const [textAction, setTextAction] = useState('Start')
    const [time, setTime] = useState(0)
    const [finishBtn, setShowFinishBtn] = useState(false)
    const [startStopwatch, setStartStopWatch] = useState(false)
    useEffect(() =>{
        setCurrentTime(moment().format('HH:mm'))        
    }, [])

    return(
        <>
           <View style={{backgroundColor: color.white, flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
               <View style={stylePage.parent}>
                        <TextTitle fontSize={ukuran.dp_18} align={'center'} text={`Clock`}
                            maxLine={1} warna={color.defaultColor}/>
                        <TextTitle fontSize={ukuran.dp_30} align={'center'} tipe={'bold'} text={currentTime}
                            maxLine={1} warna={color.defaultColor} top={ukuran.dp_24}/> 
                        <StopWatchReact start={startStopwatch} onTick={detik => setTime(detik)}/>
                        <View style={stylePage.areaButton}>
                            <TouchableOpacity style={stylePage.button} activeOpacity={0.5} onPress={e => {
                                setShowFinishBtn(true)
                                if(startStopwatch){
                                    setStartStopWatch(false)
                                    setTextAction('Resume')
                                }else{
                                    setStartStopWatch(true)
                                    setTextAction('Pause')
                                }
                            }}>
                                <TextTitle fontSize={ukuran.dp_10} align={'center'} text={textAction.toUpperCase()}
                                    maxLine={1} warna={color.defaultColor}/>
                            </TouchableOpacity>
                            {finishBtn && <TouchableOpacity style={stylePage.button} activeOpacity={0.5} onPress={e => {
                                setStartStopWatch(false)
                                console.log(time)
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

const stylePage = StyleSheet.create({
    parent: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: color.white
    },

    areaButton: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
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
    }
})

export default PageTraining