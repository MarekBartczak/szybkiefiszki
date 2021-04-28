import axiosInscance from "../../axios";

export const getTestData = () => {
  axiosInscance.get("/test.json").then((res) => console.log(res.data));
};

export const credentials = {
  login: "marek.bartczak@gmail.com",
  pass: "password1234",
};

export const token = "AIzaSyASxGngqUQjOSlvt44XEX2_JMT4rmsTRL8";

export const createUser = (newUserCredentials) => {
  console.log(newUserCredentials.login);
  console.log(newUserCredentials.password);
};
