import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import { View,  StyleSheet} from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import TextTitle from './title_text'

const CustomCheckBox = (props) => {
    return(
        <>
        <View  style={styles.checkBoxContainer}>

            <View style={{width:  ukuran.dp_20, height: ukuran.dp_20, marginEnd: ukuran.dp_14}}>
                <CheckBox
                    value={false}
                    lineWidth={1}
                    style={{width: ukuran.dp_20, height: ukuran.dp_20}}
                    onValueChange={(value) => props.onCheck(value)}
                    tintColor={color.defaultColor}
                    onCheckColor={color.defaultColor}
                    onTintColor={color.defaultColor}
                    />
             </View>   
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    checkBoxContainer:{
        flexDirection: 'row'
    },
})

export default CustomCheckBox