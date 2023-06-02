import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getFormatedDate } from 'react-native-modern-datepicker'
import { CheckBox } from 'react-native-elements'


interface IGoal {
    id: string,
    title: string,
    goalType: string,
    date: Date,
    notes: string,
    completed: boolean
}
interface IGoalProps {
    goal: IGoal,
    last: boolean
}



export default function Goal(props: IGoalProps) {
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        goalRow: {
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
        lastGoalRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: screenWidth - 25,
            padding: 16,
            borderBottomWidth: 0,
        },
        goalCategoryDocument: {
            backgroundColor: '#b3d9ff',
            borderRadius: 35,
            padding: 5,
        },
        goalCategoryPrototype: {
            backgroundColor: '#ffe6b3',
            borderRadius: 35,
            padding: 5,
        },
        goalCategoryTraining: {
            backgroundColor: '#ffffb3',
            borderRadius: 35,
            padding: 5,
        },
        goalCategoryMeeting: {
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

    const { goal } = props;
    const { id, title, goalType, date, notes, completed } = goal;
    const { last } = props;

    return (
        <View>
            <View style={last ? styles.lastGoalRow : styles.goalRow}>
                <View>
                    {goalType.includes('DOCUMENT') &&
                        <View style={styles.goalCategoryDocument}>
                            <Entypo name='text-document' color={'#000000'} size={35} />
                        </View>
                    }
                    {goalType.includes('PROTOTYPE') &&
                        <View style={styles.goalCategoryPrototype}>
                            <MaterialCommunityIcons name='toolbox-outline' color={'#000000'} size={35} />
                        </View>
                    }
                    {goalType.includes('TRAINING') &&
                        <View style={styles.goalCategoryTraining}>
                            <Ionicons name='trophy-outline' color={'#000000'} size={35} />
                        </View>
                    }
                    {goalType.includes('MEETING') &&
                        <View style={styles.goalCategoryMeeting}>
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