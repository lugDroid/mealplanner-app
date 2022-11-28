import axios from "axios";
const baseUrl = "http://localhost:3001/meals";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((res) => res.data);
};

const create = (newMeal) => {
  const request = axios.post(baseUrl, newMeal);
  return request.then((res) => res.data);
};

const mealService = {
  getAll,
  create,
};

export default mealService;
