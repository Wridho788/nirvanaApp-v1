import React, { Component, useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Linking,
  } from 'react-native';
import color from '../../material/color';
import ukuran from '../../material/dimen';
import strings from '../../material/strings';
import TextTitle from '../items/title_text';
import {Table, Row} from 'react-native-table-component'
import Clock from '../../icons/clock_history'
import Cancel from '../../icons/close'
import Box from '../../icons/packing'
import Complete from '../../icons/complete'
import UnderlineLayout from '../items/underline_layout';
import { ConfirmationDialog, CustomProgressBar } from '../items/progress_bar';
import { getTokenData, loadProgressUser, loadUserData } from '../../services/account_process';
import moment from 'moment';
import Constant from '../../material/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { capitalize, showSnackBar } from '../../functions/helper';
import ClassProgress from '../items/class_progress_item';
import { getStatusDataOrder } from '../../services/load_list/load_order_status';


const ProfileLayout = (props) => {

    
    const [progress, setProgress] = useState(true)
    const [isSignout, setSignout] = useState(false)
    const [nama, setNama] = useState('')
    const [birthday, setBirtday] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [needPoint, setNeedPoint] = useState('')
    const [nextPointReq, setNextPointReq] = useState('')
    const [classname, setClass] = useState('')
    const [nextClass, setNextClass] = useState('')
    const [idClass, setIdClass] = useState(0)
    const [progressPoint, setProgressPoint] = useState('')
    const [point, setPoint] = useState('')
    const [phone, setPhone] = useState('')
    const [totalWaiting,setTotalWaiting] = useState(0)
    const [totalProgress, setTotalProgress] = useState(0)

    const dataName = [setTableText(strings.nama), setTableText(strings.titik2) ,setTableText(nama)]
    const dataDateBirth = [setTableText(strings.date_of_birth), setTableText(strings.titik2) ,setTableText(birthday)]
    const dataGender = [setTableText(strings.gender), setTableText(strings.titik2) ,setTableText(`${capitalize(gender)}`)]
    const dataEmail = [setTableText(strings.email), setTableText(strings.titik2) ,setTableText(email)]
    const dataPhone = [setTableText(strings.phone), setTableText(strings.titik2) ,setTableText(phone)]

    function setTableText(text){
        return <TextTitle warna={color.black} text={text} transform={'none'}/>
    }

    function prosesKeluar(){
        setSignout(false)
        AsyncStorage.setItem('tokenLogin', '')
        props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}]
        })
        showSnackBar(strings.sign_out_success)
    }

    function fetchUserData(data, userProg) {
        setNama(data.full_name)
        setBirtday(moment(data.birthdate).format('DD MMMM YYYY'))
        setGender(String(data.gender))
        setEmail(data.email)
        setIdClass(data.classid)
        setPhone(data.phone)
        setPoint(data.point + ' points')
        setNextClass(userProg.nextClass)
        setProgressPoint(data.progress)
        setNeedPoint(userProg.progress)
        setNextPointReq(userProg.nextRequired)
        setClass(userProg.currentClass)
    }

        useEffect(() =>{
            (async ()=> {
                props.navigation.addListener(
                    //jika user focus ke halaman
                    'focus',
                    () =>{
                        props.navigation.setOptions({headerShown:true})
                    }
                )
                var tokenUser = await getTokenData()
                if(tokenUser != null){
                    var data = await loadUserData(tokenUser)
                    var userProg = await loadProgressUser(data, tokenUser)
                    var orderWaiting = await getStatusDataOrder(1)
                    var orderProgress = await getStatusDataOrder(2)
                    setTotalWaiting(orderWaiting.length)
                    setTotalProgress(orderProgress.length)
                    fetchUserData(data, userProg)

                }else{
                    //props.navigation.navigate('Login')
                    props.navigation.reset({
                        index: 1,
                        routes: [{name: 'Login'}]
                    })
                }
                setProgress(false)
            })()
        }, [null])

        return(
            
            <SafeAreaView style={{backgroundColor:color.white}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:color.white}}>
                    <View style={styleProfile.parent}>
                        {progress && (<CustomProgressBar isVisible={progress}/>)}
                        {isSignout && (<ConfirmationDialog isVisible={isSignout} message={strings.signout_confirmation_message} onClick={()=> prosesKeluar()}
                            onDismiss={() => setSignout(false)}
                        />)}
                        <View style={styleProfile.firstPoint}>
                            <View style={styleProfile.imageProfile}>
                                <Text style={{color: color.white, fontSize: ukuran.dp_22}}>
                                    {String(nama).charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <TextTitle fontSize={ukuran.dp_18} tipe={'normal'} text={nama} bottom={ukuran.dp_16}/>
                            <TextTitle fontSize={ukuran.dp_14} tipe={'normal'} text={email} bottom={ukuran.dp_24}/>
                            <TextTitle fontSize={ukuran.dp_14} tipe={'bold'} text={point} bottom={ukuran.dp_24}
                                warna={color.levelColor}/>
                        </View>
                        <View style={styleProfile.secondPoint}>
                            <TextTitle fontSize={ukuran.dp_18} tipe={'bold'} text={strings.profile_information} bottom={ukuran.dp_24}/>
                            <Table>
                                <Row data={dataName} widthArr={[110,10,260]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={dataDateBirth}  widthArr={[110,10,260]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={dataGender}  widthArr={[110,10,260]} style={{marginBottom: ukuran.dp_16}}/>
                            </Table>
                        </View>
                        <View style={styleProfile.secondPoint}>
                            <TextTitle fontSize={ukuran.dp_18} tipe={'bold'} text={strings.contact} bottom={ukuran.dp_24}/>
                            <Table>
                                <Row data={dataEmail} widthArr={[110,10,260]} style={{marginBottom: ukuran.dp_16}}/>
                                <Row data={dataPhone}  widthArr={[110,10,260]} style={{marginBottom: ukuran.dp_40}}/>
                            </Table>
                        </View>
                        <ClassProgress classid={idClass} class={classname} nowPoint={progressPoint} need={nextPointReq} progress={needPoint} next={nextClass}/>
                        <View style={styleProfile.statusOrderView}>
                            <StatusOrder showBadge={(totalWaiting> 0) ? true : false} badgeTotal={totalWaiting} icon={<Clock/>} status={strings.waiting} onpressed={e=>props.navigation.navigate('Order', {screen: 'OrderData', params:{
                                index: 0
                            }})}/>
                            <View style={styleProfile.lineIcon}/>
                            <StatusOrder icon={<Box/>} showBadge={(totalProgress> 0) ? true : false} badgeTotal={totalProgress} status={strings.packing}  onpressed={e=>props.navigation.navigate('Order', {screen: 'OrderData', params:{
                                index: 1
                            }})}/>
                            <View style={styleProfile.lineIcon}/>
                            <StatusOrder icon={<Complete/>} status={strings.complete}  onpressed={e=>props.navigation.navigate('Order', {screen: 'OrderData', params:{
                                index: 2
                            }})}/>
                            <View style={styleProfile.lineIcon}/>
                            <StatusOrder icon={<Cancel/>} status={strings.canceled_order}  onpressed={e=>props.navigation.navigate('Order', {screen: 'OrderData', params:{
                                index: 3
                            }})}/>
                        </View>
                        <View style={{marginBottom: ukuran.dp_30}}>
                            {/* <UnderlineLayout/>
                            <LinkLayout text={strings.mymat} onpressed={()=>{
                                props.navigation.navigate('MyMat')
                                }}/> */}
                            <UnderlineLayout/>
                            <LinkLayout text={strings.myAddress} onpressed={()=>{
                                props.navigation.navigate('MyAddress')
                                props.navigation.setOptions({headerShown:false})
                                }}/>
                            <UnderlineLayout/>
                            <LinkLayout text={strings.mySecurity} onpressed={()=>{
                                props.navigation.navigate('ChangePassword')
                                }}/>
                            <UnderlineLayout/>
                            <LinkLayout text={strings.signOut} onpressed={()=>{
                                setSignout(true)
                                }}/>
                            <UnderlineLayout/>
                        </View>
                        <View style={{width: ukuran.wpPercent90, alignSelf: 'center', marginBottom: ukuran.dp_24}}>
                            <TextTitle fontSize={ukuran.dp_16} text={strings.customer_care} tipe={'bold'}/>
                            <View style={{marginTop: ukuran.dp_24}}/>
                            <UnderlineLayout/>
                            <LinkLayout text={strings.contactUs}
                                onpressed={() =>{
                                    Linking.openURL(Constant.contactNumber)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.faqs}
                                onpressed={() =>{
                                    Linking.openURL(Constant.faqsUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.aboutUs}
                                onpressed={() =>{
                                    Linking.openURL(Constant.aboutUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.shippingInfo}
                                onpressed={() =>{
                                    Linking.openURL(Constant.shippingInfoUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.sizeGuide}
                                onpressed={() =>{
                                    Linking.openURL(Constant.sizeGuideUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.termCondition}
                                onpressed={() =>{
                                    Linking.openURL(Constant.termUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.privacyPolicy}
                                onpressed={() =>{
                                    Linking.openURL(Constant.privacyUrl)
                                }}
                            />
                            <UnderlineLayout/>
                            <LinkLayout text={strings.disclaimer}
                                onpressed={() =>{
                                    Linking.openURL(Constant.disclaimerUrl)
                                }}
                            />
                            <UnderlineLayout/>
                        </View>
                    </View>
                </ScrollView>    
            </SafeAreaView>
        )
}

const StatusOrder = (props) =>{
    var totalBadge = (props.badgeTotal > 9) ? "9+" : props.badgeTotal
    return(
        <TouchableOpacity
            onPress={props.onpressed}>
            <View style={styleProfile.itemIcon}>
                {props.showBadge && 
                    <View style={styleProfile.badge}>
                            <Text style={styleProfile.badgetext}>{totalBadge}</Text>
                    </View>
                }
                {props.icon}
                <TextTitle fontSize={ukuran.dp_10} tipe={'normal'} text={props.status} top={ukuran.dp_8} align={'center'}/>
            </View>
        </TouchableOpacity>
    )
}

const LinkLayout = (props) =>{
    return (
        <TouchableOpacity style={{width: ukuran.wpPercent90, alignSelf: 'center'}}
            onPress={props.onpressed}>
            <View style={styleProfile.linkLayout}>
                <TextTitle fontSize={ukuran.dp_14} text={props.text} tipe={'normal'}/> 
            </View>
        </TouchableOpacity>
    )
}

export default ProfileLayout

const styleProfile = StyleSheet.create({
    parent: {
        backgroundColor: color.white,
    },

    secondPoint: {
        marginStart: ukuran.dp_20,
        width: ukuran.wpPercent90,
    },

    firstPoint: {
        marginTop: ukuran.dp_40,
        width: ukuran.wpPercent90,
        alignSelf: 'center',
        alignItems: 'center'
    },

    statusOrderView: {
        width: ukuran.wpPercent90,
        shadowColor: color.white_300,
        shadowOpacity: 0.5,
        shadowOffset: {width: 1, height:1},
        backgroundColor: color.white,
        marginBottom: ukuran.dp_40,
        flexWrap: 'wrap',
        justifyContent: 'center',
        elevation: 3,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: ukuran.dp_10,
    },

    linkLayout: {
        flexDirection: 'row',
        backgroundColor: color.white,
        marginTop: ukuran.dp_16,
        marginBottom: ukuran.dp_16
    },
    badge: {
        position: 'absolute',
        zIndex: 99,
        borderRadius: 9/2,
        color: color.white,
        right: 0,
        backgroundColor: color.redNirvana
    },

    badgetext: {
        paddingEnd: 3,
        paddingStart: 3,
        paddingTop: 1,
        paddingBottom: 1,
        fontSize: 9,
        color: color.white,
    },

    lineIcon: {
        width: 1,
        margin: ukuran.dp_10,
        backgroundColor: color.defaultColor,
    },

    itemIcon: {
        alignSelf: 'baseline',
        alignItems: 'center',
        margin: ukuran.dp_10,
    },

    imageProfile: {
        width: ukuran.dp_80,
        marginBottom: ukuran.dp_24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ukuran.dp_80/2,
        height: ukuran.dp_80,
        backgroundColor: color.blue_profile
    }
})