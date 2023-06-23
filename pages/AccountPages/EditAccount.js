import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect } from 'react';
import { basePutRequest } from '../../hooks/requestHelper';
import { UserContext } from '../../context/userContext';




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
        username: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phone: ''
    });

    const { userId } = useContext(UserContext);

    const validate = async () => {
        Keyboard.dismiss();
        var valid = true;
        if (!userEdit.username) {
            handleError('Please enter your username !', 'username');
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


        if (valid) {
            handleError(null, 'username');
            handleError(null, 'email');
            handleError(null, 'phone');

            var editedUser = await basePutRequest('users/' + userId, userEdit);
            if (editedUser.receivedData !== null) {
                Alert.alert("Edit successful", "You have successfully edited your profile !",
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('AccountStack'),
                            style: 'default'
                        }
                    ]);
            }
            else {
                Alert.alert("Edit failed", "Something went wrong, try again later !");
            }
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
                    <View style={errors.username ? styles.accountEditInputWrapperError : styles.accountEditInputWrapper}>
                        <MaterialCommunityIcons name='account-outline' color={'#4A3780'} size={35} />
                        <TextInput
                            onChangeText={(text) => handleChange(text, 'username')}
                            value={userEdit.username}
                            placeholder='e.g. JohnDoe'
                            style={styles.accountInputField}
                            onFocus={() => {
                                handleError(null, 'username');
                            }}
                        />
                    </View>
                    {errors.username && <Text style={styles.errorStyle}>{errors.username}</Text>}

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
                </View>
                <View style={{
                    width: 358
                }}>
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        validate();
                    }}>
                        <Text style={styles.submitButtonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}



