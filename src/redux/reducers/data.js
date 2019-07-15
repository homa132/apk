import {FILTER_LIST,GET_MY_DATA,SET_ALL_LIST_EVENTS} from '../const';


const initState = {
    allList: [],
    myDataAcc: '',
    testList: [],
    filter: {
        date: 'default',
        category: 'default'
    }
}

export default (state = initState, action) => {
    const {category,date,type} = action;
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
