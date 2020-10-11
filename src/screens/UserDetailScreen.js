import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {db} from '../../firebase/firebase';
import {useStateProviderValue} from '../../state/StateProvider';
import firebase from 'firebase';
import {set} from 'react-native-reanimated';

function UserDetailScreen({route, navigation}) {
  const {userId} = route.params;
  const [{currentUser, currentUserData}, dispatch] = useStateProviderValue();

  const [userInfo, setUserInfo] = useState('');
  const [checkIfFollowing, setCheckIfFollowing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      db.collection('users')
        .doc(userId)
        .get()
        .then((doc) => setUserInfo(doc.data()));
    }

    if (currentUserData.followingIdList.includes(userId)) {
      setCheckIfFollowing(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIfFollowing, currentUserData]);

  const onFollowPressed = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .update({
        followingList: firebase.firestore.FieldValue.arrayUnion({
          uid: userInfo.uid,
          username: userInfo.username,
          name: userInfo.name,
          bio: userInfo.bio,
          profilePictureUrl: userInfo.profilePictureUrl,
        }),
        followingIdList: firebase.firestore.FieldValue.arrayUnion(userInfo.uid),
      });
    setCheckIfFollowing(true);
  };

  const onUnfollowPressed = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .update({
        followingList: firebase.firestore.FieldValue.arrayRemove({
          uid: userInfo.uid,
          username: userInfo.username,
          name: userInfo.name,
          bio: userInfo.bio,
          profilePictureUrl: userInfo.profilePictureUrl,
        }),
        followingIdList: firebase.firestore.FieldValue.arrayRemove(
          userInfo.uid,
        ),
      });
    setCheckIfFollowing(false);
  };

  if (currentUser) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.profilePicture}
          source={{uri: userInfo.profilePictureUrl}}
        />
        <Text style={styles.usernameText}>{userInfo.username}</Text>
        {checkIfFollowing === false ? (
          <TouchableOpacity
            style={styles.followButton}
            onPress={onFollowPressed}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onUnfollowPressed}
            style={styles.followButton}>
            <Text style={styles.followText}>Unfollow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
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
  followButton: {
    backgroundColor: '#55d077',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  followText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222831',
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 3,
  },
});

export default UserDetailScreen;
