import React, { Component } from "react";
import styleData from '../../values/style'
import {
    View,
    Text,
    Dimensions,
    TouchableHighlight,
    ToastAndroid,
    SafeAreaView,
    Linking,
  } from 'react-native';
  import ukuran from '../../material/dimen';
  import color from '../../material/color';
  import WhatsApp from '../../icons/whatsapp.svg'
  import Cart from '../../icons/bag.svg'
import { getAllCartItem } from "../../services/database/service_sqlite";
import Constant from "../../material/constant";
import { getAllStockCartId } from "../../services/cart_process";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class DetailTopBar extends Component{
    constructor(props){
      super(props)
      this.state = {
        totalCart: 0,
        before: 0,
        nowData: 0
      }
      this.totalCart = this.totalCart.bind(this)
    }

    

    // BIKIN NGELAG atau BERAT
    componentDidMount(){
      this.totalCart()
    }
    componentDidUpdate(){
      (async () => {
        var first = await AsyncStorage.getItem('cartUp')
        if(first == 'yes'){
            AsyncStorage.setItem('cartUp', '')
            this.totalCart()
        }
    })()
    }

    totalCart(){
      (async ()=>{
        var totalData = await getAllStockCartId()
          if(totalData.stock.length != this.state.before){
              this.setState({totalCart: (totalData == null) ? 0 : (totalData.stock.length > 99) ? 99 : totalData.stock.length, before: totalData.stock.length, nowData: totalData.stock.length})
          }
      })()
    }

    render(){
        return(
                <View style={styleData.navigationTopBar}>
                    <View style={{zIndex: 5, paddingStart: 3, paddingEnd: 3, fontSize: ukuran.dp_10, backgroundColor: color.white, borderRadius: 20, position:'absolute', top: ukuran.dp_20, start: 13}}>
                      <Text style={{fontSize: ukuran.dp_10}}>{this.props.cart}</Text>
                    </View>
                    <TouchableHighlight
                      style={{width: 24, zIndex: 4, marginEnd: ukuran.fontMedium}}
                      underlayColor={color.defaultColor}
                      onPress={()=>{
                        this.props.navigasi.navigate('Cart')
                      }}
                      >
                      <Cart fill={color.white}/>
                      </TouchableHighlight>
                  <View style={{textAlign: 'center', 
                      position: 'absolute',
                      flex: 1,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      left: (Dimensions.get('window').width / 2) - 60}}>
                        <Text
                          style={{fontWeight:'bold', color: color.white, fontSize: ukuran.fontMedium}}
                          >NIRVANA</Text>
                        <Text
                          style={{color: color.white, fontSize: ukuran.fontMedium}}> STORE</Text>  
                      </View>
                  <View style={{flex:1, marginStart: ukuran.dp_20}}>
                    <TouchableHighlight
                      style={{width: 34}}
                      underlayColor={color.defaultColor}
                      onPress={()=>{    
                        Linking.openURL(Constant.contactNumber)
                      }}
                      >
                      <WhatsApp fill={color.white}/>
                      </TouchableHighlight>
                  </View>
              </View>  
            
        )
    }
}