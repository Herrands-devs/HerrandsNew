import api from "../axios";

const authRoutes = {
  signup: "/accounts/register",
};

export const RegisterUser = async (payload) => {
  const { email, first_name, last_name, phone_number, user_type } = payload;

  return api("post", authRoutes.signup, {
    email,
    first_name,
    last_name,
    phone_number,
    user_type,
  });
};
