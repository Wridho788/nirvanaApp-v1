import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import { loadListNysData } from '../../services/load_list/load_nys_data'
import UnderLineCustom from '../items/custom_underline'
import TopHomeBar from '../items/home_top'
import TextTitle from '../items/title_text'
import UnderlineLayout from '../items/underline_layout'
import NewsYoga from '../items/yoga_news_section/article_yoga_news'
import CategoryYogaNews from '../items/yoga_news_section/category_yoga_news'

const YogaNewsLayout = (props) => {
    const [loadMore, setLoadMore] = useState(false)
    const [progress, setProgress] = useState(false)
    const [isLoaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [dataList, setData] = useState([])
    const [refreshing, setRefresing] = useState(false)
    const [totalData, setTotal] = useState(0)
    var dataArr = []

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }

     const onRefresh = useCallback(() => {
         setRefresing(true)
         console.log('ss')
         setData([])
         setPage(1)
         setLoaded(false)
     })

    useEffect(() => {
        if(!isLoaded){
            (async() =>{
                var dataMap = await loadListNysData(0, page, props.navigation, false)
                setTotal(dataMap.length)
                console.log(dataMap.length)
                dataArr=[]
                dataArr.push(dataList)
                dataArr.push(dataMap)
                setData(dataArr)
                setLoaded(true)
                setProgress(false)
                setRefresing(false)
            })()
        }
    }, [isLoaded])

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
            }  style={{backgroundColor:color.white}} showsVerticalScrollIndicator={false} bounces={true}  onScroll={({nativeEvent}) => {
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
                        <TextTitle text={'NIRVANA '} tipe={'bold'} fontSize={ukuran.dp_20} />
                        <TextTitle text={'YOGA SHALA'} fontSize={ukuran.dp_20} />
                    </Text>
                    <UnderLineCustom height={1} color={color.white_300} />
                        <View
                            style={{ flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', marginTop: ukuran.dp_20, marginBottom: ukuran.dp_40 }}>
                            <CategoryYogaNews uri={'https://source.unsplash.com/512x512/?health'} categoryName={strings.yogahealth} onPressed={e => props.navigation.navigate('TipsTrainingMain', {isNews: true, title: strings.yogahealth, id: 2})}/>
                            <CategoryYogaNews uri={'https://source.unsplash.com/512x512/?inspiration,people'}  categoryName={strings.figur} onPressed={e => props.navigation.navigate('TipsTrainingMain', {isNews: true, title: strings.figur, id: 3})}/>
                            <CategoryYogaNews uri={'https://source.unsplash.com/512x512/?community'}  categoryName={strings.komunitas} onPressed={e => props.navigation.navigate('TipsTrainingMain', {isNews: true, title: strings.komunitas, id: 5})}/>
                            <CategoryYogaNews  uri={'https://source.unsplash.com/512x512/?nature'} categoryName={strings.videoYoga} isLast={true} onPressed={e => props.navigation.navigate('TipsTrainingMain', {isNews: false, title: strings.videoYoga, id: 8})}/>
                        </View>
                    <View
                        style={{ width: ukuran.wpPercent90, alignSelf: 'center', flexWrap: 'wrap', alignItems : 'center', flexDirection: 'row', marginBottom: ukuran.dp_24 }}>
                        <Text style={{ textAlign: 'center', marginEnd: ukuran.dp_10}}>
                            <TextTitle text={'ARTIKEL '} fontSize={ukuran.dp_20} />
                            <TextTitle text={'BARU'} tipe={'bold'} fontSize={ukuran.dp_20} />
                        </Text>
                        <UnderLineCustom height={1} color={color.defaultColor} />
                    </View>
                    {dataList}
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
        </>
    )
}

const styleNews = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
        marginTop: ukuran.dp_24,
    }
})

export default YogaNewsLayout