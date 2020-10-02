/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {set} from 'react-native-reanimated';
import {db} from '../../firebase/firebase';
import {useNavigation} from '@react-navigation/native';

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

  const [userInfo, setUserInfo] = useState('');
  const navigationUse = useNavigation();

  useEffect(() => {
    db.collection('Austin')
      .doc(docName)
      .collection('peopleThere')
      .onSnapshot((snapshot) =>
        setUserInfo(snapshot.docs.map((doc) => doc.data())),
      );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userInfo}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={styles.userCard}
              onPress={() =>
                navigationUse.navigate('UserDetailScreen', {
                  userId: item.uid,
                })
              }>
              <Image
                style={styles.profilePicture}
                source={{uri: item.profilePictureUrl}}
              />
              <Text style={styles.nameText}>{item.username}</Text>
            </TouchableOpacity>
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
