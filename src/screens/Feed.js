import React, {useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import {db} from '../../firebase/firebase';
import LocationCard from './LocationCard';
import {useStateProviderValue} from '../../state/StateProvider';

const Feed = () => {
  const [
    {currentUser, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    db.collection('locations').onSnapshot((snapshot) =>
      setLocations(snapshot.docs.map((doc) => doc.data())),
    );
  }, []);
  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        dispatch({
          type: 'SET_CURRENTUSERPICTUREURI',
          currentUserPictureURI: data.profilePictureUrl,
        });
      });
  }, []);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.docName}
        data={locations}
        renderItem={({item}) => (
          <LocationCard
            docName={item.docName}
            name={item.name}
            address={item.address}
            locationPhoto={item.locationPhoto}
            locationsNearby={''}
            mapUrl={''}
            maxOccupancy={item.maxOccupancy}
            peopleThere={item.peopleThere}
            peopleTherePictures={item.peopleTherePictures}
          />
        )}
      />
    </View>
  );
};

export default Feed;
