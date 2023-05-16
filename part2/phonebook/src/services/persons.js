import axios from "axios";
const url = `http://localhost:3001/persons`;

const getData = () => {
  const get = axios.get(url);
  return get.then((response) => {
    return response.data;
  });
};

const postData = (person) => {
  const post = axios.post(url, person);
  return post.then((response) => {
    return response.data;
  });
};

const replaceData = (person, id) => {
  const replaceRequest = axios.put(`${url}/${id}`, person);
  return replaceRequest.then((response) => {
    return response.data;
  });
};

const deleteData = (person, id) => {
  const deleteRequest = axios.delete(`${url}/${id}`, person);
  return deleteRequest.then((response) => {});
};

// eslint-disable-next-line
export default { getData, postData, replaceData, deleteData };
