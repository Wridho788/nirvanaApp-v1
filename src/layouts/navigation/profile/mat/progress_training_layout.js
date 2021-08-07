import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import strings from '../../../../material/strings'
import { loadTrainingProgreessData } from '../../../../services/load_list/load_training_progress_data'
import UnderLineCustom from '../../../items/custom_underline'
import TextTitle from '../../../items/title_text'
import ProgressInputTraining from '../../../items/training_mat_section/progress_input_data'


const ProgressTrainingLayout = (props) => {
    const [loadMore, setLoadMore] = useState(false)
    const [progress, setProgress] = useState(false)
    const [isLoaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [dataList, setData] = useState([])
    const [totalData, setTotal] = useState(0)
    var dataArr = []
    var matCode = props.route.params.matCode
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }

    useEffect(() => {
        if(!isLoaded){
            (async() =>{
                var dataMap = []
                dataMap = await loadTrainingProgreessData(page, matCode)
                setTotal(dataMap.length)
                dataArr=[]
                dataArr.push(dataList)
                dataArr.push(dataMap)
                setData(dataArr)
                setLoaded(true)
                setProgress(false)
            })()
        }
    }, [isLoaded])
    return(
        <>
           <View style={{backgroundColor: color.white, flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}  onScroll={({nativeEvent}) => {          
                        if (isCloseToBottom(nativeEvent)) {
                            if(totalData > 0){
                                setLoadMore(false)
                            }else{
                                setLoadMore(true)
                            }
                        }
                        }} scrollEventThrottle={16}>
                <View style={styleNews.parent}>
                    <Text style={{ textAlign: 'center', marginBottom: ukuran.dp_24 }}>
                        <TextTitle text={'Histories'} tipe={'bold'} fontSize={ukuran.dp_20} />
                    </Text>
                    <UnderLineCustom height={1} color={color.white_300} />
                        <View
                            style={{ justifyContent: 'center', marginBottom: ukuran.dp_20 }}>
                            {dataList}
                        </View>
                    {!loadMore && <TouchableOpacity activeOpacity={0.5} onPress={() =>{
                            setProgress(true)
                            if(totalData> 0){
                                setPage(page+1)
                                setLoadMore(true)
                                setLoaded(false)
                            }else{
                                setLoadMore(true)
                            }
                        }}>
                            <TextTitle fontSize={ukuran.dp_14} align={'center'} tipe={'bold'} text={strings.load_more}
                                maxLine={1} warna={color.defaultColor} top={ukuran.dp_20} bottom={ukuran.dp_30}/>
                        </TouchableOpacity>}
                </View>
            </ScrollView>
            </View>
        </>
    )
}

const styleNews = StyleSheet.create({
    parent: {
        marginTop: 24
    }
})

export default ProgressTrainingLayout