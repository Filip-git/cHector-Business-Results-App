import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Modal, Portal, Provider } from 'react-native-paper'
import DatePicker from 'react-native-modern-datepicker'
import { getFormatedDate } from 'react-native-modern-datepicker'


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
    const [date, setDate] = useState(new Date);
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState('Click here to pick a date');

    const showModal = () => {
        setShow(!show);
    }
    const showModalCancel = () => {
        setDateText('Click here to pick a date');
        setShow(!show);
    }
    const onChange = (selectedDate) => {
        const formated = selectedDate.replaceAll('/','-');
        const currentDate = new Date(formated);
        setDate(currentDate);
        setDateText(selectedDate);
    }

    return (
        <Provider>
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
                            <TouchableOpacity onPress={() => showModal()}>
                                <Text style={styles.accountInputField}>
                                    {dateText}
                                </Text>
                            </TouchableOpacity>
                            <Portal>
                                <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={show}
                                >
                                    <View >
                                        <View style={styles.modalView}>
                                            <DatePicker
                                                mode='calendar'
                                                selected={getFormatedDate(date,'DD/MM/YYYY')}
                                                onDateChange={onChange}
                                                options={{
                                                    textHeaderColor: '#4A3780',
                                                    textDefaultColor: '#4A3780',
                                                    selectedTextColor: '#ffffff',
                                                    mainColor: '#4A3780',
                                                    textSecondaryColor: '#4A3780',
                                                }}
                                            />
                                            <View style={styles.calendarBtns}>
                                                <TouchableOpacity onPress={showModal}>
                                                    <Text style={{
                                                        color: '#4A3780',
                                                        fontSize: 18,
                                                        fontWeight: 'bold'
                                                    }}>Confirm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={showModalCancel}>
                                                    <Text style={{
                                                        color: '#4A3780',
                                                        fontSize: 18,
                                                        fontWeight: 'bold'
                                                    }}>Close</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>

                                </Modal>
                            </Portal>

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
        </Provider>

    )
}



