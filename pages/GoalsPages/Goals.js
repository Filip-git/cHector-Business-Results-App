import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Goal from '../../models/Goal';
import getTasksOrGoals from '../../hooks/TaskHooks/getTasksOrGoals';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Goals({ navigation }) {
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
    goalsWrapper: {
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
  });

  const { goals } = getTasksOrGoals('goals');
  const completedGoals = [];
  const notCompletedGoals = [];

  if (goals !== undefined) {
    goals.forEach(element => {
      if (element.completed) {
        completedGoals.push(element);
      } else {
        notCompletedGoals.push(element);
      }
    });
  }

  const hasNotCompletedGoals = notCompletedGoals.length > 0;
  const hasCompletedGoals = completedGoals.length > 0;

  return (
    <ScrollView>
      <View style={styles.background} />

      <View style={styles.container}>
        <View style={hasNotCompletedGoals ? styles.goalsWrapper : styles.emptyWrapper}>
          {notCompletedGoals !== undefined && notCompletedGoals.map((element, index) => (
            <Goal key={element.id} goal={element} last={index === notCompletedGoals.length - 1} />
          ))}
          {!hasNotCompletedGoals && (
            <View style={{ ...styles.emptyWrapper, padding: 5 }}>
              <Text style={styles.emptyText}>No goals found</Text>
              <Entypo name='emoji-sad' color={'#ffffff'} size={35} />
            </View>
          )}
        </View>

        {hasCompletedGoals && (
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', width: screenWidth - 25 }}>
            Completed
          </Text>
        )}

        <View style={hasCompletedGoals ? styles.goalsWrapper : styles.emptyWrapper}>
          {completedGoals !== undefined && completedGoals.map((element, index) => (
            <Goal key={element.id} goal={element} last={index === completedGoals.length - 1} />
          ))}
        </View>

        <View style={{ width: screenWidth - 25 }}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddGoal')}>
            <Text style={styles.addButtonText}>Add goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}