const initial_state ={
    userInfo:{},
    videoTitle:"",
    category:""

}



const reducer =(state=initial_state,action)=>{
    switch(action.type){
        
        case "CHANGE_USER":
            return({...state,userInfo:action.payload
            } )

            case "CHANGE_VIDEOTITLE":
            return({...state,
                videoTitle:action.payload
            })

            case "CHANGE_CATEGORY":
            return({...state,
                category:action.payload
            }) 


    }
    return state

}

export default reducer;