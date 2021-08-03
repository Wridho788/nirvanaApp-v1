import React, { useEffect } from 'react'
import MatLayout from '../navigation/profile/mat/mat_main_layout'
import TopHomeBar from '../items/home_top'
import { getTokenData } from '../../services/account_process'


const MyMatLayout = (props) => {


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
                // var data = await loadUserData(tokenUser)
                // var userProg = await loadProgressUser(data, tokenUser)
                // var orderWaiting = await getStatusDataOrder(1)
                // var orderProgress = await getStatusDataOrder(2)
                // setTotalWaiting(orderWaiting.length)
                // setTotalProgress(orderProgress.length)
                // fetchUserData(data, userProg)

            }else{
                props.navigation.navigate('Profile')
            }
        })()
    }, [null])
    return(
        <>
            <TopHomeBar navigasi={props.navigation}/>
            <MatLayout/>
        </>
    )
}

export default MyMatLayout