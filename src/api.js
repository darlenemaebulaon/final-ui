import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api/posts';

export const getPosts = () => axios.get(API_BASE);
export const createPost = (post) => axios.post(API_BASE, post);
export const updatePost = (id, post) => axios.put(`${API_BASE}/${id}`, post);
export const deletePost = (id) => axios.delete(`${API_BASE}/${id}`);
