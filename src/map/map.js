import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { ProviderPropType,Marker } from 'react-native-maps';
import {connect} from 'react-redux';
import {navigateTo,setCordinate} from '../redux/actions';
import MarkerMore from './markerMore';

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
            coordinate={{latitude: LATITUDE,
                      longitude: LONGITUDE,}}
            onDragEnd={e => this.props.setCordinate(e.nativeEvent.coordinate)}
            draggable
          />:
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
      navigateTo: (screen) => dispatch(navigateTo(screen)),
      setCordinate: (cordinate) => dispatch(setCordinate(cordinate))
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkerTypes);