import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useStateProviderValue} from '../../state/StateProvider';
import {db} from '../../firebase/firebase';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const LocationCard = ({
  docName,
  name,
  address,
  locationPhoto,
  locationsNearby,
  mapUrl,
  maxOccupancy,
  peopleThere,
  currentBrainstorms,
  peopleTherePictures,
}) => {
  const [currentUserInfo, setCurrentUserInfo] = useState('');
  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setCurrentUserInfo(doc.data());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserInfo]);

  const setCurrentLocation = async (value) => {
    try {
      await AsyncStorage.setItem('usersCurrentLocation', value);
    } catch (e) {
      // saving error
    }
  };

  const navigation = useNavigation();
  const [
    {currentUser, usersCurrentLocation, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();

  const onCheckinTapped = () => {
    setCurrentLocation(docName);
    db.collection('Austin')
      .doc(docName)
      .update({
        peopleThere: firebase.firestore.FieldValue.arrayUnion(
          currentUser.displayName,
        ),
      });

    db.collection('Austin')
      .doc(docName)
      .collection('peopleThere')
      .doc(currentUser.uid)
      .set({
        username: currentUser.displayName,
        uid: currentUser.uid,
        profilePictureUrl: currentUserPictureURI,
      });

    db.collection('users')
      .doc(currentUser.uid)
      .update({
        currentLocation: docName,
      })
      .then(
        dispatch({
          type: 'SET_USERSCURRENTLOCATION',
          usersCurrentLocation: docName,
        }),
      );
  };

  const onCheckOutTapped = () => {
    db.collection('Austin')
      .doc(docName)
      .update({
        peopleThere: firebase.firestore.FieldValue.arrayRemove(
          currentUser.displayName,
        ),
      });

    db.collection('Austin')
      .doc(docName)
      .collection('peopleThere')
      .doc(currentUser.uid)
      .delete();

    db.collection('users')
      .doc(currentUser.uid)
      .update({
        currentLocation: '',
      })
      .then(
        dispatch({
          type: 'SET_USERSCURRENTLOCATION',
          usersCurrentLocation: '',
        }),
      );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LocationDetail', {
            docName,
            name,
            address,
            locationPhoto,
            locationsNearby,
            mapUrl,
            maxOccupancy,
            peopleThere,
            currentBrainstorms,
            peopleTherePictures,
          })
        }
        style={styles.touchableOpactiy}>
        <Image style={styles.locationPhoto} source={{uri: locationPhoto}} />
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>

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
      {currentUserInfo.currentLocation === '' ? (
        <TouchableOpacity
          onPress={onCheckinTapped}
          style={styles.checkinButton}>
          <Text style={styles.checkinText}>I'm here!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onCheckOutTapped}
          style={styles.checkinButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    color: '#c1c8d4',
    marginTop: 10,
  },

  checkinText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222831',
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 3,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222831',
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 3,
  },
  currentPeople: {
    fontSize: 17,
    color: '#c1c8d4',
    marginTop: 2,
    marginBottom: 3,
  },
  currentPeopleNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#55d077',
  },
  checkinButton: {
    backgroundColor: '#55d077',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  touchableOpactiy: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWarning: {
    backgroundColor: '#c43b4c',
    fontSize: 14,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default LocationCard;
