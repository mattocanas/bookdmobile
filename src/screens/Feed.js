import React, {useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import {db} from '../../firebase/firebase';
import LocationCard from './LocationCard';

const Feed = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    db.collection('locations').onSnapshot((snapshot) =>
      setLocations(snapshot.docs.map((doc) => doc.data())),
    );
  }, []);

  return (
    <View>
      <FlatList
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
          />
        )}
      />
    </View>
  );
};

export default Feed;
