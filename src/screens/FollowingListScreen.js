import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {db} from '../../firebase/firebase';
import {useStateProviderValue} from '../../state/StateProvider';
import {useNavigation} from '@react-navigation/native';

function FollowingListScreen() {
  const [
    {currentUser, currentUserData, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();
  const [usersFollowingList, setFollowingList] = useState([]);
  const navigationUse = useNavigation();

  useEffect(() => {
    setFollowingList(currentUserData.followingList);

    // console.log(usersFollowingList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usersFollowingList}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity style={styles.userCard}>
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
