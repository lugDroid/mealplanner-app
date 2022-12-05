import axios from "axios";
const baseUrl = "http://localhost:3001/groups";

const getAllGroups = () => {
  const req = axios.get(baseUrl);

  return req.then((res) => res.data);
};

const createGroup = (newGroup) => {
  const req = axios.post(baseUrl, newGroup);
  return req.then((res) => res.data);
};

const deleteGroup = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const modifyGroup = (id, group) => {
  const req = axios.put(`${baseUrl}/${id}`, group);
  return req.then((res) => res.data);
};

const groupService = {
  getAllGroups,
  createGroup,
  deleteGroup,
  modifyGroup,
};

export default groupService;
