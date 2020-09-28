import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {db} from '../../firebase/firebase';
import firebase from 'firebase';
import {useStateProviderValue} from '../../state/StateProvider';
import {useNavigation} from '@react-navigation/native';

const BrainstormCreate = ({route}) => {
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
  const [brainstormName, setBrainstormName] = useState('');
  const [brainstormSubject, setBrainstormSubject] = useState('');
  const [brainstormTime, setBrainstormTime] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [
    {currentUser, usersCurrentLocation},
    dispatch,
  ] = useStateProviderValue();
  const navigation = useNavigation();

  const onCreateTapped = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .update({
        brainstorm: {
          name: brainstormName,
          subject: brainstormSubject,
          time: brainstormTime,
          creator: currentUser.displayName,
        },
      })
      .then(
        db
          .collection('locations')
          .doc(docName)
          .collection('currentBrainstorms')
          .doc(currentUser.displayName)
          .set({
            name: brainstormName,
            subject: brainstormSubject,
            time: brainstormTime,
            creator: currentUser.displayName,
          }),
      )
      .then(
        dispatch({
          type: 'SET_USERSCURRENTBRAINSTORM',
          usersCurrentBrainstorm: true,
        }),
      )
      .then(navigation.navigate('LocationDetail'));
  };

  const onUnfinishedSubmit = () => {
    setSubmitError(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brainstorm at {name}!</Text>
      <Text style={styles.inputLabel}> Brainstorm Name</Text>
      <TextInput
        style={styles.textInput}
        value={brainstormName}
        onChangeText={(e) => setBrainstormName(e)}
      />
      <Text style={styles.inputLabel}>
        Brainstorm subject (i.e. Physics, Epidemiology, Politics)
      </Text>
      <TextInput
        style={styles.textInput}
        value={brainstormSubject}
        onChangeText={(e) => setBrainstormSubject(e)}
      />
      <Text style={styles.inputLabel}>Time of brainstorm</Text>
      <TextInput
        style={styles.textInput}
        value={brainstormTime}
        onChangeText={(e) => setBrainstormTime(e)}
      />
      {submitError === true ? (
        <Text style={styles.submitErrorMessage}>
          Please fill in all the fields
        </Text>
      ) : null}
      {(brainstormName !== '') &
      (brainstormSubject !== '') &
      (brainstormTime !== '') ? (
        <TouchableOpacity onPress={onCreateTapped} style={styles.submitButton}>
          <Text>Create a brainstorm!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onUnfinishedSubmit}
          style={styles.submitButton}>
          <Text>Create a brainstorm!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    backgroundColor: '#b3b3b3',
    borderRadius: 5,
    width: 360,
    height: 30,
    paddingLeft: 2,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'black',
    opacity: 0.8,
  },
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 6,
    paddingRight: 6,
  },
  inputLabel: {
    color: '#c1c8d4',
    fontSize: 14,
    marginTop: 12,
  },
  title: {
    color: '#55d077',
    fontSize: 24,
    textAlign: 'center',
    paddingLeft: 6,
    paddingRight: 6,
  },
  submitButton: {
    backgroundColor: '#55d077',
    color: 'black',
    borderRadius: 15,
    marginTop: 30,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  submitErrorMessage: {
    fontSize: 16,
    color: '#c43b4c',
  },
});

export default BrainstormCreate;
