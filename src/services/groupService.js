import axios from "axios";
const baseUrl = "http://localhost:3001/groups";

const getAllGroups = () => {
  const req = axios.get(baseUrl);

  return req.then((res) => res.data);
};

const groupService = {
  getAllGroups,
};

export default groupService;
