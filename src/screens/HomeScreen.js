import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Feed from './Feed';

const App = () => {
  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    paddingTop: 50,
  },
  welcomeText: {
    color: '#55d077',
  },
});

export default App;
