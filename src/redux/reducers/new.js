import {SET_NEW_DATA,SET_NEW_IMAGES} from '../const';

const initState = {
    hesh: '',
    name: '',
    category: {name:'',value: 'default'},
    date: {month:'',year:''},
    time: '',
    images: [],
    contacts: {
        facebook: '',
        webSite: '',
        telegrame: '',
        instagrame: ''
    },
    location: {
        latitude: 50.459793,
        longitude: 30.534518,
    },
    autor: {
        colorAutor: '',
        nickAutor: '',
        heshAutor: '',
        photoAutor: ''
    },
    heshMessenger: '',
    textMore:'',
    likesHesh: [],
    save: false,
}



const saveInitialState = initState;

export default (state = initState, action) => {
    switch (action.type) {
        case SET_NEW_DATA:
            
            if(action.name == 'contacts'){
                return {...state,contacts:{...state.contacts,[action.secondName]:action.value}}
            }else{
               return save(state,action);
            }
        case SET_NEW_IMAGES: 
            if(action.operation=='add'){
                return{...state,images:[...state.images,action.path]}
            }
            if(action.operation=='remove'){
                return{...state,images:[]}
            }
        
        default: return state
    }


}


save = (state,action) => {
    const searchNewState = {...state,[action.name]:action.value};
    const {name,location,textMore,time,date,images,category} = searchNewState;
    if(name == ''||time==''||location.latitude==50.459793||textMore==''||date.month==''||category.name==''){
        return {...searchNewState,save:false}
    }else{
        return {...searchNewState,save:true}
    }
}