import { Keyboard, Platform, StyleSheet, TextInput, View } from "react-native"
import React from 'react'
import color from "../../material/color"
import ukuran from "../../material/dimen"
import { useState} from 'react'

const InputText = (props) => {
    const [text, setText] = useState(props.value)
    if(props.useIcon){
        return (
            <View style={styleInput.inputParent}>
                <View style={{ flexDirection: 'row', margin: ukuran.dp_10, paddingBottom: (Platform.OS == 'ios') ? ukuran.dp_8 : 0, paddingTop:(Platform.OS == 'ios') ? ukuran.dp_8 : 0}}>
                    <props.icon style={styleInput.iconStyle} />
                    <TextInput
                        style={styleInput.input}
                        placeholder={props.placeholder}
                        underlineColorAndroid="transparent"
                        textContentType="name"
                        keyboardType={props.textInput}
                        onChangeText={props.onKetik}
                        value={props.data}
                        blurOnSubmit={false}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        key={props.placeholder}
                        secureTextEntry={props.isPassword}
                        placeholderTextColor={color.white_100}
                        autoCapitalize="none" />
                </View>
            </View>
        )
    }else{
        return (
            <View style={styleInput.inputParent}>
                <View style={{ flexDirection: 'row', margin: ukuran.dp_10, paddingBottom: (Platform.OS == 'ios') ? ukuran.dp_8 : 0, paddingTop: (Platform.OS == 'ios') ? ukuran.dp_8 : 0}}>
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
                </View>
            </View>
        )
    }
}

export default InputText

const styleInput = StyleSheet.create({
    iconStyle: {
        alignSelf: 'center'
    },

    inputParent: {
        backgroundColor: color.white,
        borderRadius: ukuran.dp_10,
        overflow: 'hidden',
        marginBottom: ukuran.dp_16,
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: color.defaultColor
    },

    input: {
        flex: 1,
        fontSize: ukuran.dp_18,
        marginStart: ukuran.dp_10
    }
})


