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
  console.log("In blogService's create: ", blog);
  const config = {
    headers: { Authorization: token },
  };
  console.log("About to post to: ", baseUrl);
  console.log("With object ", blog);
  console.log("And configuration: ", config);
  const response = await axios.post(baseUrl, blog, config);
  console.log("returned: ", response);
  return response.data;
};

const modify = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl + `/${blog.id}`, blog, config);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + `/${blog.id}`, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, modify, remove };
