import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity, Alert, Keyboard } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserContext } from '../context/userContext';
import { basePostRequest } from '../hooks/requestHelper';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  loginText: {
    fontSize: 35,
    color: '#4A3780',
    fontWeight: '700'
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 125,
    columnGap: 15,
    marginBottom: 100,
  },
  userInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A3780',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
  },
  passInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A3780',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 5,
  },
  bottomButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 243,
  },
  loginButton: {
    backgroundColor: '#4A3780',
    borderRadius: 50,
    height: 56,
  },
  loginButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    height: 56,
    lineHeight: 56,
  },
  userInputError: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#cc0000',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
  },
  passInputError: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#cc0000',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 5,
  },
  errorStyle: {
    color: '#cc0000',
    fontSize: 12,
    fontWeight: 'bold',
  }
});


export default function Login({ navigation }) {

  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })
  const { setUsername, setPassword, setUserId, setEmail, setPhone } = useContext(UserContext);
  const handleChange = (text, field) => {
    setUser((prevState) => ({ ...prevState, [field]: text }));
  }
  const handleError = (text, field) => {
    setErrors((prevState) => ({ ...prevState, [field]: text }));
  }
  const validate = async () => {
    Keyboard.dismiss();
    var valid = true;

    if (!user.username) {
      handleError('Please enter your username !', 'username');
      valid = false;
    }
    if (!user.password) {
      handleError('Please enter your password !', 'password');
      valid = false;
    }
    else if(user.password.length < 5){
      handleError('Not a valid password !', 'password');
      valid = false;
    }

    if (valid) {
      setUsername(user.username);
      setPassword(user.password);
      setLoading(true);
      var logged = await basePostRequest('users/login', user).finally(() => { setLoading(false); })
      if (logged.receivedData !== null) {
        setUserId(logged.receivedData.id);
        setEmail(logged.receivedData.email);
        setPhone(logged.receivedData.phone);
        navigation.navigate('cHector');
      }
      else {
        Alert.alert('Something went wrong', 'Please try again later !');
      }

    }
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color='#4A3780' animating={loading} />
        <Text style={{ ...styles.loginText, marginTop: 15 }}>Logging you in</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'>

        <View style={styles.container}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 15, marginBottom: 15 }}>Username: </Text>
            <View style={errors.username ? styles.userInputError : styles.userInput}>
              <TextInput
                onFocus={() => handleError(null, 'username')}
                onChangeText={(text) => handleChange(text, 'username')}
                value={user.username}
                placeholder='Enter your username'
                style={{
                  width: 210, fontSize: 20,
                }}
              />
            </View>
            {errors.username && <Text style={styles.errorStyle}>{errors.username}</Text>}


            <Text style={{ fontSize: 15, marginBottom: 15 }}>Password: </Text>
            <View style={errors.password ? styles.passInputError : styles.passInput}>
              <TextInput
                autoComplete='off' autoCorrect={false} secureTextEntry={hidePass}
                onFocus={() => handleError(null, 'password')}
                onChangeText={(text) => handleChange(text, 'password')}
                value={user.password}
                placeholder='Enter your password'
                style={{
                  width: 210, fontSize: 20,
                }}
              />
              <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                <MaterialCommunityIcons name={hidePass ? 'eye-off-outline' : 'eye-outline'} color={'#4A3780'} size={25} />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorStyle}>{errors.password}</Text>}

          </View>
          <View style={styles.bottomButtons}>
            <View style={{
              width: 358
            }}>
              <TouchableOpacity style={styles.loginButton} onPress={() => {
                validate();
              }}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

