import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { ProviderPropType } from 'react-native-maps';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';
import MarkerMore from './markerMore';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 50.449793;
const LONGITUDE = 30.524518;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

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
          {
            this.props.state.data.testList.map((item,index) => {
              return (
                <MarkerMore item={item} key={index}/>
              )
            })
          }
          

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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  
});

const mapDispatchToProps = (dispatch) => {
  return {
      navigateTo: (screen) => dispatch(navigateTo(screen))
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkerTypes);