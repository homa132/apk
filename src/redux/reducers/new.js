import {SET_CORDINATE,ADD_IMAGES,CHANGE_CATEGORY,CHANGE_DATE,CAHNGE_TIME,
    SET_TEXT_DATE} from '../const';

const initState = {
    name: '',
    type: "default",
    date: 'Дата события',
    time: 'Время события',
    moreText: '',
    telegram:'',
    viber: '',
    insta: '',
    facebook: '',
    web: '',
    locationText: '',
    images: [],
    location: {
        latitude: '',
        longitude: ''
    }
}



export default (state = initState, action) => {
    console.log(state);
    switch (action.type) {
    case ADD_IMAGES:
        return {...state,images:[action.image,...state.images] }
    case CHANGE_CATEGORY:
        return {...state,type: action.category}
    case CHANGE_DATE:
        return {...state,date: action.date}
    case CAHNGE_TIME:
        return {...state,time: action.time}
    case SET_CORDINATE:
        return {...state,location: {latitude:action.cordinate.latitude,longitude:action.cordinate.longitude}}
    case SET_TEXT_DATE:
        let social = {};
        (action.what == 'telegram')?social = {...state,telegram:action.value}:null;
        (action.what == 'viber')?social = {...state,viber:action.value}:null;
        (action.what == 'insta')?social = {...state,insta:action.value}:null;
        (action.what == 'facebook')?social = {...state,facebook:action.value}:null;
        (action.what == 'web')?social = {...state,web:action.value}:null;
        (action.what == 'locationText')?social = {...state,locationText:action.value}:null;
        (action.what == 'name')?social = {...state,name:action.value}:null;
        (action.what == 'moreText')?social = {...state,moreText:action.value}:null;
        return social;
        
        default: return state
        
    }
    
}


