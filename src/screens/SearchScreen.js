import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import {db} from '../../firebase/firebase';
import {useNavigation} from '@react-navigation/native';

function SearchScreen() {
  const [value, setValue] = useState('');

  //   const [docId, setDocId] = useState('');
  const navigationUse = useNavigation();

  const onSearchSubmit = () => {
    // console.log(value.split(' ').join('').toLowerCase());

    db.collection('Austin')
      .where('lowerCaseName', '==', value.split(' ').join('').toLowerCase())
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          navigationUse.navigate('LocationDetail', {
            docName: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            locationPhoto: doc.data().locationPhoto,
            locationsNearby: doc.data().locationsNearby,
            mapUrl: doc.data().locationsUrl,
            maxOccupancy: doc.data().maxOccupancy,
            peopleThere: doc.data().peopleThere,
          });
        });
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        style={styles.searchBar}
        value={value}
        onChangeText={(query) => setValue(query)}
        onSubmitEditing={() => onSearchSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 50,
  },
  searchBar: {
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 80,
    height: 30,
    width: 300,
    borderColor: 'gray',
    borderWidth: 2,
    color: '#c1c8d4',
  },
});

export default SearchScreen;
