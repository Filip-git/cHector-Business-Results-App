import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserContext } from '../../context/userContext'
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { baseGetRequest } from '../../hooks/requestHelper';


export default function Account({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
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
    logOutButton: {
      backgroundColor: '#4A3780',
      borderRadius: 50,
      height: 56,
      marginTop: 15,
      width: screenWidth / 3,
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

  const { userId, username, setUsername, email, setEmail, phone, setPhone, logOut } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoading(true);

      const fetchData = async () => {
        const url = "users/" + userId;
        const { data } = await baseGetRequest(url).finally(()=> {setLoading(false); });
        if (isActive && data !== null) {
          setUsername(data.username);
          setEmail(data.email);
          setPhone(data.phone);
        }
      };
      fetchData();
      return () => {
        isActive = false;
      };
    }, [])
  );

  if(loading){
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color='#4A3780' animating={loading} />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            {/* TODO: Repalce icon with profile image */}
            <MaterialCommunityIcons name='account-box-outline' color={'#4A3780'} size={125} />
            <TouchableOpacity style={styles.logOutButton} onPress={() => {
              //TODO: Logout the user
              logOut();
              navigation.popToTop();
            }}>
              <Text style={styles.editButtonText}>Log out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accountDetailsWrapper}>
            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='account-outline' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>{username}</Text>

            </View>
            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='phone' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>{phone}</Text>

            </View>

            <View style={styles.accountDetails}>
              <MaterialCommunityIcons name='email-outline' color={'#4A3780'} size={35} />
              <Text style={styles.accountDetailsText}>{email}</Text>

            </View>

          </View>
          <View style={{
            width: 358
          }}>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              navigation.navigate('EditAccount');
            }}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
