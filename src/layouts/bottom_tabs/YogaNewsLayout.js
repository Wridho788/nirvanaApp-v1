import React from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import color from '../../material/color'
import ukuran from '../../material/dimen'
import UnderLineCustom from '../items/custom_underline'
import TopHomeBar from '../items/home_top'
import TextTitle from '../items/title_text'
import UnderlineLayout from '../items/underline_layout'
import NewsYoga from '../items/yoga_news_section/article_yoga_news'
import CategoryYogaNews from '../items/yoga_news_section/category_yoga_news'

const YogaNewsLayout = (props) => {

    return (
        <>
            <TopHomeBar navigasi={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styleNews.parent}>
                    <Text style={{ textAlign: 'center', marginBottom: ukuran.dp_24 }}>
                        <TextTitle text={'NIRVANA '} tipe={'bold'} fontSize={ukuran.dp_20} />
                        <TextTitle text={'YOGA SHALA'} fontSize={ukuran.dp_20} />
                    </Text>
                    <UnderLineCustom height={1} color={color.defaultColor} />
                    <View style={{ alignSelf: 'center', width: Platform.OS == 'ios' ? ukuran.wpPercent90 : null }}>
                        <View
                            style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: ukuran.dp_20, marginBottom: ukuran.dp_24 }}>
                            <CategoryYogaNews categoryName={'YOGA &\nHEALTH'} />
                            <CategoryYogaNews categoryName={'FIGUR'} />
                            <CategoryYogaNews categoryName={'KOMUNITAS'} />
                            <CategoryYogaNews categoryName={'VIDEO\nYOGA'} isLast={true}/>
                        </View>
                    </View>
                    <View
                        style={{ width: ukuran.wpPercent90, alignSelf: 'center', flexWrap: 'wrap', alignItems : 'center', flexDirection: 'row', marginBottom: ukuran.dp_24 }}>
                        <Text style={{ textAlign: 'center', marginEnd: ukuran.dp_10}}>
                            <TextTitle text={'NEW '} fontSize={ukuran.dp_20} />
                            <TextTitle text={'ARTICLE'} tipe={'bold'} fontSize={ukuran.dp_20} />
                        </Text>
                        <UnderLineCustom height={1} color={color.defaultColor} />
                    </View>
                    <NewsYoga />
                    <NewsYoga />
                    <NewsYoga />
                    <NewsYoga />
                    <NewsYoga />
                </View>
            </ScrollView>
        </>
    )
}

const styleNews = StyleSheet.create({
    parent: {
        marginTop: ukuran.dp_24,
    }
})

export default YogaNewsLayout