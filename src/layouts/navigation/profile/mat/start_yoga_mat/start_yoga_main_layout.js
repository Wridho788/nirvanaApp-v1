import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import color from '../../../../../material/color'
import ukuran from '../../../../../material/dimen'
import strings from '../../../../../material/strings'
import TextTitle from '../../../../items/title_text'
import UnderlineLayout from '../../../../items/underline_layout'
import PreviewMat from '../preview_mat_popup'

const MatYogaStart = (props) => {


    var matData = props.route.params.matData


    return (
        <>
            <View style={{ flex: 1, backgroundColor: color.white }}>

                <Text style={{marginTop: 30, marginBottom: ukuran.dp_30, textAlign: 'center'}}>
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} text={'MY '}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} tipe={'bold'} text={'NIRVANA '}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                    <TextTitle fontSize={ukuran.dp_18} align={'center'} text={'MAT'}
                        maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={40} />
                </Text>
                <View style={{ width: ukuran.wpMatchParent, height: 1, backgroundColor: color.white_300 }} />
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={styleMain.parent}>
                        <PreviewMat onBackPressed={() => props.navigation.goBack()} matData={matData}
                            onProgressPress={e => {

                                props.navigation.navigate('PageTraining', { codeMat: matData.code, withOur: true })
                            }}
                            onStartPress={e => {

                                props.navigation.navigate('PageTraining', { codeMat: matData.code, withOur: false })
                            }}
                            onProgressText={'With our Instructor'} onStartText={'Start on Your Own'} nav={props.navigation} />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styleMain = StyleSheet.create({
    parent: {
    }
})

export default MatYogaStart