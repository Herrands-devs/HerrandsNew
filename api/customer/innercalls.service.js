import api from "../axios";

const innerRoutes = {
  fetchCategories: "/api/categories/",
};

export const fetchCategories = async () => {
  return api("get", innerRoutes.fetchCategories);
};
