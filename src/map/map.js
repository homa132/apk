import React from 'react';
import { StyleSheet, View, Dimensions,Text,TouchableOpacity } from 'react-native';
import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.449793;
const LONGITUDE = 30.524518;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MarkerTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
    };
  }

  render() {
    
    return (
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
          loadingBackgroundColor='#EAEAEA'
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={this.state.a}
          >
            <Callout 
            style={styles.plainView}
            onPress={() => {
              this.props.navigateTo('Details')
            }}
            >
              <View style={styles.modalContent}>
                  <Text style={styles.modalName}>Илюха пидор заебал дрочить Илюха пидор заебал дрочить</Text>
                  <View style={styles.modalDate}>
                    <Text style={styles.modalText}>Дата:20,06,2018</Text>
                    <Text style={styles.modalText}>Время:15-15</Text>
                  </View>
                  <Text style={styles.moreText}>Илюха пидор заебал дрочить Илюха пидор
                   заебал дрочить Илюха пидор заебал дрочить Илюха пидор заебал дрочить</Text>
                  <View style={styles.buttom}>
                    <View>
                      <Text style={styles.category}>Категори: спорт</Text>
                      <Text style={styles.category}>Учасников: 178</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonConteiner}>
                      <Text style={styles.buttonText}>Подробнее</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </Callout>
          </Marker>
          {/* <Marker
            coordinate={this.state.b}
            onSelect={e => log('onSelect', e)}
            onDrag={e => log('onDrag', e)}
            onDragStart={e => log('onDragStart', e)}
            onDragEnd={e => log('onDragEnd', e)}
            onPress={e => log('onPress', e)}
            draggable
          /> */}
        </MapView>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width:260,
    height: 180,
    borderColor: '#3AE7FF',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EAEAEA',
    marginVertical: 4,
  },
  modalName: {
    height: 40,
    width: 240,
    borderBottomColor:'#3AE7FF' ,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    fontSize: 16,
    color: '#3C3C3C',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 15,
    color: '#3C3C3C'
  },
  modalDate: {
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  moreText: {
    fontSize: 15,
    color: '#3C3C3C',
    textAlign: 'left'
  },
  buttom: {
    width: 240,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#3AE7FF',
    borderTopWidth: 1,
    alignItems: 'center'
  },
  category: {
    fontSize: 14,
    color: '#3C3C3C',
    justifyContent: 'space-around'
  },
  buttonText: {
    fontSize: 15,
    color: '#3C3C3C',
    textAlign: 'center',
  },
  buttonConteiner: {
    width: 100,
    height: 20,
    borderColor: '#3AE7FF',
    borderWidth: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
      navigateTo: (screen) => dispatch(navigateTo(screen))
  }
}

export default connect(null,mapDispatchToProps)(MarkerTypes);