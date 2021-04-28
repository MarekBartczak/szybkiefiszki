import axios from "axios";

const instance = axios.create({
  baseURL: "https://fiszki-54790-default-rtdb.firebaseio.com/",
});

export default instance;
