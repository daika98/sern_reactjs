import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsersApi = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};
const createNewUserApi = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserApi = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserApi = (userData) => {
  return axios.put("/api/edit-user", userData);
};

export {
  handleLoginApi,
  getAllUsersApi,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
};
