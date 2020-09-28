import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {db} from '../../firebase/firebase';

const CurrentMeetings = ({route}) => {
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
  const [brainstorms, setBrainstorms] = useState([]);

  useEffect(() => {
    db.collection('locations')
      .doc(docName)
      .collection('currentBrainstorms')
      .onSnapshot((snapshot) =>
        setBrainstorms(snapshot.docs.map((doc) => doc.data())),
      );
  });
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.brainstormFlatlist}
        keyExtractor={(item) => item.creator}
        data={brainstorms}
        renderItem={({item}) => (
          <View style={styles.brainstormView}>
            <Text style={styles.brainstormCreator}>{item.creator}</Text>
            <Text style={styles.brainstormDescriptionText}>
              {' '}
              is holding a parlor talk for
            </Text>
            <Text style={styles.brainstormInfo}>
              {item.subject} at {item.time}
            </Text>
            <View style={styles.horizontalRuler} />
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
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 6,
    paddingRight: 6,
  },
  brainstormFlatlist: {
    marginTop: 20,
  },
  brainstormView: {
    textAlign: 'center',
    marginTop: 16,
  },
  brainstormCreator: {
    color: '#55d077',
    fontSize: 16,
    textAlign: 'center',
  },
  brainstormDescriptionText: {
    fontSize: 16,
    color: '#c1c8d4',
    textAlign: 'center',
  },
  brainstormInfo: {
    color: '#55d077',
    fontSize: 16,
    textAlign: 'center',
  },
  horizontalRuler: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 16,
  },
});

export default CurrentMeetings;
