'use strict'

import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import React from 'react'
import color from "../../material/color"
import BackArrow from '../../icons/arrow.svg'
import TextTitle from "./title_text"
import ukuran from "../../material/dimen"
import strings from "../../material/strings"

const BlankHeader = (props) => {

    return (
        <>
            <View style={styleHeader.parent}>
                <View style={styleHeader.parentBack}>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignSelf: 'center'}}>
                                <BackArrow fill={color.white} />
                            </View>
                            <TextTitle fontSize={ukuran.dp_16} tipe={'bold'} text={strings.back} warna={color.white} start={ukuran.dp_10} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    textAlign: 'right',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                </View>
            </View>
        </>
    )

}

export default BlankHeader

const styleHeader = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        padding: ukuran.dp_24,
        flexDirection: 'row'
    },

    parentBack: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    }
}) 