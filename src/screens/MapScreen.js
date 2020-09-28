import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = ({route}) => {
  const {
    docName,
    name,
    address,
    locationPhoto,
    locationsNearby,
    mapUrl,
    maxOccupancy,
    peopleThere,
  } = route.params;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>The Map Below Will Guide You</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: 30.288496,
          longitude: -97.735578,
          latitudeDelta: 0.00122,
          longitudeDelta: 0.0021,
        }}
        showsUserLocation={true}>
        <Marker coordinate={{latitude: 30.288496, longitude: -97.735578}} />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 6,
    paddingRight: 6,
  },
  header: {
    color: '#55d077',
    fontSize: 20,
    marginBottom: 8,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
