import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useStateProviderValue} from '../../state/StateProvider';

import Feed from './Feed';

const App = () => {
  const [
    {currentUser, currentUserPictureURI},
    dispatch,
  ] = useStateProviderValue();

  if (currentUser) {
    return (
      <View style={styles.container}>
        <Feed />
      </View>
    );
  } else {
    return <Text>Hi</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 20,
  },
  welcomeText: {
    color: '#55d077',
  },
});

export default App;
