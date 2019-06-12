import {GET_DATA,SET_NAVIGATOR,FILTER_LIST} from '../const';

const item = {
    hesh: 'my hesh',
    name: 'Hello world',
    category: 'club',
    date: '13.06.2019',
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
    hesh: 'my hesh',
    name: 'Hello world',
    category: 'sport',
    date: '12.06.2019',
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
    locationText: 'м.Київ,вул.Соборності 79/8',
    nameAutor: 'Andrey',
    heshAutor: 'hesh',
    heshMessenger: 'hesh',
    textMore: 'Внутреннее состояние ивается из окна рендеринга. Убедитесь, что все ваши данные записаны в данные об элементах или во внешних хранилищах, таких как Flux, Redux или Relay.'
}

const initState = {
    list : [],
    testList: [item],
    allList: [item,item2]
}

export default (state = initState, action) => {

    const {newData,navigator,category,date,type} = action;
    const {list,testList,allList} = state;

    switch (type) {
        case GET_DATA:
            return {...state,list:newData}
        case SET_NAVIGATOR:
            return {...state,navigator:navigator}
        case FILTER_LIST:
            const newTestList = filterDate(date,category,allList)
            return {...state,testList: newTestList}
        default: return state
    }
}

const filterDate = (date,category,allList) => {
    let filtredList = allList;
    
    if(date != 'default'){
        filtredList = filtredList.filter((item,index) => {
            return item.date == date
        })
    }
    
    if(category != 'default'){
        filtredList = filtredList.filter((item,index) => {
            return item.category == category
        })
    }

    return filtredList
}
