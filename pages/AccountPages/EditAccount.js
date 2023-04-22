import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#4A3780',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 7,
        marginTop: 17
    },
    accountEditWrapper: {
        width: screenWidth - 55,
    },
    accountEditInputWrapper: {
        borderBottomColor: '#4A3780',
        borderBottomWidth: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        columnGap: 35,
        margin: 15,
        height: 55,
    },
    accountInputField: {
        width: 235,
        borderRadius: 15,
        padding: 2,
        fontSize: 18,
    },
    accountInputPassField: {
        width: 170,
        borderRadius: 15,
        padding: 2,
        fontSize: 18,
    },
    submitButton: {
        backgroundColor: '#4A3780',
        borderRadius: 50,
        height: 56,
        marginTop: 55,
        marginBottom: 15,
    },
    submitButtonText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        height: 56,
        lineHeight: 56,
    }
})


export default function EditAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirm] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headerText}>Edit Your Profile</Text>
                </View>
                <View style={styles.accountEditWrapper}>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='account-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => setName(text)}
                            value={name}
                            placeholder='e.g. John Doe'
                            style={styles.accountInputField}
                        />
                    </View>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialIcons name='date-range' color={'#4A3780'} size={35} />
                        {/* This needs to be a date pciker */}
                        <TextInput
                            onChangeText={(text) => { }}
                            value={''}
                            placeholder='e.g. John Doe'
                            style={styles.accountInputField}
                        />
                    </View>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='phone' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                            placeholder='e.g. 000/000-000'
                            style={styles.accountInputField}
                        />
                    </View>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='email-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder='e.g. john.doe@gmail.com'
                            style={styles.accountInputField}
                        />
                    </View>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='lock-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholder='Enter password'
                            style={styles.accountInputPassField}
                            secureTextEntry={hidePass}
                        />
                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            <MaterialCommunityIcons name={hidePass ? 'eye-off-outline' : 'eye-outline'} color={'#4A3780'} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='lock-check-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => setConfirm(text)}
                            value={confirmPass}
                            placeholder='Confirm password'
                            style={styles.accountInputPassField}
                            secureTextEntry={hidePassConf}
                        />
                        <TouchableOpacity onPress={() => setHidePassConf(!hidePassConf)}>
                            <MaterialCommunityIcons name={hidePassConf ? 'eye-off-outline' : 'eye-outline'} color={'#4A3780'} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: 358
                }}>
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        //TODO: Send request and update user data
                        Alert.alert("Something went wrong", "Try again later!");
                    }}>
                        <Text style={styles.submitButtonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}



