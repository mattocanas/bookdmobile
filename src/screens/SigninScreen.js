import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../../firebase/firebase';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hey there, welcome back to bookd</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            onChangeText={(newEmail) => setEmail(newEmail)}
            value={email}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            onChangeText={(newPassword) => setPassword(newPassword)}
            value={password}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{color: '#FFF', fontWeight: '500'}}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 32}}>
        <Text style={{color: '#c1c8d4', fontSize: 13}}>
          New to bookd?{' '}
          <Text style={{color: '#55d077', fontWeight: '500'}}>
            Sign up here!
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
  },
  greeting: {
    color: '#55d077',
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#55d077',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#c1c8d4',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#c1c8d4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#c1c8d4',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#55d077',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
