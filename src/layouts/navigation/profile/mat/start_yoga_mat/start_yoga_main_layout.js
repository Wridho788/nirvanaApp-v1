import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import color from '../../../../../material/color'
import ukuran from '../../../../../material/dimen'
import strings from '../../../../../material/strings'
import TextTitle from '../../../../items/title_text'
import PreviewMat from '../preview_mat_popup'

const MatYogaStart = (props) => {


    var matData = props.route.params.matData
    

    return (
        <>
            <View style={{ flex: 1, backgroundColor: color.white }}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={styleMain.parent}>
                        <TextTitle fontSize={ukuran.dp_18} align={'center'}text={strings.mynirvanamat.toLocaleUpperCase()}
                            maxLine={1} warna={color.defaultColor} bottom={ukuran.dp_24} top={ukuran.dp_14} />
                        <PreviewMat onBackPressed={() => props.navigation.goBack()} matData={matData}
                            onProgressPress={e => console.log('with instruc')}
                            onStartPress={e=> {
                                
                                props.navigation.navigate('PageTraining', {codeMat: matData.code})
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