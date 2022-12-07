import axios from "axios";
const baseUrl = "http://localhost:3001/plans";

const getAllPlans = () => {
  const req = axios.get(baseUrl);

  return req.then((res) => res.data);
};

const createPlan = (newPlan) => {
  const req = axios.post(baseUrl, newPlan);
  return req.then((res) => res.data);
};

const deletePlan = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const modifyPlan = (id, plan) => {
  const req = axios.put(`${baseUrl}/${id}`, plan);
  return req.then((res) => res.data);
};

const planService = {
  getAllPlans,
  createPlan,
  deletePlan,
  modifyPlan,
};

export default planService;
