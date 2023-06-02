import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getFormatedDate } from 'react-native-modern-datepicker'
import { CheckBox } from 'react-native-elements'


interface ITask {
  id: string,
  title: string,
  taskType: string,
  date: Date,
  notes: string,
  completed: boolean
}
interface ITaskProps {
  task: ITask,
  last: boolean
}



export default function Task(props: ITaskProps) {
  const screenWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
    taskRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: screenWidth - 25,
      padding: 16,
      borderBotomColor: '#999999',
      borderBottomWidth: 1,
      borderRadius: 7,
    },
    lastTaskRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: screenWidth - 25,
      padding: 16,
      borderBottomWidth: 0,
    },
    taskCategoryDocument: {
      backgroundColor: '#b3d9ff',
      borderRadius: 35,
      padding: 5,
    },
    taskCategoryPrototype: {
      backgroundColor: '#ffe6b3',
      borderRadius: 35,
      padding: 5,
    },
    taskCategoryTraining: {
      backgroundColor: '#ffffb3',
      borderRadius: 35,
      padding: 5,
    },
    taskCategoryMeeting: {
      backgroundColor: '#ecc6ec',
      borderRadius: 35,
      padding: 5,
    },
    textContainer: {
      rowGap: 2,
      width: (screenWidth - 25) / 1.8,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    textNotes: {
      fontSize: 16,
      fontWeight: '500',
    },
    textDate: {
      fontSize: 17,
    },
    textTitleComp: {
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'line-through',
    },
    textNotesComp: {
      fontSize: 16,
      fontWeight: '500',
      textDecorationLine: 'line-through',
    },
    textDateComp: {
      fontSize: 17,
      textDecorationLine: 'line-through',
    },
    checkBox: {
      margin: 0,
      marginLeft: 0,
      marginRight: 0,
      padding: 5,
    }

  })

  const { task } = props;
  const { id, title, taskType, date, notes, completed } = task;
  const { last } = props;

  return (
    <View>
      <View style={last ? styles.lastTaskRow : styles.taskRow}>
        <View>
          {taskType.includes('DOCUMENT') &&
            <View style={styles.taskCategoryDocument}>
              <Entypo name='text-document' color={'#000000'} size={35} />
            </View>
          }
          {taskType.includes('PROTOTYPE') &&
            <View style={styles.taskCategoryPrototype}>
              <MaterialCommunityIcons name='toolbox-outline' color={'#000000'} size={35} />
            </View>
          }
          {taskType.includes('TRAINING') &&
            <View style={styles.taskCategoryTraining}>
              <Ionicons name='trophy-outline' color={'#000000'} size={35} />
            </View>
          }
          {taskType.includes('MEETING') &&
            <View style={styles.taskCategoryMeeting}>
              <MaterialCommunityIcons name='calendar' color={'#000000'} size={35} />
            </View>
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={completed ? styles.textTitleComp : styles.textTitle}>{title}</Text>
          <Text style={completed ? styles.textNotesComp : styles.textNotes} numberOfLines={2}>{notes}</Text>
          <Text style={completed ? styles.textDateComp : styles.textDate}>{getFormatedDate(date, 'DD/MM/YYYY')}</Text>
        </View>
        {/* TODO: Make the checkbox clickable */}
        <CheckBox containerStyle={styles.checkBox} checked={completed} disabled={true} right={true} checkedColor='#4A3780' uncheckedColor='#4A3780' />


      </View>

    </View>
  )
}