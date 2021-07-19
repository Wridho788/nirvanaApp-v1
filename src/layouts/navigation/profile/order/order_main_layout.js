'use strict'

import React, { useEffect } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import { useState } from 'react'
import color from '../../../../material/color'
import ukuran from '../../../../material/dimen'
import TextTitle from '../../../items/title_text'
import ListOrderData from './order_list_data'
import { TabActions } from '@react-navigation/native'

const renderTabBar = props => (
    <TabBar
    {...props}
    indicatorStyle={{backgroundColor: color.defaultColor}}
    style={{backgroundColor: color.white}}
    renderLabel={({route, focused, warna}) =>(
        <TextTitle fontSize={ukuran.dp_12} align={'center'} tipe={'normal'} text={route.title}
        maxLine={1} warna={color.defaultColor} />
    )}/>
)

const MainLayoutOrder = (props) =>{
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(props.route.params.index)
    const [routes] = useState([
        {key: 'waiting', title: 'Waiting'},
        {key: 'processing', title: 'Processing'},
        {key: 'completed', title: 'Completed'},
        {key: 'cancelled', title: 'Cancelled'},
    ])

    useEffect(()=>{
        const jumpAction = TabActions.jumpTo('completed')
        props.navigation.dispatch(jumpAction)
    }, [])

    function Waiting(){
        return(
            <ListOrderData text={1} navigasi={props.navigation}/>
        )
    }
    function Processing(){
        return(
            <ListOrderData text={2} navigasi={props.navigation}/>
        )
    }

    function Completed(){
        return(
            <ListOrderData text={3} navigasi={props.navigation}/>
        )
    }

    function Canceled(){
        return(
            <ListOrderData text={5} navigasi={props.navigation}/>
        )
    }
    const renderScene = SceneMap({
        waiting: Waiting,
        processing: Processing,
        completed: Completed,
        cancelled: Canceled,
    })
    return(
        <>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}/>
        </>
    )
}

export default MainLayoutOrder