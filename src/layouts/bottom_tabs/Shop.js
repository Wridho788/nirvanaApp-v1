'use strict'
import React, { useRef } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState} from 'react'
import color from '../../material/color'
import Constant from '../../material/constant'
import BottomSheet from 'reanimated-bottom-sheet'
import ukuran from '../../material/dimen'
import strings from '../../material/strings'
import CategoryData from '../../services/kategori_list_load'
import LoadProductData from '../../services/produk_list_load'
import { CircleProgressBar } from '../items/progress_bar'
import TextTitle from '../items/title_text'
import ShimmerData from '../items/shimmer_data'
import Animated from 'react-native-reanimated'
import CustomButton from '../button/default_button'
import CategoryText from '../items/category_text_layout'
import MatPopup from '../navigation/profile/mat/add_mat_popup'
import PopupFilter from '../items/filter_product_popup'
import GoTopButton from '../items/go_top_item'

const ShopLayout = (props) =>{
    const [page, setPage] = useState(1)
    const [progress, setProgress] = useState(false)
    const [isShimmer, setShimmer] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const [catData, setCatData] = useState([])
    var sRef = useRef()
    const [isGoTopShow, setGoTopShow] = useState(false)
    const [onDisableView, setDisableView] = useState('')
    const [categoryId, setCategory] = useState((props.route.params == undefined) ? '' : props.route.params.catid)
    const[data, setData] = useState(<LoadProductData type={strings.hightLightText} homepage={true} isLoaded={e=>setShimmer(e)} shop={true} dataget={count => setTotal(count)} url={Constant.shopProduct+1+'/?category='+categoryId} navigation={props.navigation} nextRoute={'DetailProduct'}/>)
    const [isLoaded, setLoaded] = useState(true)
    const [first, setFirst] = useState(false)
    const [totalData, setTotal] = useState(0)
    const [collectionid, setCollectionId] = useState('')
    var mapData = []
    var dataMap = []

    function loadByCategory(id) {
        setProgress(true)
        setData([])
        mapData = []
        dataMap = []
        setPage(1)
        setCategory(id)
        setLoaded(false)
    }



    

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }


     const addRef = useRef(null)
    const bottomSheetContent = () => {
        return (<PopupFilter data={catData}
            onSeAllClick={e => {
                setCollectionId(e)
                addRef.current.snapTo(1)
                loadByCategory('')
            }}
            clicked={e=> {
                setCollectionId('')
                addRef.current.snapTo(1)
                loadByCategory(e)
        }}/>)
    }
    
    let fall = new Animated.Value(1);
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    useEffect(()=>{
        props.navigation.addListener(
            //jika user focus ke halaman
            'focus',
            () =>{
                props.navigation.setOptions({headerShown:true})
            }
        )
        if(!isLoaded){
            (async() =>{
                for(let i = 0; i < page; i++){
                    mapData.push({
                        urlPage: Constant.shopProduct + page +'/?category=' + categoryId + '&collection=' + collectionid
                    })
                }
                dataMap = mapData.map(urlG => (
                    <LoadProductData  homepage={true} isLoaded={e=>setShimmer(e)} type={strings.hightLightText} shop={true} dataget={count => setTotal(count)} url={urlG.urlPage} navigation={props.navigation} nextRoute={'DetailProduct'}/>
                ))
                setData(dataMap)
                setLoaded(true)
                setProgress(false)
            })()
        }

    }, [isLoaded])


    return(
        <>
            <SafeAreaView style={{ backgroundColor: color.white, flex: 1 }}>
                {(!isShimmer) ? <ShimmerData/> : null}
                <ScrollView ref={sRef} showsVerticalScrollIndicator={false}  onScroll={({nativeEvent}) => {
                        if(nativeEvent.contentOffset.y > 1000){
                            setGoTopShow(true)
                        }else{
                            setGoTopShow(false)
                        }
                        if (isCloseToBottom(nativeEvent)) {
                            if(totalData > 0){
                                setLoadMore(false)
                            }else{
                                setLoadMore(true)
                            }
                        }
                        }}
                        scrollEventThrottle={16} pointerEvents={onDisableView}>
                    <View style={styleShop.parent}>
                        <View style={styleShop.categoryArea}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_18, marginBottom: ukuran.dp_24}}>
                                <CategoryText background={color.white} categoryName={strings.filter}  onpressed={e => {
                                    addRef.current.snapTo(0)
                                    setDisableView('none')
                                }}/>
                                <CategoryData dataCat={e => setCatData(e)} position={'Shop'} url={Constant.listCategory} selectId={id => {
                                    setCollectionId('')
                                    loadByCategory(id)
                                }}/>
                            </View>
                        </ScrollView>   
                        </View>
                        <View style={styleShop.gridProduct}>
                            {data}
                        </View>
                        {progress && <CircleProgressBar/>}
                        {!loadMore && <TouchableOpacity activeOpacity={0.5} onPress={() =>{
                            setProgress(true)
                            if(totalData > 0){
                                setPage(page+1)
                                setLoadMore(true)
                                setLoaded(false)
                            }else{
                                setLoadMore(true)
                            }
                        }}>
                            <TextTitle fontSize={ukuran.dp_14} align={'center'} tipe={'bold'} text={strings.load_more}
                                maxLine={1} warna={color.defaultColor} top={ukuran.dp_30} bottom={ukuran.dp_30}/>
                        </TouchableOpacity>}
                    </View>
                </ScrollView>
                <BottomSheet
                    ref={addRef}
                    snapPoints={['50%', 0, 0]}
                    enabledInnerScrolling={true}
                    onCloseEnd={() => setDisableView('')}
                    enabledContentGestureInteraction={true}
                    callbackNode={fall}
                    initialSnap={1}
                    borderRadius={10}
                    renderContent={bottomSheetContent}/>
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
                {isGoTopShow && <GoTopButton onpressed={e => sRef.current.scrollTo({y: 0, animated: true})}/>}   
            </SafeAreaView>
        </>
    )
}

const styleShop = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
    },

    categoryArea: {
        backgroundColor: color.defaultColor,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    gridProduct: {
        flexWrap:'wrap',
        flexDirection: 'row',
        marginBottom: ukuran.dp_16,
    },


    
})

export default ShopLayout