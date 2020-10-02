import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {db} from '../../firebase/firebase';
import {useStateProviderValue} from '../../state/StateProvider';

function FollowingListScreen() {
  const [
    {currentUser, currentUserData, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();
  const [usersFollowingList, setFollowingList] = useState('');

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Following list!</Text>
    </View>
  );
}

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

export default FollowingListScreen;
