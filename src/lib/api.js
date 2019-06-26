import axios from 'axios';

export const getPostById = id => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users');

export const getUserById = id => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
