
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EmptyBox from '../../icons/empty_box'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import TextTitle from './title_text'

const EmptyBoxLayout = (props) =>{


    return(
        <>
            <View style={styleBox.boxArea}>
                <EmptyBox/>
                <TextTitle fontSize={14} align={'left'} text={strings.nothing} top={ukuran.dp_8} maxLine={1} warna={'#808080'}/>
            </View>
        </>
    )
}

const styleBox = StyleSheet.create({
   

    boxArea: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: '40%'

    }
})

export default EmptyBoxLayout