import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default function EditAccount() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text>EditAccount</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}



