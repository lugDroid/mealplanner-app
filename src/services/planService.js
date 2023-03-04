import axios from "axios";
const baseUrl = "/api/plans";

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

const getAllPlans = () => {
  const req = axios.get(baseUrl, config);

  return req.then((res) => res.data);
};

const createPlan = (newPlan) => {
  const req = axios.post(baseUrl, newPlan, config);
  return req.then((res) => res.data);
};

const deletePlan = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};

const modifyPlan = (id, plan) => {
  const req = axios.put(`${baseUrl}/${id}`, plan, config);
  return req.then((res) => res.data);
};

const planService = {
  getAllPlans,
  createPlan,
  deletePlan,
  modifyPlan,
  setToken,
  removeToken,
};

export default planService;
