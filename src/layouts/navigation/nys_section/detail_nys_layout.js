import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import color from '../../../material/color'
import ukuran from '../../../material/dimen'
import TextTitle from '../../items/title_text'
import MarkDown from 'react-native-markdown-display'
import UnderLineCustom from '../../items/custom_underline'
import NewsYoga from '../../items/yoga_news_section/article_yoga_news'
import { useState } from 'react/cjs/react.development'
import LoadingAnimationLayout from '../../items/loading_animation'
import { loadDetailNys, loadListNysData, loadVideoDataNys } from '../../../services/load_list/load_nys_data'
import TipsCategoryData from '../../items/yoga_news_section/tips_training_nys'


const DetailNysLayout = (props) => {
    var permalink = props.route.params.permalink
    const [isLoaded, setLoaded] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [moreData, setMoreData] = useState([])
    useEffect(() => {
        if(!isLoaded){
            (async () => {
                var detailData = await loadDetailNys(permalink)
                setDataDetail({
                    title: detailData.title,
                    shortDesc: detailData.shortDesc,
                    thumbnail: detailData.cover.url,
                    content: detailData.content,
                    isVideo: detailData.isVideo,
                    videoLink: detailData.video_link
                })
                if(detailData.isVideo){
                    var list = await loadVideoDataNys(0,1,props.navigation, true)
                    setMoreData(list)
                }else{
                    var list = await loadListNysData(0,1,props.navigation, true)
                    setMoreData(list)
                }
                setLoaded(true)
            })()
        }
    }, [isLoaded])
    if(!isLoaded){
        return <LoadingAnimationLayout/>
    }

    return(
        <>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styleDetail.parent}> 
                    <TextTitle align={'center'} maxLine={99} text={dataDetail.title} tipe={'bold'} top={ukuran.dp_30} fontSize={ukuran.dp_20} start={ukuran.dp_10} end={ukuran.dp_10} />
                    <TextTitle align={'center'} maxLine={99} warna={color.white_100} text={dataDetail.shortDesc} top={ukuran.dp_16} fontSize={ukuran.dp_12} start={ukuran.dp_10} end={ukuran.dp_10} />
                    {(dataDetail.isVideo != null) ? 
                        <FastImage
                        style={styleDetail.image}
                        resizeMode="cover"
                        source={{uri: dataDetail.thumbnail}}/>
                        :
                        <FastImage
                            style={styleDetail.image}
                            resizeMode="cover"
                            source={{uri: dataDetail.thumbnail}}/>
                    }
                    <MarkDown style={markdownStyle}>
                        {
                            dataDetail.content
                        }
                    </MarkDown>
                    <View
                        style={{marginEnd: ukuran.dp_10, marginTop: ukuran.dp_24, marginStart: ukuran.dp_10, alignSelf: 'center', flexWrap: 'wrap', alignItems : 'center', flexDirection: 'row', marginBottom: ukuran.dp_24 }}>
                        <Text style={{ textAlign: 'center', marginEnd: ukuran.dp_10}}>
                            <TextTitle text={'ARTIKEL '} tipe={'bold'} fontSize={ukuran.dp_20} />
                            <TextTitle text={'BARU'} fontSize={ukuran.dp_20} />
                        </Text>
                        <UnderLineCustom height={1} color={color.defaultColor} />
                    </View>   
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_10, marginBottom: ukuran.dp_24}}>
                                 {moreData}
                            </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </>
    )
}

const markdownStyle = StyleSheet.create({
    body:{
        marginStart: ukuran.dp_10,
        marginEnd: ukuran.dp_10,
    },
    text: {
        color: color.defaultColor,
        fontFamily: 'Montserrat'
    },
    strong : {
        color: color.white,
        fontFamily: 'Montserrat'
    },

    code_block: {
        fontFamily: 'Montserrat',
        backgroundColor: color.white,
        color: color.white_100,
        textAlign: 'center',
        marginEnd: 30,
        borderColor: color.white
    },
})

const styleDetail = StyleSheet.create({
    parent: {
        backgroundColor: color.white
    },

    image: {
        flex: 1,
        marginTop: ukuran.dp_24,
        height: 240,
        
    },
})

export default DetailNysLayout