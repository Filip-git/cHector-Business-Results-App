import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker'

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
        width: 350,
        margin: 10,
        padding: 5,
        backgroundColor: '#4A3780',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
    },

    txtSave: {
        color: 'white',
        fontSize: 22
    }
})

export default function AddGoal() {
    const today = new Date();

    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('12/12/2023');

    function handleOnPress() {
        setOpen(!open);
    }

    function handleChange(propDate) {
        setDate(propDate);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.inpContainer}>
                        <Text style={styles.txt}>Task Title</Text>
                        <TextInput
                            style={styles.textInp}
                        />
                    </View>

                    <TouchableOpacity onPress={handleOnPress}>
                        <Text style={styles.titleText}>Choose date (on click)</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open}
                    >

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <DatePicker
                                    mode='calendar'
                                    minimumDate={startDate}
                                    selected={date}
                                    onDateChanged={handleChange}
                                />

                                <TouchableOpacity onPress={handleOnPress}>
                                    <Text>Close</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>

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
    )
}
