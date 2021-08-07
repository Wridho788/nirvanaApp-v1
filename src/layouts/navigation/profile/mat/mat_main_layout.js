'use strict'
import React from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import MatData from '../../../items/mat_data_layout'
import TextTitle from '../../../items/title_text'
import BottomSheet from 'reanimated-bottom-sheet'
import MatPopup from './add_mat_popup'
import { useRef } from 'react'
import Animated from 'react-native-reanimated'
import { useState } from 'react'
import { CustomProgressBar, ViewCustomDialog } from '../../../items/progress_bar'
import DialogSelectInputMat from '../../../items/input_mat_dialog'
import PreviewMat from './preview_mat_popup'
import { useEffect } from 'react'
import { requestDataMat, requestListMat } from '../../../../services/mat_process'
import LoadListMatData from '../../../../services/load_list/load_list_mat'
import strings from '../../../../material/strings'
import EmptyBoxLayout from '../../../items/empty_box'
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { showSnackBar } from '../../../../functions/helper'
import NfcPopup from './nfc_popup'

const MatLayout = (props) => {
    const [isAddDialog, setAddDialog] = useState(false)
    const [added, setAdded] = useState(false)
    const [onDisableView, setDisableView] = useState('')
    const [previewShow, setShowPreview] = useState(true)
    const [matDataInput, setMatData] = useState([])
    const [matDataLayout, setMatDataLayout] = useState([])
    const [isLoaded, setLoaded] = useState(true)
    const [log, setLog] = useState('')
    const [isProgress, setProgress] = useState(false)
    const [isNfcSupport, setNfcSupport] = useState(false)

    const addRef = useRef(null)
    const previewRef = useRef(null)
    const nfcRefDialog = useRef(null)
    const addSheetContent = () => {
        return (<MatPopup onBackPressed={() => addRef.current.snapTo(1)} showPreview={(preview, data) => {
            if (preview) {
                addRef.current.snapTo(1)
                setMatData(data)
            }
            setLoaded(false)
            setShowPreview(preview)
        }} />)
    }

    const nfcShow = () => { return (<NfcPopup onBackPressed={() => nfcRefDialog.current.snapTo(1)} />) }

    const previewContent = () => {
        return (<PreviewMat isAdded={isadded => {
            if (isadded) {
                loadMatData()
                previewRef.current.snapTo(1)
            }
        }} onBackPressed={() => previewRef.current.snapTo(1)} matData={matDataInput}
         onStartPress={e => props.navigation.navigate('StartYogaMatMain', { matData: matDataInput })}
         onProgressPress={e => props.navigation.navigate('MatTrainingProgress', {matCode: matDataInput.code})} />)
    }

    let fall = new Animated.Value(1);
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
        inputRange: [0, 1],
        outputRange: [0.5, 0],
    });


    const loadMatData = async () => {
        setLoaded(true)
        var requestMatList = await requestListMat()
        setMatDataLayout(requestMatList)
        setLoaded(false)
    }

    const requestPreviewMat = async (idMat) => {
        setDisableView('none')
        if (idMat.length > 0) {
            //props.showPreview(true, codeMat)
            setProgress(true)
            var requestMatData = await requestDataMat(idMat)
            if (requestMatData != strings.mat_not_found_code && requestMatData.name != null && requestMatData.name != undefined) {
                setShowPreview(true)
                setMatData(requestMatData)
            } else {
                showSnackBar(requestMatData.message)
            }
            setProgress(false)
        } else {
            showSnackBar(strings.empty_detect)
        }
    }

    const _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    }

    const readData = async () => {
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Move closer to your Nirvana Mat'
            });

            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

            resp = await cmd([0x3A, 4, 4]);
            let payloadLength = parseInt(resp.toString().split(",")[1]);
            let payloadPages = Math.ceil(payloadLength / 4);
            let startPage = 5;
            let endPage = startPage + payloadPages - 1;

            resp = await cmd([0x3A, startPage, endPage]);
            let bytes = resp.toString().split(",");
            let text = "";

            for (let i = 0; i < bytes.length; i++) {
                if (i < 5) {
                    continue;
                }
                if (parseInt(bytes[i]) === 254) {
                    break;
                }
                text = text + String.fromCharCode(parseInt(bytes[i]));
            }
            console.log('Data' + text)
            setLog(text)
            _cleanUp();
            var dataSplit = text.split('=')
            console.log('Kode Mat NFC', dataSplit[1])
            nfcRefDialog.current.snapTo(1)
            requestPreviewMat(dataSplit[1])
        } catch (ex) {
            setLog(ex)
            console.log(ex)
            _cleanUp(ex);
        }
    }

    const nfcInit = () => {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        })
            .then(result => {
                setNfcSupport(true)
                console.log('start OK', result);
            })
            .catch(error => {
                console.log('Err' + error.message);
                setNfcSupport(false)
            })
    }


    useEffect(() => {
        nfcInit()
        if (previewShow) {
            if (isLoaded) {
                console.log('Load first')
                loadMatData()
            } else {
                console.log('show')
                previewRef.current.snapTo(0)
            }
            setShowPreview(false)
        }
    }, [previewShow])

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: color.white, flex: 1 }}>
                <Text style={{ marginTop: 30, marginBottom: ukuran.dp_30, textAlign: 'center' }}>
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} text={'MY '}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} tipe={'bold'} text={'NIRVANA '}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} text={'MAT'}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                </Text>
                <View style={{ width: ukuran.wpMatchParent, height: 1, backgroundColor: color.white_300 }} />
                <ScrollView showsVerticalScrollIndicator={false} pointerEvents={onDisableView}>
                    <View style={styleMat.parent}>
                        {isProgress && <CustomProgressBar isVisible={isProgress} />}
                        {isAddDialog && <ViewCustomDialog onDismiss={() => setAddDialog(false)} isVisible={isAddDialog} view={<DialogSelectInputMat onTapItClick={() => {

                            if (isNfcSupport) {
                                if (Platform.OS == 'android') {
                                    nfcRefDialog.current.snapTo(0)
                                    setDisableView('none')
                                }
                                readData()
                            } else {
                                showSnackBar('Device does not support for use this method')
                            }
                            setAddDialog(false)
                        }} onInputIDClick={() => {
                            addRef.current.snapTo(0)
                            setDisableView('none')
                            setAddDialog(false)
                        }} />} />}
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setAddDialog(true)
                                console.log(isAddDialog)
                            }} activeOpacity={0.5}>
                            <TextTitle fontSize={ukuran.dp_16} align={'right'} tipe={'bold'} text={'Add new mat +'}
                                maxLine={1} warna={color.redNirvana} bottom={ukuran.dp_18} />
                        </TouchableOpacity>
                        <LoadListMatData data={matDataLayout} onClick={id => requestPreviewMat(id)} />
                    </View>
                </ScrollView>
                {(matDataLayout.length > 0) ? null : <EmptyBoxLayout />}
                <BottomSheet
                    ref={addRef}
                    snapPoints={[290, 0, 0]}
                    enabledInnerScrolling={false}
                    onCloseEnd={() => setDisableView('')}
                    enabledContentGestureInteraction={true}
                    callbackNode={fall}
                    initialSnap={1}
                    renderContent={addSheetContent} />
                <BottomSheet
                    ref={nfcRefDialog}
                    snapPoints={[330, 0, 0]}
                    enabledInnerScrolling={false}
                    onCloseEnd={() => setDisableView('')}
                    enabledContentGestureInteraction={true}
                    callbackNode={fall}
                    initialSnap={1}
                    renderContent={nfcShow} />
                <BottomSheet
                    ref={previewRef}
                    snapPoints={['65%', 0, 0]}
                    enabledInnerScrolling={true}
                    borderRadius={30}
                    onCloseEnd={() => setDisableView('')}
                    enabledContentGestureInteraction={true}
                    callbackNode={fall}
                    initialSnap={1}
                    renderContent={previewContent} />
                <Animated.View
                    pointerEvents="none"
                    style={[
                        {
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: "#000",
                            opacity: animatedShadowOpacity,
                        },
                    ]}
                />
            </KeyboardAvoidingView>
        </>
    )
}

const styleMat = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center'
    },

})

export default MatLayout