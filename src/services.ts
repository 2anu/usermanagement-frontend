import axios from 'axios';
import data from "./data.json";

// const userData = data.users;

const baseUrl = 'http://localhost:8080'

export const addNewUser = (payload: any) => {
    console.log("Payload:::", payload)
    // return new Promise((resolve, reject) => {
    //     // userData.push({ ...payload, id: userData.length + 1 });
    //     // resolve(userData);
    // })
    return axios.post(`${baseUrl}/users`, {
        ...payload
    })
}


export const getAllUsers = (startRow: number) => {
    return axios.get(`${baseUrl}/users?page=${startRow}&size=10`)
}

export const editUser = (payload: any) => {
    return axios.put(`${baseUrl}/users`, {
        ...payload
    })
}

export const deleteUser = (userId: number) => {
    return axios.delete(`${baseUrl}/users/${userId}`)
}