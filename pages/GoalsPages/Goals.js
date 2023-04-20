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
      width: 350,
      margin: 10,
      padding: 5,
      backgroundColor: '#4A3780',
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 22
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
         
          <View style={{
            width: 358
          }}>
            <TouchableOpacity style={styles.addButton} onPress={() => {
              //TODO: Navigate to edit account form
              navigation.navigate('AddGoal');
            }}>
              <Text style={styles.addButtonText}>Add goals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
