import React, {useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import {db} from '../../firebase/firebase';
import LocationCard from './LocationCard';
import {useStateProviderValue} from '../../state/StateProvider';

const Feed = () => {
  const [
    {currentUser, currentUserPictureURI, currentUserData},
    dispatch,
  ] = useStateProviderValue();
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    let active = true;
    if (active) {
      db.collection('Austin').onSnapshot((snapshot) =>
        setLocations(snapshot.docs.map((doc) => doc.data())),
      );
    }
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    let active = true;
    if (currentUser & active) {
      db.collection('users')
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const data = doc.data();
          dispatch({
            type: 'SET_CURRENTUSERPICTUREURI',
            currentUserPictureURI: data.profilePictureUrl,
          });
          dispatch({
            type: 'GET_CURRENTUSERDATA',
            currentUserData: data,
          });
        });
    }
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid, dispatch]);

  if (currentUser) {
    return (
      <View>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
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
  }
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 0,
    marginTop: 0,
  },
});

export default Feed;
