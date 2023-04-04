import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

export default function KPIScreen() {
  const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
  }
  });

  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <Text>KPI Screen</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

