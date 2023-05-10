import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Goals({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButton: {
      backgroundColor: '#4A3780',
      borderRadius: 50,
      height: 56,
      marginTop: 55,
      marginBottom: 15,
    },
    addButtonText: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      height: 56,
      lineHeight: 56,
    },
  });

  return (
      <ScrollView>
        <View style={styles.container}>

          <View style={{
            width: 358
          }}>
            <TouchableOpacity style={styles.addButton} onPress={() => {
              //TODO: Navigate to add goal form
              navigation.navigate('AddGoal');
            }}>
              <Text style={styles.addButtonText}>Add goals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  )
}
