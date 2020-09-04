import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to bookd! Signup!</Text>
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
