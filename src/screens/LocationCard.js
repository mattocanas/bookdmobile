import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const LocationCard = ({
  docName,
  name,
  address,
  locationPhoto,
  locationsNearby,
  mapUrl,
  maxOccupancy,
  peopleThere,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.locationPhoto} source={{uri: locationPhoto}} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.currentPeople}>
        <Text style={styles.currentPeopleNumber}>25</Text> users are currently
        book'd!
      </Text>
      <TouchableOpacity style={styles.checkinButton}>
        <Text style={styles.checkinText}>Check in!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPhoto: {
    height: 170,
    width: 300,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    color: '#c1c8d4',
    marginTop: 5,
  },

  checkinText: {
    fontSize: 18,
    color: '#222831',
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 3,
  },
  currentPeople: {
    fontSize: 14,
    color: '#c1c8d4',
    marginTop: 2,
    marginBottom: 3,
  },
  currentPeopleNumber: {
    fontSize: 14,
    color: '#55d077',
  },
  checkinButton: {
    backgroundColor: '#55d077',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default LocationCard;
