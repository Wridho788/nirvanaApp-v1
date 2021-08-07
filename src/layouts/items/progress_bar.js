import { ActivityIndicator, Modal, StyleSheet, Text, View} from "react-native"
import React from 'react'
import AwesomeAlert from "react-native-awesome-alerts"
import strings from "../../material/strings"
import color from "../../material/color"
import * as Progress from 'react-native-progress'
import ukuran from "../../material/dimen"


const CustomProgressBar = ({isVisible}) =>{
    return(
    //     <Modal onRequestClose={() => null} visible={isVisible}>
    //     <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
    //     <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
    //         <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
    //         <ActivityIndicator size="large" />
    //     </View>
    //     </View>
    // </Modal>
    <AwesomeAlert
        show={isVisible}
        closeOnHardwareBackPress={false}
        closeOnTouchOutside={false}
        message={'Loading..'}
        />
    )
}

const ViewCustomDialog = ({isVisible, view, onDismiss, onConfirm}) => {
    return(
        <AwesomeAlert
            showCancelButton={onConfirm}
            showConfirmButton={onConfirm}
            confirmButtonColor={color.defaultColor}
            onCancelPressed={onDismiss}
            show={isVisible}
            onCancelPressed={onDismiss}
            onDismiss={onDismiss}
            contentContainerStyle={styleAlert.parent}
            closeOnHardwareBackPress={true}
            closeOnTouchOutside={true}
            message={view}
        />
    )
}


const styleAlert = StyleSheet.create({
    parent:{
        width: ukuran.wpMatchParent
    }
})

const ConfirmationDialog = ({isVisible, message, onClick, onDismiss}) =>{
    return(
        <AwesomeAlert
            show={isVisible}
            showProgress={false}
            title={strings.information}
            message={message}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            confirmText={strings.yes}
            confirmButtonColor={color.defaultColor}
            onCancelPressed={onDismiss}
            onConfirmPressed={onClick}/>
    )
}

//progress bar hanya ada satu tombol yang mendismis
const OneMessageProgress = ({isVisible, message, onClick}) => {
    return(
        <AwesomeAlert
            show={isVisible}
            showProgress={false}
            title={strings.information}
            message={message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText={'Oke'}
            confirmButtonColor={color.defaultColor}
            onConfirmPressed={onClick}/>
    )
}

const CircleProgressBar = (props) =>{
    return(
        <View style={{alignItems: 'center', margin: ukuran.dp_20}}>
            <Progress.Circle size={ukuran.dp_30} indeterminate={true} borderColor={color.defaultColor} borderWidth={2}/>
        </View>
    )
}

export {
    CustomProgressBar,
    CircleProgressBar,
    ConfirmationDialog,
    OneMessageProgress,
    ViewCustomDialog
}