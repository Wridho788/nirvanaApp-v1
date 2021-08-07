import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeLayout from './HomeLayout';
import Profile from './Profile'

import Home from '../../icons/home_alt_outline.svg'
import ShopIcon from '../../icons/tag-outline.svg'
import User from '../../icons/user.svg'

import { StatusBar, View } from 'react-native';
import color from '../../material/color';
import ukuran from '../../material/dimen';
import { StackActions } from '@react-navigation/routers';
import DeatailProduct from '../navigation/detail_product_layout';
import { createStackNavigator } from '@react-navigation/stack';
import LoginLayout from '../navigation/login_layout';
import TopHomeBar from '../items/home_top';
import RegisterLayout from '../navigation/register_layout';
import { getTokenData } from '../../services/account_process';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackTopHeader from '../items/back_top_header';
import ListAddressLayout from '../navigation/profile/list_user_address';
import AddNewAddressLayout from '../navigation/profile/add_new_address_layout';
import CartLayout from '../navigation/cart_layout';
import CheckoutLayout from '../navigation/payment_section/checkout_layout';
import PaymentLayout from '../navigation/payment_section/payment_layout';
import MainLayoutOrder from '../navigation/profile/order/order_main_layout'
import WebViewMidtrans from '../navigation/payment_section/webview_midtrans';
import InvoiceLayout from '../navigation/profile/order/invoice_layout';
import CouponLayout from '../navigation/coupon_layout';
import ChangePassword from '../navigation/profile/change_password';
import MatLayout from '../navigation/profile/mat/mat_main_layout';
import ShopLayout from './Shop';
import SplashLayout from '../navigation/splash_screen_layout';
import OtpVerifLayout from '../navigation/otp_verification_layout';
import styleData from '../../values/style';
import FirstLayout from '../navigation/first_layout';
import { verticalAnimation } from '../../functions/helper';
import MatIcon from '../../icons/yogamat.svg'
import NewsIcon from '../../icons/nys.svg'
import MyMatLayout from './MyMatLayout';
import YogaNewsLayout from './YogaNewsLayout';
import DetailNysLayout from '../navigation/nys_section/detail_nys_layout';
import TipsTrainingMain from '../navigation/nys_section/tips_training_main_layout';
import MatYogaStart from '../navigation/profile/mat/start_yoga_mat/start_yoga_main_layout';
import PageTraining from '../navigation/profile/mat/start_yoga_mat/page_training_layout';
import BlankHeader from '../items/blank_header';
import ProgressInputTraining from '../items/training_mat_section/progress_input_data';
import ProgressTrainingLayout from '../navigation/profile/mat/progress_training_layout';

const Tab = createBottomTabNavigator()

const IconBottom = (props) => {
    const { color, focused } = props.data
    let colorSelected = focused ? color : color.defaultColor
    return (
        <View>
            <props.image
                width="18"
                height="18"
                fill={colorSelected} />
        </View>
    )
}
const Stack = createStackNavigator()
export default class Router extends Component {

    constructor() {
        super()
        this.state = {
            tokenLogin: ''
        }
    }


    HomeData = () => {
        return (
            <Stack.Navigator>
            
                <Stack.Screen name="Rumah" component={HomeLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="DetailProduct" component={DeatailProduct} options={{ headerShown: false }} />

                <Stack.Screen name="Cart" component={CartLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="Checkout" component={CheckoutLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="Payment" component={PaymentLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="MidtransPage" component={WebViewMidtrans} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Tab.Screen name="Shop" component={this.ShopData}
                        options={{
                          headerShown: false,  
                        tabBarIcon: (props) => (
                        <IconBottom data={props} image={ShopIcon} />
                        )
                }} />
                <Stack.Screen name="CouponLayout" component={CouponLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
            </Stack.Navigator>
        )
    }

    AfterLoginData = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="MyProfile" component={Profile} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="MyAddress" component={ListAddressLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="MyMat" component={MatLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="AddNewAddress" component={AddNewAddressLayout} options={{ headerShown: false }} />
                
                <Stack.Screen name="OtpVerif" component={OtpVerifLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginLayout} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    ProfileData = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ProfileLogin" component={this.AfterLoginData} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    NysData = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name="NysHome" component={YogaNewsLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="DetailNys" component={DetailNysLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="TipsTrainingMain" component={TipsTrainingMain} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
            </Stack.Navigator>
        )
    }

    ShopData = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Shoping" component={ShopLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="DetailProduct" component={DeatailProduct} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    MatData = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="MyMatList" component={MyMatLayout} options={({ navigation }) => ({
                    header: () => (<TopHomeBar navigasi={navigation} />)
                })} />
                <Stack.Screen name="StartYogaMatMain" component={MatYogaStart} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />

                <Stack.Screen name="MatTrainingProgress" component={ProgressTrainingLayout} options={({ navigation }) => ({
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
            </Stack.Navigator>
        )
    }

    HomeWithBottomTab = () => {
        return (
             
            <Tab.Navigator
                initialRouteName="Home"
                sceneContainerStyle={{backgroundColor: color.white}}
                tabBarOptions={{
                    activeTintColor: color.defaultColor,        
                    inactiveTintColor: color.defaultColor,
                    tabStyle: {
                        paddingBottom: ukuran.dp_8
                    }
                }}
            >
                <Tab.Screen name="Home" component={this.HomeData} options={{
                    tabBarIcon: (props) => (
                        <IconBottom data={props} image={Home} />
                    ),

                }} />
                <Tab.Screen name="Shop" component={this.ShopData}
                    options={{
                        tabBarIcon: (props) => (
                            <IconBottom data={props} image={ShopIcon} />
                        )
                    }} />
                
                <Tab.Screen name="My Mat" component={this.MatData}    
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: (props) => (
                            <IconBottom data={props} image={MatIcon} />
                        )
                        
                    }} />
                    
                <Tab.Screen name="NYS" component={this.NysData}    
                    options={{
                        
                        tabBarIcon: (props) => (
                            <IconBottom data={props} image={NewsIcon} />
                        )
                        
                    }} />     
                <Tab.Screen name="Profile" component={this.AfterLoginData}

                    options={{
                        tabBarIcon: (props) => (
                            <IconBottom data={props} image={User} />
                        )
                    }} />
            </Tab.Navigator>

        )
    }

    OrderData = () => {
        return(
            <Stack.Navigator initialRouteName="OrderData" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="OrderData" component={MainLayoutOrder} options={({ navigation }) => ({
                    headerShown: true,
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
                <Stack.Screen name="Invoice" component={InvoiceLayout} options={({ navigation }) => ({
                    headerShown: true,
                    header: () => (<BackTopHeader navigasi={navigation} />)
                })} />
            </Stack.Navigator>
        )
    }

    render() {

        return (
            <>
                <Stack.Navigator initialRouteName="First"  screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="First" component={FirstLayout} />
                    <Stack.Screen name="Splash" component={SplashLayout} options={verticalAnimation}/>
                    <Stack.Screen name="Order" component={this.OrderData} />
                    <Stack.Screen name="Main" component={this.HomeWithBottomTab} />
                    <Stack.Screen name="PageTraining" component={PageTraining}  options={({ navigation }) => ({
                        header: () => (<BlankHeader navigasi={navigation} />),
                        gestureEnabled: false,
                    })} />
                </Stack.Navigator>
            </>
        )

    }
}