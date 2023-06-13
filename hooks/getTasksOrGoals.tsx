import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const getTasksOrGoals = (endpoint: string) => {
    const [tasksGoals, setTasksGoals] = useState<any[]>([]);
    const url = 'http://10.0.2.2:8080/' + endpoint;

    const fetchTasks = async () => {
        const response = await axios.get(
            url
        ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

        if (response && response.data) {
            setTasksGoals(response.data);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasksGoals }
}

export default getTasksOrGoals