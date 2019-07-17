import {FILTER_LIST,GET_MY_DATA,SET_ALL_LIST_EVENTS,SET_NEW_MY_DATA} from '../const';


const initState = {
    allList: [],
    myDataAcc: {},
    testList: [],
    filter: {
        date: 'default',
        category: 'default'
    },
    disableSaveBtn: true
}

export default (state = initState, action) => {
    const {category,date,type,value,name,secondName} = action;
    const {allList,filter} = state;
    
    switch (type) {
        case FILTER_LIST:
            const newTestList = filterDate(date,category,allList)
            return {...state,testList: newTestList,filter:{date,category}}
        case GET_MY_DATA: 
            return {...state,myDataAcc: action.myDataAcc}
        case SET_ALL_LIST_EVENTS:
            const newList = filterDate(filter.date,filter.category,action.allList);
            return {...state,allList:action.allList,testList: newList}
        case SET_NEW_MY_DATA:
            if(name == 'disableBtn'){
                return{...state,disableSaveBtn: true}
            }
            if(secondName == 'contacts'){
                return {...state,myDataAcc:{ ...state.myDataAcc,contacts:{...state.myDataAcc.contacts,[name]:value}},disableSaveBtn:false}
            }else{
                return {...state,myDataAcc:{ ...state.myDataAcc,[name]: value},disableSaveBtn:false}
            }
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
