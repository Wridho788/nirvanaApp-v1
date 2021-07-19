import React, { useEffect } from 'react'
import { isFirstTime } from '../../services/database/service_sqlite'

const FirstLayout = (props) => {
    
    useEffect(() => {
        (async () => {   
           var isFirst = await isFirstTime()
           if(isFirst == null){
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Splash', params: {urlFirst: 'namaste3.mp4', position: 0}}],
                })
           }else{
                props.navigation.reset({
                    index: 0,
                    routes: [{name: 'Splash', params: {urlFirst: 'lotus.mp4', position: 1}}],
                })
           }
        })()

    }, [])

    
    return(
        <>
        </>
    )
}

export default FirstLayout