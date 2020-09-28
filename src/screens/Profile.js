/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {auth} from '../../firebase/firebase';
import {useStateProviderValue} from '../../state/StateProvider';
import {storage} from '../../firebase/firebase';
import PhotoUpload from 'react-native-photo-upload';
import {db} from '../../firebase/firebase';
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        dispatch({
          type: 'SET_CURRENTUSERPICTUREURI',
          currentUserPictureURI: data.profilePictureUrl,
        });
      });
  }, []);
  const [
    {currentUser, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();
  let url;

  const signoutUser = () => {
    dispatch({
      type: 'SET_USER',
      currentUser: null,
    });
    auth.signOut();
  };

  const setUserProfilePicture = (imageUrl) => {
    db.collection('users').doc(currentUser.uid).update({
      profilePictureUrl: imageUrl,
    });
  };

  const changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('error');
      } else if (!response.didCancel) {
        url = response.uri;
        uploadFile();
      }
    });
  };

  const uploadFile = async () => {
    const file = await uriToBlob(url);
    storage
      .ref(`profilePictures/${currentUser.displayName}.png`)
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((imageUrl) => (url = imageUrl))
      .then((imageUrl) => setUserProfilePicture(imageUrl))
      .catch((error) => {
        console.log(error);
      });
  };

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('Error on upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editProfilePicture} onPress={changeImage}>
        <Image
          style={styles.profilePicture}
          source={{uri: currentUserPictureURI}}
        />
      </TouchableOpacity>

      <Text style={styles.usernameText}>{currentUser.displayName}</Text>
      <TouchableOpacity style={{marginTop: 32}} onPress={signoutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  },
  editProfilePicture: {
    marginTop: 140,
  },
});

export default Profile;
