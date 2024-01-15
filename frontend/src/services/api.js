// src/services/api.js
import axios from "axios";
import { getToken } from "./token";

const BASE_URL = "http://localhost:8080/api"; // 예제 API 주소

const api = axios.create({
  baseURL: BASE_URL,
});

// 예제: 포스트 목록 가져오기
export const getPosts = (userId) => api.get(`/user/${userId}/board`);
export const getPost = (boardId) => api.get(`/board/${boardId}`);
export const getProfile = (userId) => api.get(`/user/${userId}/profile`);
export const getFollowers = (userId) => api.get(`/user/${userId}/follower`);
export const getFollowing = (userId) => api.get(`/user/${userId}/following`);
export const getComments = (boardId) => api.get(`/board/${boardId}/comment`);
export const getReplies = (boardId, commentId) =>
  api.get(`/board/${boardId}/comment/${commentId}/reply`);
export const getProfileWithToken = (token) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${token}`,
    // Add any other headers you need
  };

  const options = {
    headers,
  };

  return api.get(`/user/profile`, options);
};

export const postBoard = (requestBody, token) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${token}`,
    // Add any other headers you need
  };

  const options = {
    headers,
  };

  return api.post(`/board`, requestBody, options);
};
export const addComment = (boardId, requestBody, token) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${token}`,
    // Add any other headers you need
  };

  const options = {
    headers,
  };
  api.post(`/board/${boardId}/comment`, requestBody, options);
};

export const addReply = (boardId, commentId, requestBody, token) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${token}`,
    // Add any other headers you need
  };

  const options = {
    headers,
  };
  api.post(
    `/board/${boardId}/comment/${commentId}/reply`,
    requestBody,
    options
  );
};
export const updateProfile = (userId, token, image, introduction) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    // Add any other headers you need
  };
  const formData = new FormData();

  // 이미지 파일 추가
  formData.append("img", image);

  // 텍스트 데이터 추가
  formData.append("introduction", introduction);

  const options = {
    headers,
  };
  return api.post(`/user/${userId}/profile`, formData, options);
};
export const joinUser = (requestBody) => {
  api.post(`/user`, requestBody);
};
export const loginUser = (requestBody) => api.post(`/auth/login`, requestBody);
export const logoutUser = (accessToken, requestBody) => {
  const headers = {
    // Your custom headers go here
    Authorization: `Bearer ${accessToken}`,
    // Add any other headers you need
  };

  const options = {
    headers,
  };
  return api.post(`/auth/logout`, requestBody, options);
};
export default api;
