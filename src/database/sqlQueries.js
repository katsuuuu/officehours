import * as axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const getAllCoursesByStudent = async (name) => {
  const getAllCoursesByStudentUrl = "getAllCoursesByStudent";
  const result = await axios.post(`${url}/${getAllCoursesByStudentUrl}`, {
    name,
  });
  if (result && result.data && result.data.length > 1) {
    return result.data[0];
  }
  return [];
};

const getAllStudents = async () => {
  const getAllStudentsUrl = "getAllStudents";
  const result = await axios.get(`${url}/${getAllStudentsUrl}`);
  if (result && result.data && result.data.length > 1) {
    return result.data[0];
  }
  return [];
};

export { getAllCoursesByStudent, getAllStudents };
