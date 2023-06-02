import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect } from 'react';



const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
    accountEditInputWrapperError: {
        borderBottomColor: '#cc0000',
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    calendarBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        columnGap: 35,
    },
    errorStyle: {
        color: '#cc0000',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 15
    }
})


export default function EditAccount({ navigation, route }) {
    useEffect(() => {
        if (!navigation || !route) return

        const parentNavigator = navigation.getParent('cHector');

        if (parentNavigator) {
            if (route.name === 'EditAccount') {
                parentNavigator.setOptions({
                    headerShown: false,
                })
            }
        }

        return parentNavigator
            ? () => {
                parentNavigator.setOptions({
                    headerShown: true,
                })
            }
            : undefined
    }, [navigation, route]);
    const [userEdit, setUserEdit] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPass: ''
    });
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConf, setHidePassConf] = useState(true);

    const validate = () => {
        Keyboard.dismiss();
        var valid = true;
        if (!userEdit.name) {
            handleError('Please enter your name !', 'name');
            valid = false;
        }
        if (!userEdit.phone) {
            handleError('Please enter your phone number !', 'phone');
            valid = false;
        }
        if (!userEdit.email) {
            handleError('Please enter your email !', 'email');
            valid = false;
        } else if (!userEdit.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please enter a valid email !', 'email');
            valid = false;
        }
        if (!userEdit.password) {
            handleError('Please enter a new password !', 'password');
            valid = false;
        } else if (userEdit.password !== userEdit.confirmPass) {
            handleError('Password and confirmation don\'t match !', 'password');
            valid = false;
        }

        if (!userEdit.confirmPass) {
            handleError('Please confirm your password !', 'confirmPass');
            valid = false;
        } else if (userEdit.confirmPass !== userEdit.password) {
            handleError('Password and confirmation don\'t match !', 'confirmPass');
            valid = false;
        }
        if (valid) {
            //TODO: Send request


            handleError(null, 'name');
            handleError(null, 'phone');
            handleError(null, 'email');
            handleError(null, 'password');
            handleError(null, 'confirmPass');

            Alert.alert("Edit successful", "You have successfully edited your profile !")
        }

    }
    const handleChange = (text, field) => {
        setUserEdit((prevState) => ({ ...prevState, [field]: text }))
    }
    const handleError = (errorMessage, field) => {
        setErrors((prevState) => ({ ...prevState, [field]: errorMessage }))
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.accountEditWrapper}>
                    <View style={errors.name ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='account-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => handleChange(text, 'name')}
                            value={userEdit.name}
                            placeholder='e.g. John Doe'
                            style={styles.accountInputField}
                            onFocus={() => {
                                handleError(null, 'name');
                            }}
                        />
                    </View>
                    {errors.name && <Text style={styles.errorStyle}>{errors.name}</Text>}

                    <View style={errors.phone ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='phone' color={'#4A3780'} size={35} />
                        <TextInput
                            keyboardType='numeric'
                            onChangeText={(text) => handleChange(text, 'phone')}
                            value={userEdit.phone}
                            placeholder='e.g. 000/000-000'
                            style={styles.accountInputField}
                            onFocus={() => {
                                handleError(null, 'phone');
                            }}
                        />
                    </View>
                    {errors.phone && <Text style={styles.errorStyle}>{errors.phone}</Text>}

                    <View style={errors.email ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='email-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => handleChange(text, 'email')}
                            value={userEdit.email}
                            placeholder='e.g. john.doe@gmail.com'
                            style={styles.accountInputField}
                            onFocus={() => {
                                handleError(null, 'email');
                            }}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorStyle}>{errors.email}</Text>}

                    <View style={errors.password ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='lock-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => handleChange(text, 'password')}
                            value={userEdit.password}
                            placeholder='Enter password'
                            style={styles.accountInputPassField}
                            secureTextEntry={hidePass}
                            onFocus={() => {
                                handleError(null, 'password');
                            }}
                        />
                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            <MaterialCommunityIcons name={hidePass ? 'eye-off-outline' : 'eye-outline'} color={'#4A3780'} size={25} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorStyle}>{errors.password}</Text>}

                    <View style={errors.confirmPass ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='lock-check-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => handleChange(text, 'confirmPass')}
                            value={userEdit.confirmPass}
                            placeholder='Confirm password'
                            style={styles.accountInputPassField}
                            secureTextEntry={hidePassConf}
                            onFocus={() => {
                                handleError(null, 'confirmPass');
                            }}
                        />
                        <TouchableOpacity onPress={() => setHidePassConf(!hidePassConf)}>
                            <MaterialCommunityIcons name={hidePassConf ? 'eye-off-outline' : 'eye-outline'} color={'#4A3780'} size={25} />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPass !== null && <Text style={styles.errorStyle}>{errors.confirmPass}</Text>}

                </View>
                <View style={{
                    width: 358
                }}>
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        //TODO: Send request and update user data
                        validate();
                    }}>
                        <Text style={styles.submitButtonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}



