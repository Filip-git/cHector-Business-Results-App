import React from 'react';
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:8080/';

const baseGetRequest = async (endpoint: string) => {
    const url = baseUrl + endpoint;
    let data = [];
    const response = await axios.get(url).catch(function (error) {
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
        data = response.data;
    }

    return { data }
}

const basePostRequest = async (endpoint: string, body: any) => {

    const url = baseUrl + endpoint;
    var receivedData = null;

    const response = await axios.post(url, body).catch(function (error) {
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
        receivedData = response.data;
    }

    return { receivedData }

}

export { baseGetRequest, basePostRequest };