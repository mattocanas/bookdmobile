import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStateProviderValue} from '../../state/StateProvider';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../firebase/firebase';
import Ion from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LocationDetailScreen = ({route, navigation}) => {
  const {
    docName,
    name,
    address,
    locationPhoto,
    locationsNearby,
    mapUrl,
    maxOccupancy,
    peopleThere,
    peopleTherePictures,
  } = route.params;
  const navigationUse = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.locationPhoto} source={{uri: locationPhoto}} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.rating}>5 Stars</Text>

      {peopleThere.length >= maxOccupancy ? (
        <TouchableOpacity style={styles.fullWarning}>
          <Text>Currently Full</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.currentPeople}>
        <Text style={styles.currentPeopleNumber}>
          {peopleThere.length.toString()}
        </Text>{' '}
        user{peopleThere.length > 1 ? 's are' : ' is'} currently book'd!
      </Text>

      <View style={styles.tabBarView}>
        <Ion
          style={styles.tabBarIcon}
          name="md-people-circle"
          onPress={() =>
            navigationUse.navigate('PeopleThereList', {
              docName,
              name,
              address,
              locationPhoto,
              locationsNearby,
              mapUrl,
              maxOccupancy,
              peopleThere,
              peopleTherePictures,
            })
          }
        />
        <Ion
          style={styles.tabBarIcon}
          name="create-outline"
          onPress={() =>
            navigationUse.navigate('BrainstormCreate', {
              docName,
              name,
              address,
              locationPhoto,
              locationsNearby,
              mapUrl,
              maxOccupancy,
              peopleThere,
            })
          }
        />
        <MaterialCommunityIcons
          style={styles.tabBarIcon}
          name="coffee"
          onPress={() =>
            navigationUse.navigate('CurrentMeetings', {
              docName,
              name,
              address,
              locationPhoto,
              locationsNearby,
              mapUrl,
              maxOccupancy,
              peopleThere,
            })
          }
        />
        <Ion
          style={styles.tabBarIcon}
          name="compass-outline"
          onPress={() =>
            navigationUse.navigate('MapScreen', {
              docName,
              name,
              address,
              locationPhoto,
              locationsNearby,
              mapUrl,
              maxOccupancy,
              peopleThere,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 6,
    paddingRight: 6,
  },
  tabBarView: {
    flexDirection: 'row',
    marginTop: 26,
    alignContent: 'center',
    justifyContent: 'center',
  },
  tabBarIcon: {
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 26,
    color: '#55d077',
    textAlign: 'center',
  },
  locationPhoto: {
    height: 170,
    width: 300,
    borderRadius: 15,
  },
  name: {
    color: '#c1c8d4',
    paddingTop: 10,
    fontSize: 28,
  },
  address: {
    color: '#c1c8d4',
    paddingTop: 6,
    fontSize: 20,
  },
  rating: {
    color: '#55d077',
    paddingTop: 4,
    fontSize: 20,
  },
  currentPeople: {
    color: '#c1c8d4',
    paddingTop: 6,
    fontSize: 20,
  },
  currentPeopleNumber: {
    color: '#55d077',
  },
  maxOccupancyNumber: {
    color: '#55d077',
    fontSize: 20,
    paddingTop: 4,
  },
  maxOccupancyText: {
    color: '#c1c8d4',
    paddingTop: 4,
    fontSize: 14,
    textAlign: 'center',
  },
  mapUrl: {
    color: '#55d077',
    paddingTop: 6,
    fontSize: 20,
  },
  fullWarning: {
    backgroundColor: '#c43b4c',
    fontSize: 14,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 6,
  },
  brainstormIcon: {
    fontSize: 45,
    color: '#55d077',
    textAlign: 'center',
  },
  brainstormText: {
    fontSize: 24,
    color: '#c1c8d4',
  },
  brainstormButton: {
    marginTop: 16,
    marginBottom: 10,
  },
  brainstormView: {
    textAlign: 'center',
    marginTop: 18,
  },
});

export default LocationDetailScreen;
