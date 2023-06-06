import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
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
  const completed = [];
  const notCompleted = [];
  if (goals !== undefined) {
    goals.forEach(element => {
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

        <View style={notCompleted.length > 0 ? styles.goalsWrapper : styles.emptyWrapper}>
          {notCompleted !== undefined && notCompleted.map((element, index) => {
            return <Goal key={index} goal={element} last={(index === notCompleted.length - 1) ? true : false} />
          })}
          {notCompleted.length === 0 &&
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
              <Text style={styles.emptyText}>No goals found</Text>
              <Entypo name='emoji-sad' color={'#ffffff'} size={35} />
            </View>
          }
        </View>

        {completed.length > 0 && <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', width: screenWidth - 25 }}>Completed</Text>}

        <View style={completed.length > 0 ? styles.goalsWrapper : styles.emptyWrapper}>
          {completed !== undefined && completed.map((element, index) => {
            return <Goal key={index} goal={element} last={(index === completed.length - 1) ? true : false} />
          })}
        </View>

        <View style={{
          width: 358
        }}>
          <TouchableOpacity style={styles.addButton} onPress={() => {
            navigation.navigate('AddGoal');
          }}>
            <Text style={styles.addButtonText}>Add goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
