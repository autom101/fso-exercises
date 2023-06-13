import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  console.log("In createBlog: ", blog);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create };