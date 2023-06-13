import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert, Keyboard } from 'react-native'
import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Portal, Provider } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect } from 'react';
import postTasksOrGoals from '../../hooks/postTasksOrGoals';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
        marginBottom: 15,

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
        padding: 2,
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
    },
})

const data = [
    { key: '1', value: 'Meeting' },
    { key: '2', value: 'Prototype' },
    { key: '3', value: 'Training' },
    { key: '4', value: 'Document' },
];

export default function AddGoal({ navigation, route }) {
    useEffect(() => {
        if (!navigation || !route) return

        const parentNavigator = navigation.getParent('cHector');

        if (parentNavigator) {
            if (route.name === 'AddGoal') {
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
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');
    const [dateText, setDateText] = useState("Click here to pick a date");
    const [show, setShow] = useState(false);
    const [insertGoal, setInsertGoal] = useState({
        title: '',
        goalType: '',
        date: '',
        notes: '',
        completed: false
    });
    const [errors, setErrors] = useState({
        title: '',
        date: '',
        notes: ''
    });

    const showModal = () => {
        setShow(!show);
        handleError(null, 'date');
    };

    const showModalCancel = () => {
        setInsertGoal((prevState) => ({ ...prevState, date: '' }));
        setDateText('Click here to pick a date');
        setShow(!show);
    };

    const handleDateChange = (selectedDate) => {
        setDateText(getFormatedDate(selectedDate.replaceAll('/', '-'), 'DD/MM/YYYY'));
        const selectedDateFormated = selectedDate.replaceAll('/', '-');
        setInsertGoal((prevState) => ({ ...prevState, date: selectedDateFormated }));
    };

    const handleChange = (text, field) => {
        if (field === 'goalType') {
            const upperCaseText = text.toUpperCase();
            setInsertGoal((prevState) => ({ ...prevState, [field]: upperCaseText }))
            console.log("Goaltype: " + insertGoal.goalType);
        }
        else {
            setInsertGoal((prevState) => ({ ...prevState, [field]: text }));
        }
    };

    const handleError = (text, field) => {
        setErrors((prevState) => ({ ...prevState, [field]: text }));
    };

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        if (!insertGoal.title) {
            handleError('Please enter a goal title!', 'title');
            valid = false;
        }
        if (!insertGoal.notes) {
            handleError('Please enter some notes for the goal!', 'notes');
            valid = false;
        }
        if (insertGoal.date === '') {
            handleError('Please pick a deadline for the goal!', 'date');
            valid = false;
        }

        if (valid) {
            handleError(null, 'title');
            handleError(null, 'notes');
            handleError(null, 'date');
            // TODO: Send request

            const inserted = postTasksOrGoals('goals', insertGoal);
            if (inserted !== null || inserted !== undefined) {
                Alert.alert('New goal added', 'You have successfully added a new goal!');
            }
            else {
                Alert.alert('Something went wrong', 'Please try again later!')
            }
        }
    };

    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inpContainer}>
                        <Text style={styles.txt}>Goal Title</Text>
                        <TextInput
                            style={errors.title ? styles.titleInpError : styles.titleInp}
                            onChangeText={(text) => handleChange(text, 'title')}
                            onFocus={() => handleError(null, 'title')}
                        />
                    </View>
                    {errors.title && <Text style={styles.errorStyle}>{errors.title}</Text>}

                    <View style={styles.inpContainer}>
                        <Text style={styles.txt}>Category</Text>
                        <View>
                            <SelectList
                                setSelected={(selected) => handleChange(selected, 'goalType')}
                                data={data}
                                save="value"
                            />
                        </View>
                    </View>

                    <View style={errors.date ? styles.wrapperError : styles.wrapper}>
                        <MaterialIcons name="date-range" color={errors.date ? '#cc0000' : '#4A3780'} size={35} />
                        <TouchableOpacity onPress={() => showModal()}>
                            <Text style={styles.dateTextStyle}>
                                {dateText}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Portal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={show}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <DatePicker
                                        mode="calendar"
                                        minimumDate={startDate}
                                        selected={insertGoal.date}
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
                            style={errors.notes ? styles.notesInputError : styles.notesInput}
                            onChangeText={(text) => handleChange(text, 'notes')}
                            onFocus={() => handleError(null, 'notes')}
                        />
                    </View>
                    {errors.notes && <Text style={styles.errorStyle}>{errors.notes}</Text>}

                    <TouchableOpacity style={styles.btnContainer} onPress={validate}>
                        <Text style={styles.txtSave}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Provider>
    );
}
