import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

const PeopleThereList = ({route, navigation}) => {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={peopleTherePictures}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View>
            <Image style={styles.profilePicture} source={{uri: item}} />
          </View>
        )}
      />
      <FlatList
        data={peopleThere}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.userCard}>
            <Text style={styles.nameText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 6,
    paddingRight: 6,
    alignItems: 'flex-start',
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  nameText: {
    fontSize: 16,
    marginLeft: 20,
    color: '#55d077',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginLeft: 8,
  },
});

export default PeopleThereList;
