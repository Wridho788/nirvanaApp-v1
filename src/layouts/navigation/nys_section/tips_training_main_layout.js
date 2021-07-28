import React, { useEffect } from 'react'
import { useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import strings from '../../../material/strings'
import { loadListNysData, loadVideoDataNys } from '../../../services/load_list/load_nys_data'
import UnderLineCustom from '../../items/custom_underline'
import TextTitle from '../../items/title_text'
import NewsYoga from '../../items/yoga_news_section/article_yoga_news'
import TipsCategoryData from '../../items/yoga_news_section/tips_training_nys'

const TipsTrainingMain = (props) => {
    console.log(props.route.params.isNews)
    var isNews = props.route.params.isNews
    var title = props.route.params.title.replace('\n', ' ')
    var id = props.route.params.id
    const [loadMore, setLoadMore] = useState(true)
    const [progress, setProgress] = useState(false)
    const [isLoaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [dataList, setData] = useState([])
    const [totalData, setTotal] = useState(0)
    var dataArr = []

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }

    useEffect(() => {
        if(!isLoaded){
            (async() =>{
                var dataMap = []
                if(isNews){
                    dataMap = await loadListNysData(id, page, props.navigation, false)
                }else{
                    dataMap = await loadVideoDataNys(id, page, props.navigation, false)
                }
                setTotal(dataMap.length)
                console.log(dataMap.length)
                dataArr=[]
                dataArr.push(dataList)
                dataArr.push(dataMap)
                setData(dataArr)
                setLoaded(true)
                setProgress(false)
            })()
        }
    }, [isLoaded])
    return (
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
                        <TextTitle text={title} tipe={'bold'} fontSize={ukuran.dp_20} />
                    </Text>
                    <UnderLineCustom height={1} color={color.defaultColor} />
                    <View
                        style={{ marginEnd: ukuran.dp_10, marginTop: ukuran.dp_24, marginStart: ukuran.dp_10, alignSelf: 'center', flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', marginBottom: ukuran.dp_24 }}>
                        <Text style={{ textAlign: 'center', marginEnd: ukuran.dp_10 }}>
                            <TextTitle text={isNews ? 'ARTIKEL ' : 'VIDEO '} tipe={'bold'} fontSize={ukuran.dp_18} />
                            <TextTitle text={'TERBARU'} fontSize={ukuran.dp_18} />
                        </Text>
                        <UnderLineCustom height={1} color={color.defaultColor} />
                    </View>
                    { !isNews ?
                        <View
                            style={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', marginBottom: ukuran.dp_20 }}>
                            {dataList}
                        </View>
                        :
                        dataList
                    }
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
export default TipsTrainingMain