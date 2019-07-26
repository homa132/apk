import {GET_MY_DATA,SET_NEW_MY_DATA,SET_MY_DATA,GET_EVENTS,SET_FILTER} from '../const';


const initState = {
    myDataAcc: {},
    myChangeDataAcc: [],
    disableSaveBtn: true,
    arrayEvent: [],
    lastEvent: '',
    date: 'default',
    type: 'default'
}

export default (state = initState, action) => {
    const {type,value,name,secondName,nameSecond,valueSecond,arrayEvent,lastEvent,
        valueFilter,nameFilter} = action;
    
    switch (type) {
        case GET_EVENTS:
            return {...state,arrayEvent,lastEvent}
        case SET_FILTER: 
            return {...state,[nameFilter]:valueFilter}

        case GET_MY_DATA: 
            return {...state,myDataAcc: action.myDataAcc,myChangeDataAcc: action.myDataAcc}
        case SET_NEW_MY_DATA:
            if(name == 'disableBtn'){
                return{...state,disableSaveBtn: true}
            }
            if(name == 'saveData'){
                return {...state,myDataAcc: state.myChangeDataAcc}
            }
            if(secondName == 'contacts'){
                return {...state,myChangeDataAcc:{ ...state.myChangeDataAcc,contacts:{...state.myChangeDataAcc.contacts,[name]:value}},disableSaveBtn:false}
            }else{
                return {...state,myChangeDataAcc:{ ...state.myChangeDataAcc,[name]: value},disableSaveBtn:false}
            }
        case SET_MY_DATA :
            return {...state,myDataAcc:{...state.myDataAcc,[nameSecond]: valueSecond}}
        default: return state
    }
}



const filterDate = (date,category,allList) => {
    let filtredList = allList;
    if(date != 'default'){
        filtredList = filtredList.filter((item,index) => {
            return date == `${item.date.month}.${item.date.year}`
        })
    }
    if(category != 'default'){
        filtredList = filtredList.filter((item,index) => {
            return item.category.value == category
        })
    }
    return filtredList
}
