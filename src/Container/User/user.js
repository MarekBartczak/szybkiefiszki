import axiosInscance from "../../axios";
import axios from "axios";

export const getTestData = () => {
  axiosInscance.get("/test.json").then((res) => console.log(res.data));
};

export const credentials = {
  login: "marek.bartczak@gmail.com",
  pass: "password123",
};

// temporary token
export const token = "AIzaSyASxGngqUQjOSlvt44XEX2_JMT4rmsTRL8";

export const createUser = (newUserCredentials) => {
  console.log(newUserCredentials.login);
  console.log(newUserCredentials.pass);

  const auth = {
    email: newUserCredentials.login,
    password: newUserCredentials.pass,
    returnSecureToken: true,
  };
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASxGngqUQjOSlvt44XEX2_JMT4rmsTRL8";
  axios.post(url, auth).then((res) => {
    console.log(res);
    const newObj = {
      items: [],
      selectedStats: 0,
      selectedFilter: 0,
    };

    axiosInscance
      .put(
        "usersItems/" + res.data.localId + ".json?auth=" + res.data.idToken,
        newObj
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
  //   console.log(url + token);
};
