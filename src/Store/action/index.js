const changeisuser=(userInfo)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_USER",payload:userInfo})


    }
}

const changeisvideotitle=(videoTitle)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_VIDEOTITLE",payload:videoTitle})


    }
}

const changeiscategory=(category)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_CATEGORY",payload:category})


    }
}


export {changeisuser,changeisvideotitle,changeiscategory}