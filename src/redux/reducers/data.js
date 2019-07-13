import {FILTER_LIST,GET_MY_DATA} from '../const';

const item = {
    hesh: '12341234',
    name: 'First',
    category: {name:'Клуб',value: 'club'},
    date: {month:'13.06',year:'2019'},
    time: '10-20',
    images: ['https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'],
    contacts: {
        facebook: '',
        viber: '',
        site: '',
        telegrame: '',
        insta: ''
    },
    location: {
        latitude: 50.449793,
        longitude: 30.554518,
      },
    locationText: 'м.Київ,вул.Соборності 79/8',
    nameAutor: 'Andrey',
    heshAutor: 'hesh',
    heshMessenger: 'hesh',
    textMore: 'Внутреннее состояние не сохраняется, когда содержимое прокручивается из окна рендеринга. Убедитесь, что все ваши данные записаны в данные об элементах или во внешних хранилищах, таких как Flux, Redux или Relay.'
}

const item2 = {
    hesh: '123123',
    name: 'Second',
    category: {name:'Спорт',value: 'sport'},
    date: {month:'14.06',year:'2019'},
    time: '10-20',
    images: ['https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'],
    contacts: {
        facebook: '',
        viber: '',
        site: '',
        telegrame: '',
        insta: ''
    },
    location: {
        latitude: 50.459793,
        longitude: 30.534518,
      },
    nameAutor: 'Andrey',
    heshAutor: 'hesh',
    heshMessenger: 'hesh',
    textMore: 'Внутреннее состояние ивается из окна рендеринга. Убедитесь, что все ваши данные записаны в данные об элементах или во внешних хранилищах, таких как Flux, Redux или Relay.'
}

const initState = {
    list : [],
    allList: [item,item2],
    myDataAcc: ''
}

export default (state = initState, action) => {

    const {category,date,type} = action;
    const {allList} = state;

    switch (type) {
        case FILTER_LIST:
            const newTestList = filterDate(date,category,allList)
            return {...state,testList: newTestList}
        case GET_MY_DATA: 
            return {...state,myDataAcc: action.myDataAcc}
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
