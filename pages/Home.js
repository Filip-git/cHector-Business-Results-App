import { StyleSheet, SafeAreaView, Text, View, TextInput, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native'

const Home = () => {


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
                <Text>Home page</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home