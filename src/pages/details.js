import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import NavBtn from '../navBtn/navBtn';
import {navigateTo} from '../redux/actions';
import Messenger from '../btns/messenger';
import LikesDith from '../btns/likesDis';
const { width, height } = Dimensions.get('window');
import BackBtn from '../btns/back';

import CalendarI from '../icon/item/calendar.svg';
import TimeI from '../icon/item/time.svg';
import CategoryI from '../icon/item/category.svg';
import PeopleI from '../icon/item/people.svg';
import TelegrameI from '../icon/social/telegrame.svg';
import ViberI from '../icon/social/viber.svg';
import FacebookI from '../icon/social/facebook.svg';
import InstaI from '../icon/social/insta.svg';
import SiteI from '../icon/social/site.svg';
import CommentsI from '../icon/details/comments.svg';


class Details extends Component{

    changeItem = () => {
        const {navigation,data} = this.props.state;
        return data.testList.filter((item,index) => {
            return navigation.heshItem == item.hesh
        })
    }

    render(){
        let item = this.changeItem();
        const {name,date,time,category,contacts,images,heshMessenger,textMore}  = item[0];

        return (
        <ImageBackground style={{width: width,height: height - 22,padding: 0,margin: 0}} source={require('../icon/background.jpg')}>
            <View style={styles.container}>
                <View style={styles.headerConteiner}>
                    <BackBtn/>
                    <Text style={styles.nameText} numberOfLines={2}>{name}</Text>
                    <TouchableOpacity>
                        <Messenger/>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.images}>
                    </View>
                    <View style={styles.datesConteiner}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <Text style={styles.dateText}>Дата: </Text>
                            <View style={styles.dateConteiner}>
                                <CalendarI/>
                                <View style={{alignItems: 'center',justifyContent: 'center',width: 80,height: 30,}}>
                                    <Text style={styles.dateText}>{date}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <Text style={styles.dateText}>Время: </Text>
                            <View style={styles.dateConteiner}>
                                <TimeI/>
                                <View style={{alignItems: 'center',justifyContent: 'center',width: 80,height: 30,}}>
                                    <Text style={styles.dateText}>{time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.likes}>
                        <LikesDith/>
                        <View style={{justifyContent: 'space-around',alignItems: 'center',height: 100}}>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                <Text style={styles.dateText}>Категория: </Text>
                                <View style={styles.dateConteiner}>
                                    <CategoryI/>
                                    <View style={{alignItems: 'center',justifyContent: 'center',width: 80,height: 30,}}>
                                        <Text style={styles.dateText}>{category.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                                <Text style={styles.dateText}>Участников: </Text>
                                <View style={styles.dateConteiner}>
                                    <PeopleI/>
                                    <View style={{alignItems: 'center',justifyContent: 'center',width: 80,height: 30,}}>
                                        <Text style={styles.dateText}>~50 чел.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.moreConteiner}>
                        <Text style={styles.moreText}>Все о событии: </Text>
                        <Text style={{paddingHorizontal:10}}>{textMore}</Text>
                    </View>
                    <View style={styles.socialConteiner}>
                            <TelegrameI/>
                            <InstaI/>
                            <ViberI/>
                            <FacebookI/>
                            <SiteI/>
                    </View>

                    <View style={styles.commentsConteiner}>
                        <View style={styles.commentConteiner}>
                            <Text style={styles.commentText}><Text style={styles.commentAutor}>illay888:  </Text>I Very like big penis)</Text>
                        </View>
                        <View style={styles.commentConteiner}>
                            <Text style={styles.commentText}>
                            <Text style={styles.commentAutor}>Khomin_01:  </Text>Very like big penis too I Very like big penis tooI Very like big penis tooI Very like big penis too</Text>
                        </View>
                        <TouchableOpacity style={styles.moreCommentConteiner}>
                            <CommentsI/>
                            <Text style={styles.moreCommentText}>Посмотреть коментарии(4)</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:width,height: 50}}></View>
                </ScrollView>

                <View style={styles.bottomNav}>
                    <NavBtn/>
                </View>
            </View>
        </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,margin: 0
      },
    nameText: {
        fontSize: 20,
        color: '#313131',
        fontWeight: 'bold',
        textShadowColor: '#929292',
        textShadowOffset: {width: 0,height: 0},
        textShadowRadius: 15,
        letterSpacing: 2,
        maxWidth: 200
    },
    bottomNav: {
        position: 'absolute',
        bottom: 5,
        flexDirection: 'row',
    },
    headerConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        padding:10 ,
        borderBottomColor: '#13D9D9',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    images: {
        width: width,
        height: width,
        backgroundColor: '#CACACA',
        marginTop: 10,
    },
    datesConteiner: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        width: width
    },
    dateConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 120,
        height: 30,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 5,
    },
    dateText: {
        fontSize: 13,
        color: '#313131',
        marginBottom: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
        width: width,
        height: 100,
    },
    moreConteiner: {
        width: width
    },
    moreText: {
        color: '#313131',
        paddingLeft: 25,
        fontSize: 17,
        fontWeight: 'bold'
    },
    socialConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical:10,
        flexWrap: 'wrap',
        width: width
    },
    commentsConteiner: {
        alignItems: 'flex-start',
        borderTopColor: '#969696',
        borderTopWidth: 1,
        maxWidth :width,
    },
    commentConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth :width - 20,
        marginHorizontal: 10,
        marginTop: 10
    },
    commentAutor: {
        maxWidth: width - 20,
        fontSize: 15,
        color: '#313131',
        fontWeight: 'bold',
    },
    commentText: {
        fontWeight: 'normal',
        fontSize :13,
        color: '#000000',
    },
    moreCommentConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    moreCommentText: {
        color: '#969696',
        fontSize: 16,
        marginLeft: 20,
    }
})

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);