import React from 'react'
import MatLayout from '../navigation/profile/mat/mat_main_layout'
import TopHomeBar from '../items/home_top'


const MyMatLayout = (props) => {


    return(
        <>
            <TopHomeBar navigasi={props.navigation}/>
            <MatLayout/>
        </>
    )
}

export default MyMatLayout