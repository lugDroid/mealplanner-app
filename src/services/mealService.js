import axios from "axios";
const baseUrl = "/api/meals";

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

const getAllMeals = async () => {
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const createMeal = async (newMeal) => {
  const res = await axios.post(baseUrl, newMeal, config);
  return res.data;
};

const deleteMeal = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const modifyMeal = async (id, meal) => {
  const res = axios.put(`${baseUrl}/${id}`, meal, config);
  return res.data;
};

const mealService = {
  getAllMeals,
  createMeal,
  deleteMeal,
  modifyMeal,
  setToken,
  removeToken,
};

export default mealService;
