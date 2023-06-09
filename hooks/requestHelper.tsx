import React from 'react';
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:8080/';

function abortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);

    return abortController.signal;
}

const baseGetRequest = async (endpoint: string) => {
    const url = baseUrl + endpoint;
    let data = [];
    const response = await axios.get(url, { signal: abortSignal(10000) }).catch(function (error) {
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
    const response = await axios.post(url, body, { signal: abortSignal(10000) }).catch(function (error) {
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

const basePutRequest = async (endpoint: string, body: any) => {

    const url = baseUrl + endpoint;
    var receivedData = null;
    const response = await axios.put(url, body, { signal: abortSignal(10000) }).catch(function (error) {
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

export { baseGetRequest, basePostRequest, basePutRequest };