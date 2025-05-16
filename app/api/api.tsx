import axios from "axios";
import { z } from "zod";

const getUserSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

type UserFilters = z.infer<typeof getUserSchema>;

export async function getUsers(filters: UserFilters) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${filters.limit}&_offset=${filters.offset}`
  );

  const result = getUserSchema.safeParse(filters);

  return response.json();
}

//create function

//login function
const login = async (email: string, password: string) => {
  const response = await axios.post("'https://dummyjson.com/auth/login'", {
    email,
    password,
  });
  return response.data;
};

//login function
const register = async (email: string, password: string) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    {
      email,
      password,
    }
  );
  return response.data;
};

export { login, register };
