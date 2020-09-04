import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {auth} from '../../firebase/firebase';
import {useStateProviderValue} from '../../state/StateProvider';

const App = () => {
  const [{currentUser}, dispatch] = useStateProviderValue();
  const signoutUser = () => {
    dispatch({
      type: 'SET_USER',
      currentUser: null,
    });
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to bookd {currentUser ? currentUser.displayName : ''}
      </Text>
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
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#55d077',
  },
});

export default App;
