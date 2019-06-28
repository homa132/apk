import React, {Component} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,TextInput,Dimensions,Image,ImageBackground,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

class Register extends Component{
    
    state = {
        email: '',
        password: '',
        name: '',
        gender: 'default',
        nameImg: '',
        img: ''
    }

    changeImage = () => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7,
            noData: true
          },({path,fileName})=> {
              this.setState({img:`file://${path}`,nameImg:fileName})
          })
    }

    createInput = (placeholder,valueState) => {
        return (
            <TextInput placeholder={placeholder} style={styles.input} numberOfLines={1} 
                                          placeholderTextColor='rgba(100, 72, 0, 0.7)' value={this.state[valueState]} 
                                        onChangeText={(value=>this.setState({[valueState]:value}))}/>
        )
    }


    render() {

        const {gender,img} = this.state;

        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={{width: width,height: height}}>
              <View style={styles.conteiner}>
  
                  <View style={styles.headerContiner}>
                      <TouchableOpacity style={styles.headerBtnBackConteiner} onPress={()=>this.props.navigation.goBack()}>
                          <Image style={styles.headerBtnBack} source={require('../img/icons/btns/btnBack.png')}/>
                      </TouchableOpacity>
                      <View style={styles.headerTextConteiner}>
                          <Text style={styles.headerText}>Регистрация</Text>
                      </View>
                  </View>

                  <View style={styles.mainConteiner}>
  
                  <ScrollView style={{flex: 1,height: height - 150}}>
                          <View style={styles.inpuntsConteiner}>
                                {this.createInput('Введите эл. почту','email')}
                                {this.createInput('Введите пароль','password')}
                                {this.createInput('Введите ник','name')}
                          </View>
  
                          <View style={styles.changeGenderConteiner}>
                              <Text style={styles.changeGenderText}>Выберите пол</Text>
                              <View style={styles.genderConteiner}>
                                  <TouchableOpacity onPress={() => this.setState({gender: 'man'})}>
                                      <View style={[styles.genderItem,gender == 'man'?{backgroundColor: '#FFF960'}:null]}>
                                          <Image style={styles.genderImage} source={require('../img/icons/registerScreen/man.png')}/>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => this.setState({gender: 'woman'})}>
                                      <View style={[styles.genderItem,gender == 'woman'?{backgroundColor: '#FFF960'}:null]}>
                                          <Image style={styles.genderImage} source={require('../img/icons/registerScreen/woman.png')}/>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                          </View>
  
                          <View style={styles.addImageConteiner}>
                              <Text style={styles.addImageText}>Добавьте свое фото или свой логотип, он будет отображаться на Ваших событиях</Text>
                              <TouchableOpacity style={styles.addImageBtnConteiner} onPress={this.changeImage}>
                                  {img == ''?<Image source={require('../img/icons/registerScreen/AddImage.png')} 
                                          style={styles.addImageImg}/>:
                                          <Image source={{uri: img}} style={styles.addImageImg}/>}
                                  
                              </TouchableOpacity>
                          </View>
  
                          <TouchableOpacity>
                              <View style={styles.btnRegistrConteiner}>
                                  <Text style={styles.btnRegistrText} numberOfLines={1}>Зарегистрировать</Text>
                              </View>
                          </TouchableOpacity>
                      
                  </ScrollView>
                  </View>
              </View>
            </ImageBackground>
  
        );
      }
    }
  
  const styles = StyleSheet.create({
      conteiner: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
      },
      headerContiner: {
          height: 60,
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
          justifyContent: 'space-between',
          borderBottomColor: '#E8BC4D',
          borderBottomWidth: 2
      },
      headerBtnBackConteiner: {
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center'
      },
      headerBtnBack: {
          width: 50,
          height: 50,
      },
      headerTextConteiner: {
          width: width - 70,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center'
      },
      headerText: {
          color: '#644800',
          fontSize: 28,
          letterSpacing: 0.7,
          textShadowColor: 'rgba(100, 72, 0, 0.6)',
          textShadowOffset: {width: 0, height: 4},
          textShadowRadius: 4
      },
      mainConteiner: {
          width: 240,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: height - 150
      },
      inpuntsConteiner: {
          width: 240,
          marginTop: 15,
      },
      input: {
          fontSize: 17,
          color: '#644800',
          borderBottomColor: '#644800',
          borderBottomWidth: 2,
          textAlign: 'center',
          paddingBottom: 3,
          marginBottom: 10,
      },
      changeGenderConteiner: {
          width: 240,
          marginTop: 15,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
      },
      changeGenderText: {
          fontSize: 20,
          color: '#644800'
      },
      genderConteiner: {
          width: 200,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10
      },
      genderImage: {
          width: 42,
          height: 42
      },
      genderItem: {
          width: 50,
          height: 50,
          borderColor: '#E8BC4D',
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10
      },
      addImageConteiner: {
          width: 150,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 15
      },
      addImageText: {
          width: 150,
          fontSize: 10,
          color: '#644800',
          textAlign: 'center'
      },
      addImageBtnConteiner: {
          width: 140,
          height: 140,
          marginTop: 10
      },
      addImageImg: {
          width: 140,
          height: 140,
          borderRadius: 50
      },
      btnRegistrConteiner: {
          borderColor: '#E8BC4D',
          borderWidth: 4,
          height: 50,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 249, 96, 0.3)',
          width: 210,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20
      },
      btnRegistrText: {
          fontSize: 19,
          color: '#644800',
          width: 200,
          textAlign: 'center',
          textAlignVertical: 'center'
      }
  })

export default connect()(Register);
