import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native'

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
    borderBottomColor: '#000000',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
  },
  passInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    width: 243,
    marginBottom: 15,
    fontSize: 20,
    padding: 3,
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
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    height:56
  }


});


export default function Login({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'>

        <View style={styles.container}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 15, marginBottom: 15 }}>Username: </Text>
            <TextInput style={styles.userInput}>

            </TextInput>

            <Text style={{ fontSize: 15, marginBottom: 15 }}>Pasword: </Text>
            <TextInput style={styles.passInput} autoComplete='off' autoCorrect={false} secureTextEntry={true}>

            </TextInput>
          </View>

          <View style={styles.bottomButtons}>
            <Text onPress={() => {
              //TODO: Implement forgot password form
              Alert.alert("Somethings went wrong","Try again later!");
            }} style={{ marginBottom: 25, textDecorationLine: 'underline' }}>Forgot password?</Text>
            <View style={{
              width: 358
            }}>
              <TouchableOpacity style={styles.loginButton} onPress={() => {
                //TODO: Implement login on success and failure
                navigation.navigate('cHector');
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

