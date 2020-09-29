import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {db} from '../../firebase/firebase';

function UserDetailScreen({route, navigation}) {
  const {userId} = route.params;

  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .get()
      .then((doc) => setUserInfo(doc.data()));
  }, [userId]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{uri: userInfo.profilePictureUrl}}
      />
      <Text style={styles.usernameText}>{userInfo.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
  },
  usernameText: {
    color: '#55d077',
    marginTop: 20,
    fontSize: 34,
  },
  profilePicture: {
    paddingVertical: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#55d077',
    borderWidth: 1,
    marginTop: 40,
  },
  editProfilePicture: {
    marginTop: 140,
  },
});

export default UserDetailScreen;
