import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const getTasksOrGoals = (endpoint: string) => {
    const [tasks, setTasks] = useState<any[]>([]);
    const url = 'http://10.0.2.2:8080/' + endpoint;

    const fetchTasks = async () => {
        const response = await axios.get(
            url
        );

        if (response && response.data) {
            setTasks(response.data);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);


    return { tasks }
}

export default getTasksOrGoals