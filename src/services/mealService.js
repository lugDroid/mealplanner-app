import axios from "axios";
const baseUrl = "/api/meals";

const getAllMeals = () => {
  const request = axios.get(baseUrl);

  return request.then((res) => res.data);
};

const createMeal = (newMeal) => {
  const request = axios.post(baseUrl, newMeal);
  return request.then((res) => res.data);
};

const deleteMeal = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const modifyMeal = (id, meal) => {
  const req = axios.put(`${baseUrl}/${id}`, meal);
  return req.then((res) => res.data);
};

const mealService = {
  getAllMeals,
  createMeal,
  deleteMeal,
  modifyMeal,
};

export default mealService;
