import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, Keyboard } from 'react-native'
import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Portal, Provider } from 'react-native-paper';

export default function AddTask() {
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
            marginBottom: 7,
        },
        titleInp: {
            borderWidth: 1,
            padding: 7,
            marginTop: 5,
            borderColor: '#4A3780',
            borderWidth: 2,
            borderRadius: 15,
            fontSize: 18,
        },
        titleInpError: {
            borderWidth: 1,
            padding: 7,
            marginTop: 5,
            borderColor: '#cc0000',
            borderWidth: 2,
            borderRadius: 15,
            fontSize: 18,
        },
        notesInput: {
            borderWidth: 1,
            padding: 9,
            marginTop: 5,
            borderColor: '#4A3780',
            borderWidth: 2,
            borderRadius: 15,
            textAlignVertical: 'top',
            fontSize: 18,
        },
        notesInputError: {
            borderWidth: 1,
            padding: 9,
            marginTop: 5,
            borderColor: '#cc0000',
            borderWidth: 2,
            borderRadius: 15,
            textAlignVertical: 'top',
            fontSize: 18,
        },
        titleText: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        txt: {
            fontSize: 15,
            fontWeight: 'bold',
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
        },
        wrapperError: {
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
        errorStyle: {
            color: '#cc0000',
            fontSize: 12,
            fontWeight: 'bold',
        }
    })



    const today = new Date();

    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

    const [show, setShow] = useState(false);

    const [insertTask, setInsertTask] = useState({
        title: '',
        date: 'Click here to pick a date',
        description: '',
    })
    const [errors, setErrors] = useState({
        title: '',
        date: '',
        description: ''
    })

    const showModal = () => {
        setShow(!show);
        handleError(null, 'date');
    }
    const showModalCancel = () => {
        setInsertTask((prevState) => ({ ...prevState, ['date']: 'Click here to pick a date' }));
        setShow(!show);
    }

    const handleDateChange = (selectedDate) => {
        const formated = selectedDate.replaceAll('/', '-');
        const currentDate = new Date(formated);
        const formatedDate = getFormatedDate(currentDate, 'DD/MM/YYYY');
        setInsertTask((prevState) => ({ ...prevState, ['date']: formatedDate }));
    }
    const handleChange = (text, field) => {
        setInsertTask((prevState) => ({ ...prevState, [field]: text }));
    }
    const handleError = (errorMessage, field) => {
        setErrors((prevState) => ({ ...prevState, [field]: errorMessage }));
    }
    const validate = () => {
        Keyboard.dismiss();
        var valid = true;
        if (!insertTask.title) {
            handleError('Please enter a task title !', 'title');
            valid = false;
        }
        if (!insertTask.description) {
            handleError('Please enter a description for the task !', 'description');
            valid = false;
        }
        if (insertTask.date === 'Click here to pick a date') {
            handleError('Please pick a deadline for the task !', 'date');
            valid = false;
        }
        if (valid) {
            //TODO: Send request


            handleError(null, 'title');
            handleError(null, 'description');
            handleError(null, 'date');



            Alert.alert("New task added", "You have successfully added a new task !")
        }
    }

    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.headerText}>Add a new task</Text>
                    </View>
                    <View style={styles.inpContainer}>
                        <Text style={styles.txt}>Task Title</Text>
                        <TextInput
                            style={errors.title ? styles.titleInpError : styles.titleInp}
                            onChangeText={(text) => handleChange(text, 'title')}
                            onFocus={() => { handleError(null, 'title') }}
                        />
                    </View>
                    {errors.title && <Text style={styles.errorStyle}>{errors.title}</Text>}

                    <View style={errors.date ? styles.wrapperError : styles.wrapper}>
                        <MaterialIcons name='date-range' color={errors.date ? '#cc0000' : '#4A3780'} size={35} />
                        <TouchableOpacity onPress={() => showModal()}>
                            <Text style={styles.dateTextStyle}>
                                {insertTask.date}
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
                                        selected={insertTask.date}
                                        onDateChange={handleDateChange}
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
                    {errors.date && <Text style={styles.errorStyle}>{errors.date}</Text>}

                    <View style={styles.inpContainer}>
                        <Text style={styles.txt}>Notes</Text>
                        <TextInput
                            multiline
                            numberOfLines={8}
                            style={errors.description ? styles.notesInputError : styles.notesInput}
                            onChangeText={(text) => handleChange(text, 'description')}
                            onFocus={() => { handleError(null, 'description') }}
                        />
                    </View>
                    {errors.description && <Text style={styles.errorStyle}>{errors.description}</Text>}

                    <TouchableOpacity style={styles.btnContainer} onPress={() => {
                        //TODO: Send request and add a new task
                        validate();
                    }}>
                        <Text style={styles.txtSave}>Save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </Provider>

    )
}
