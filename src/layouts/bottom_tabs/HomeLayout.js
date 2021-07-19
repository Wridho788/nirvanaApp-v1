import React, { Component, createRef } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
  } from 'react-native';
import textStyle from '../../values/textStyle'
import strings from '../../material/strings'
import CustomButton from '../button/default_button'
import ukuran from '../../material/dimen';
import { ScrollView } from 'react-native-gesture-handler';
import color from '../../material/color';
import Constant from '../../material/constant'
import LoadProductData from '../../services/produk_list_load';
import CategoryData from '../../services/kategori_list_load';
import { getTokenData } from '../../services/account_process';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache'
import Shimmer from 'react-native-shimmer'
import ShimmerData from '../items/shimmer_data';
import GoTopButton from '../items/go_top_item';
export default class HomeLayout extends Component{
    constructor(props){
        super(props)
        this.sRef = createRef()
        this.state = {
            isLoaded: false,
            isGoTopShow: false
        }
    }

    componentDidUpdate(){
        this.props.navigation.addListener(
            //jika user focus ke halaman
            'focus',
            () =>{
                this.props.navigation.setOptions({headerShown:true})
            },
            'state',
            () =>{
                this.props.navigation.setOptions({headerShown:false})
            },
        )
    }

    keCoupon() {
        (async ()=> {
            var tokenData = await getTokenData()
            if(tokenData != null ){
                this.props.navigation.navigate('CouponLayout')
            }else{
                this.props.navigation.navigate('Profile')
            }
        })()
    }

    render(){
        return(
            <SafeAreaView style={{backgroundColor: color.white, flex: 1}}>     
                  {(!this.state.isLoaded) ? <ShimmerData/> : null}
                    <ScrollView ref={this.sRef} scrollEventThrottle={16} contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: color.white}} showsVerticalScrollIndicator={false} onScroll={({nativeEvent}) => {
                        if(nativeEvent.contentOffset.y > 1000){
                            this.setState({isGoTopShow: true})
                        }else{
                            this.setState({isGoTopShow: false})
                            
                        }
                    }}>
                    <View>
                    <Video source={{uri: convertToProxyURL(strings.imageMainBase + strings.homeVideoUrl)}}
                     style={{height: 200, width: ukuran.wpMatchParent}} repeat={true} resizeMode="cover"/>
                    <TouchableOpacity
                            underlayColor={color.white}
                            onPress={()=> this.keCoupon()}>
                        <Text style={textStyle.redBoldText}>{strings.seeCoupon}</Text>
                        </TouchableOpacity>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_18, marginBottom: ukuran.dp_24}}>
                                <CategoryData position={strings.homeData} url={Constant.listCategory} navigation={this.props.navigation}/>
                            </View>
                        </ScrollView>
                        <Text style={textStyle.titleBoldStye}>{strings.hightLightText.toUpperCase()}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_8,  marginBottom: ukuran.dp_18}}>
                                <LoadProductData homepage={true} isLoaded={e => this.setState({isLoaded: e})} type={strings.hightLightText} url={Constant.highlightProduct} navigation={this.props.navigation}  nextRoute={'DetailProduct'}/>
                            </View>
                        </ScrollView>
                        <CustomButton
                            width={'wrap'}
                            backgroundColor={color.defaultColor}
                            text={strings.shopNow}
                            onpressed={() => this.props.navigation.navigate('Shop')}
                            />
                        <Text style={textStyle.titleBoldStye}>{strings.yogaMat.toUpperCase()}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_8,  marginBottom: ukuran.dp_18}}>
                                <LoadProductData type={strings.homeData} url={Constant.homeProduct} keya={strings.yogaMat} navigation={this.props.navigation}  nextRoute={'DetailProduct'}/>
                            </View>
                        </ScrollView>
                        <CustomButton
                            width={'wrap'}
                            backgroundColor={color.defaultColor}
                            onpressed={() => this.props.navigation.navigate('Shop')}
                            text={strings.viewMore}/>
                        <Text style={textStyle.titleBoldStye}>{strings.apparel.toUpperCase()}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row',  marginStart: ukuran.dp_8, marginBottom: ukuran.dp_18}}>
                                <LoadProductData  type={strings.homeData} url={Constant.homeProduct} keya={strings.apparel} navigation={this.props.navigation}  nextRoute={'DetailProduct'}/>
                            </View>
                        </ScrollView>
                        <CustomButton
                            width={'wrap'}
                            backgroundColor={color.defaultColor}
                            onpressed={() => this.props.navigation.navigate('Shop')}
                            text={strings.viewMore}/> 
                        <Text style={textStyle.titleBoldStye}>{strings.accesories.toUpperCase()}</Text>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View
                            style={{flexWrap:'wrap', flexDirection: 'row', marginStart: ukuran.dp_8, marginBottom: ukuran.dp_18}}>
                                <LoadProductData type={strings.homeData} url={Constant.homeProduct} keya={strings.accesories} navigation={this.props.navigation}  nextRoute={'DetailProduct'}/>
                            </View>
                        </ScrollView>
                        <CustomButton
                            width={'wrap'}
                            backgroundColor={color.defaultColor}
                            onpressed={() => this.props.navigation.navigate('Shop')}
                            text={strings.viewMore}/>      
                    </View> 
                </ScrollView>
                
                {this.state.isGoTopShow && <GoTopButton onpressed={e => {
                    this.sRef.current.scrollTo({y: 0, animated: true})}}/>}   
            </SafeAreaView>
        )
    }
}