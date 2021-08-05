import React from 'react'
import { Keyboard, StyleSheet, TextInput } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'

const TrainingInput = (props) => {


    return (
        <>
            <TextInput
                style={styleInput.input}
                placeholder={props.placeholder}
                underlineColorAndroid="transparent"
                textContentType="name"
                placeholderTextColor={color.white_100}
                onSubmitEditing={() => Keyboard.dismiss()}
                keyboardType={props.textInput}
                blurOnSubmit={false}
                onChangeText={props.onKetik}
                key={props.placeholder}
                value={props.data}
                autoCorrect={false}
                secureTextEntry={props.isPassword}
                autoCapitalize="none" />

        </>
    )

}

const styleInput = StyleSheet.create({

    input: {
        borderColor: color.defaultColor,
        borderWidth: 1,
        marginTop: ukuran.dp_10,
        borderRadius: ukuran.dp_6,
        padding: ukuran.dp_4
    }
})

export default TrainingInput