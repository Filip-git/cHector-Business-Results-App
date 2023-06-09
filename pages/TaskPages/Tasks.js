import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import Task from '../../models/Task';
import Entypo from 'react-native-vector-icons/Entypo';
import { baseGetRequest, basePutRequest } from '../../hooks/requestHelper';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

export default function Tasks({ navigation }) {
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        background: {
            backgroundColor: '#4A3780',
            height: 122,
            width: screenWidth,
            position: 'absolute',
        },
        addButton: {
            backgroundColor: '#4A3780',
            borderRadius: 50,
            height: 56,
            marginTop: 55,
            marginBottom: 15,
        },
        addButtonText: {
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            height: 56,
            lineHeight: 56,
        },
        tasksWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#4A3780',
            borderRadius: 16,
            borderWidth: 3,
            marginTop: 10,
            marginBottom: 5,
            backgroundColor: '#ffffff'
        },
        emptyWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 5,
        },
        emptyText: {
            fontWeight: 'bold',
            fontSize: 35,
            color: '#ffffff'
        }
    })
    const [tasks, setTasks] = useState([]);
    const [animate, setAnimate] = useState(true);
    const [reloadTasks, setReloadTasks] = useState();

    const completeTheTask = async (id, task) => {
        const url = 'tasks/' + id;
        const updateTask = task;
        updateTask.completed = true;
        const updated = await basePutRequest(url, updateTask);
        if (updated.receivedData !== null) {
            Alert.alert("Task completed", "You have successfully completed " + updated.receivedData.title + " !",
                [
                    {
                        text: 'OK',
                        onPress: () => setReloadTasks(updated.receivedData),
                        style: 'default'
                    }
                ]);
        }
        else {
            Alert.alert("Task couldn't be completed", "Something went wrong, try again later !");
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const fetchData = async () => {
                const { data } = await baseGetRequest('tasks');

                if (isActive) {
                    setTasks(data);
                }
            };
            fetchData();
            setAnimate(true);
            return () => {
                isActive = false;
            };
        }, [reloadTasks])
    );
    const completed = [];
    const notCompleted = [];
    if (tasks !== undefined) {
        tasks.forEach(element => {
            if (element.completed) {
                completed.push(element);
            }
            else {
                notCompleted.push(element);
            }
        });
    }
    return (
        <ScrollView>
            <View style={styles.background} />
            <View style={styles.container}>
                <View style={notCompleted.length > 0 ? styles.tasksWrapper : styles.emptyWrapper}>
                    {notCompleted !== undefined && notCompleted.map((element, index) => {
                        return <TouchableOpacity key={index} onPress={() => {
                            Alert.alert("Task completed ?", "Would you like to mark " + element.title + " as completed ?",
                                [
                                    {
                                        text: 'Yes',
                                        onPress: async () => await completeTheTask(element.id, element),
                                        style: 'default'
                                    },
                                    {
                                        text: 'No',
                                        onPress: () => { },
                                        style: 'cancel'
                                    }
                                ]);
                        }}>
                            <Task key={index} task={element} last={(index === notCompleted.length - 1) ? true : false} />
                        </TouchableOpacity>
                    })}
                    {notCompleted.length === 0 &&
                        (
                            <View>
                                {setTimeout(() => {
                                    setAnimate(false);
                                }, 7000) &&
                                    <View style={animate ? { ...styles.emptyWrapper, padding: 5 } : { display: 'none' }}>
                                        <ActivityIndicator size={'large'} color='#ffffff' animating={animate} style={animate ? {} : { display: 'none' }} />
                                    </View>
                                }
                                {!animate && <View style={{
                                    ...styles.emptyWrapper, padding: 5, marginTop: 0, marginBottom: 0
                                }}>
                                    <Text style={styles.emptyText}>No tasks found</Text>
                                    <Entypo name='emoji-sad' color={'#ffffff'} size={35} />
                                </View>}
                            </View>
                        )}
                </View>

                {completed.length > 0 && <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', width: screenWidth - 25 }}>Completed</Text>}

                <View style={completed.length > 0 ? styles.tasksWrapper : styles.emptyWrapper}>
                    {completed !== undefined && completed.map((element, index) => {
                        return <Task key={index} task={element} last={(index === completed.length - 1) ? true : false} />
                    })}
                </View>

                <View style={{
                    width: 358
                }}>
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        navigation.navigate('AddTask');
                    }}>
                        <Text style={styles.addButtonText}>Add tasks</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

