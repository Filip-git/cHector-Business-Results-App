import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Portal, Provider } from 'react-native-paper';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
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
    inpContainer: {
        width: 350,
        marginBottom: 30,

    },
    textInp: {
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        backgroundColor: '#D3D3D3',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: '#4A3780',
        borderRadius: 50,
        height: 56,
        marginTop: 55,
        marginBottom: 15,
        width: 358
    },

    txtSave: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        height: 56,
        lineHeight: 56,
    },
    calendarBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        columnGap: 35,
    },
    dateTextStyle: {
        width: 235,
        borderRadius: 15,
        padding: 2,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    wrapper: {
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
    }
})

export default function AddGoal() {
    const today = new Date();

    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date);
    const [dateText, setDateText] = useState('Click here to pick a date');

    const showModal = () => {
        setShow(!show);
    }
    const showModalCancel = () => {
        setDateText('Click here to pick a date');
        setShow(!show);
    }

    const handleChange = (selectedDate) => {
        const formated = selectedDate.replaceAll('/', '-');
        const currentDate = new Date(formated);
        setDate(currentDate);
        setDateText(selectedDate);
    }

    return (
        <Provider>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.inpContainer}>
                            <Text style={styles.txt}>Goal Title</Text>
                            <TextInput
                                style={styles.textInp}
                            />
                        </View>

                        <View style={styles.wrapper}>
                            <MaterialIcons name='date-range' color={'#4A3780'} size={35} />
                            <TouchableOpacity onPress={() => showModal()}>
                                <Text style={styles.dateTextStyle}>
                                    {dateText}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Portal>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={show}
                            >

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <DatePicker
                                            mode='calendar'
                                            minimumDate={startDate}
                                            selected={getFormatedDate(date, 'DD/MM/YYYY')}
                                            onDateChange={handleChange}
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


                        <View style={styles.inpContainer}>
                            <Text style={styles.txt}>Notes</Text>
                            <TextInput
                                multiline
                                numberOfLines={8}
                                style={styles.textInp}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnContainer}>
                            <Text style={styles.txtSave}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </Provider>

    )
}
