import axios from "axios";
const baseUrl = "/api/groups";

let token = null;
let config = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;

  config = {
    headers: { Authorization: token },
  };
};

const removeToken = () => {
  token = "";
  config = {};
}

const getAllGroups = () => {
  const req = axios.get(baseUrl, config);

  return req.then((res) => res.data);
};

const createGroup = (newGroup) => {
  const req = axios.post(baseUrl, newGroup, config);
  return req.then((res) => res.data);
};

const deleteGroup = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};

const modifyGroup = (id, group) => {
  const req = axios.put(`${baseUrl}/${id}`, group, config);
  return req.then((res) => res.data);
};

const groupService = {
  getAllGroups,
  createGroup,
  deleteGroup,
  modifyGroup,
  setToken,
  removeToken,
};

export default groupService;
