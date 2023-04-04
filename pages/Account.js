import { StyleSheet, SafeAreaView, Text, View,ScrollView } from 'react-native'
import React from 'react'

export default function Account() {
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
                <Text>Account</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
