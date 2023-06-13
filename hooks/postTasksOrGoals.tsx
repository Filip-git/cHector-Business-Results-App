import React from 'react'
import axios from 'axios';

const postTasksOrGoals = async (endpoint: string, body: any) => {
    const url = 'http://10.0.2.2:8080/' + endpoint;
    // const [inserted, setInserted] = useState({});
    var inserted = null;
    const response = await axios.post(url, body)
        .catch(function (error) {
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
        inserted = response.data;
    }

    return { inserted };
}

export default postTasksOrGoals