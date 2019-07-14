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
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MarkerTypes extends React.Component {

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
          {this.props.new?
            <Marker
            coordinate={this.props.location}
            onDragEnd={e => this.props.setNewData(e.nativeEvent.coordinate,'location') }
            draggable>
              <View>
                <Image source={{uri: 'https://image.shutterstock.com/image-vector/light-bulb-line-icon-vector-260nw-416374336.jpg'}}
                      style={{width: 30,height: 30,borderRadius: 30}}/>
              </View>
            </Marker>:
            this.props.state.data.testList.map((item,index) => {
              return (
                <MarkerMore item={item} key={index}/>
              )
            })
          }
        
        </MapView>
    );
  }
}

MarkerTypes.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    setNewData: (value,name)=>dispatch(setNewData(value,name))
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkerTypes);