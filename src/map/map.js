import React from 'react';
import { StyleSheet, Dimensions,View,Image} from 'react-native';
import MapView, { ProviderPropType,Marker } from 'react-native-maps';
import {connect} from 'react-redux';
import MarkerMore from './markerMore';
import {setNewData} from '../redux/actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.449793;
const LONGITUDE = 30.524518;
const LATITUDE_DELTA = 0.1022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MarkerTypes extends React.Component {

  render() {
    
    const DELTA1 = 0.0922;
    const DELTA2 = DELTA1 * ASPECT_RATIO;

    if(this.props.one){
      return(
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: DELTA1,
            longitudeDelta: DELTA2,
          }}
        >
          <Marker
            coordinate={this.props.location}>
              <View style={[styles.conteinerItem,{backgroundColor: this.props.autor.autorColor}]}>
                <Image source={{uri: this.props.autor.autorImage}} style={styles.itemImage}/>
              </View>
          </Marker>
        </MapView>
      )
    }else{
      return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {this.props.new?
            <Marker
            coordinate={this.props.location}
            onDragEnd={e => this.props.setNewData(e.nativeEvent.coordinate,'location') }
            draggable>
              <View style={[styles.conteinerItem,{backgroundColor: this.props.autorColor}]}>
                <Image source={{uri: this.props.autorImage}}
                      style={styles.itemImage}/>
              </View>
            </Marker>:
            this.props.listEvents.map((item,index) => {
              return (
                <MarkerMore item={item} key={index}/>
              )
            })
          }
        </MapView>
    );
    }
    
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  conteinerItem: {
    width: 31,
    height: 31,
    borderRadius: 15.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: 'white',
    borderWidth: 0.8
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setNewData: (value,name)=>dispatch(setNewData(value,name))
  }
}

export default connect(null,mapDispatchToProps)(MarkerTypes);