import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import InputText from '../text_input'
import TextTitle from '../title_text'
import TrainingInput from './inputtext_material'



const ProgressInputTraining  = (props) => {

    return(
        <>
        <View style={{borderRadius: ukuran.dp_20,
                borderWidth: 1,
                marginTop: ukuran.dp_20,
                marginStart: ukuran.dp_20,
                marginEnd: ukuran.dp_20,
                borderColor: color.defaultColor}}>
            <TextTitle fontSize={ukuran.dp_12} align={'center'} top={ukuran.dp_14} tipe={'bold'} text={'Save Activity'.toUpperCase()}
                maxLine={2} warna={color.defaultColor}/> 
            <View style={styleProgress.parent}>
                <View style={styleProgress.parentFirst}>
                    <TextTitle fontSize={ukuran.dp_12} tipe={'bold'} text={props.date}
                        maxLine={2} warna={color.defaultColor}/>  
                    <TrainingInput placeholder={'Add Yoga'} onKetik={e => props.setAddYoga(e)}/>  
                    <TrainingInput placeholder={'Add Place'} onKetik={e => props.setAddPlace(e)}/>  
                    <TrainingInput placeholder={'Title your activity'} onKetik={e => props.setAddTitle(e)}/>
                </View>
                <View style={styleProgress.parentFirst}>
                    <TouchableOpacity activeOpacity={0.6} onPress={props.onDiscardClick}>

                        <TextTitle fontSize={ukuran.dp_12} align={'right'} tipe={'bold'} text={'DISCARD'}
                            maxLine={1} warna={color.redNirvana}/>  
                    </TouchableOpacity>
                    <TextTitle fontSize={ukuran.dp_12} top={ukuran.dp_20} align={'right'} text={'Time'}
                        maxLine={1}/>  
                    <TextTitle fontSize={ukuran.dp_18} top={ukuran.dp_10} tipe={'bold'} align={'right'} text={props.time}
                        maxLine={1}/>      
                </View>
            </View>
        </View>
        </>
    )

}

const styleProgress = StyleSheet.create({
    parent: {
        flexDirection: 'row',
            
    },
    parentFirst: {
        flex: 1,
        padding: 10,
    }
})

export default ProgressInputTraining