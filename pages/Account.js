import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Account() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountDetails: {
      borderBottomColor: '#4A3780',
      borderBottomWidth: 2,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      columnGap: 15,
      margin: 15,
      height: 55,
    },
    accountDetailsText: {
      fontSize: 22
    },
    accountDetailsWrapper: {
      width: screenWidth - 55,
      marginTop: 55
    },
    editButton: {
      backgroundColor: '#4A3780',
      borderRadius: 50,
      height: 56,
      marginTop: 55,
      marginBottom: 15,
    },
    editButtonText: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      height: 56,
      lineHeight: 56,
    }


  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            {/* TODO: Repalce icon with profile image */}
            <MaterialCommunityIcons name='account-box-outline' color={'#4A3780'} size={125}/>
          </View>
          <View style={styles.accountDetailsWrapper}>
            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='account-outline' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>John Doe</Text>

            </View>
            <View style={styles.accountDetails}>
              <MaterialIcons name='date-range' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>062/328-552</Text>

            </View>
            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='phone' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>January 29th 1977</Text>

            </View>
            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='email-outline' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>john.doe@hotmail.com</Text>

            </View>

          </View>
          <View style={{
            width: 358
          }}>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              //TODO: Navigate to edit account form
              Alert.alert("Something went wrong", "Try again later!");
            }}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
