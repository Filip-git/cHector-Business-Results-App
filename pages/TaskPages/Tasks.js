import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Task from '../../models/Task';
import getTasksOrGoals from '../../hooks/TaskHooks/getTasksOrGoals';

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
        }
    })

    const { tasks } = getTasksOrGoals('tasks');
    
    const completed = [];
    const notCompleted = [];
    tasks.forEach(element => {
        if (element.completed) {
            completed.push(element);
        }
        else {
            notCompleted.push(element);
        }
    });
    return (
        <ScrollView>
            <View style={styles.background} />
            <View style={styles.container}>
                <View style={styles.tasksWrapper}>
                    {notCompleted !== undefined && notCompleted.map((element, index) => {
                        return <Task key={index} task={element} last={(index === notCompleted.length - 1) ? true : false} />
                    })}
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', width: screenWidth - 25 }}>Completed</Text>

                <View style={styles.tasksWrapper}>
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

