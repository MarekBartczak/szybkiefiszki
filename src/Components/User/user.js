import React, { Component } from "react";
import styles from "./user.module.css";
import { connect } from "react-redux";
import BackDrop from "../backdrop/backdrop";
import Aux from "../../hoc/aux";
import axiosInscance from "../../axios";
import axios from "axios";
import * as actionsTypes from "../../store/actions/actions";
// import * as actionsTypes from '../../store/actions/actions';

const credentials = {
  login: "marek.bartczak@gmail.com",
  pass: "password123",
};

const createUser = (newUserCredentials) => {
  const auth = {
    email: newUserCredentials.login,
    password: newUserCredentials.pass,
    returnSecureToken: true,
  };
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  axios.post(url + process.env.TOKEN, auth).then((res) => {
    // console.log(res);
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
};

class User extends Component {
  state = {
    isLogin: 0,
    login: "",
    password: "",
    rePassword: "",
    registerForm: 0,
    rememberUser: 0,
  };

  logout = () => {
    localStorage.clear();
    this.props.onCheckLoginStatus(0);
    this.props.onClearItems();
  };
  signIn = (userCredentials) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    const auth = {
      email: userCredentials.login,
      password: userCredentials.pass,
      returnSecureToken: true,
    };
    axios.post(url + process.env.TOKEN, auth).then((res) => {
      localStorage.clear();
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("localId", res.data.localId);
      localStorage.setItem("idToken", res.data.idToken);
      this.props.onCheckLoginStatus(1);
      this.getItems();
      console.log(localStorage);
    });
  };

  componentDidMount() {
    if (localStorage.getItem("email") !== null) {
      //   this.setState({ isLogin: 1 });
      this.props.onCheckLoginStatus(1);

      this.getItems();
    }
    console.log(localStorage);
  }

  getItems = () => {
    if (!this.props.loadedItems) {
      console.log("login");
      axiosInscance
        .get(
          "usersItems/" +
            localStorage.getItem("localId") +
            "/items.json?auth=" +
            localStorage.getItem("idToken")
        )
        .then((res) => {
          const values = Object.values(res.data);
          const keys = Object.keys(res.data);
          values.forEach((el, index) => (el.id = keys[index]));
          console.log(values);
          this.props.onShowAll(values);
        });
    }
  };
  showBackdrop = () => {
    let backdrop;
    this.props.showUserToggle
      ? (backdrop = <BackDrop zindex="400" />)
      : (backdrop = null);
    return backdrop;
  };

  showUserToggle = () => {
    let style;
    this.props.showUserToggle
      ? (style = [styles.user, styles.show])
      : (style = [styles.user]);
    return style.join(" ");
  };

  handleInput = (event) => {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // const value = target.value;
    this.setState({ [name]: value });
  };

  input = (cls, val, plchldr, type) => {
    return (
      <input
        type={type}
        className={styles[cls]}
        value={this.state[val]}
        autoComplete="off"
        name={`${val}`}
        placeholder={`${plchldr}`}
        autoCapitalize="off"
        spellCheck="false"
        onChange={this.handleInput}
      ></input>
    );
  };

  authForm = (isLogin) => {
    if (!this.props.isUserLogin) {
      return (
        <div className={styles.form}>
          <div className={styles.authForm}>
            {this.input("inputType", "login", "podaj email", "text")}
            {this.input("inputType", "password", "podaj hasło", "password")}
            {this.state.registerForm
              ? this.input(
                  "inputType",
                  "rePassword",
                  "powtórz hasło",
                  "password"
                )
              : null}
          </div>
          <div className={styles.btns}>
            {this.state.registerForm ? (
              <div
                className={styles.submitBtn}
                onClick={() => createUser(credentials)}
              >
                Zarejestruj
              </div>
            ) : (
              <Aux>
                <div
                  className={styles.submitBtn}
                  onClick={() => {
                    this.signIn(credentials);
                    this.setState({ isLogin: 1 });
                  }}
                >
                  Zaloguj
                </div>
                <div className={styles.remember}>
                  <input
                    type="checkbox"
                    checked={this.state.rememberUser}
                    // id="rememberUser"
                    name="rememberUser"
                    onChange={this.handleInput}
                  ></input>
                  <label htmlFor="rememberUser">Zostaw zalogowany</label>
                </div>
              </Aux>
            )}
            <div
              className={styles.changeBtn}
              onClick={() =>
                this.setState({ registerForm: !this.state.registerForm })
              }
            >
              {this.state.registerForm
                ? "Posiadam konto / zaloguj"
                : "Utwórz nowe konto / zarejestruj"}
            </div>
          </div>
        </div>
      );
    }
    if (this.props.isUserLogin) {
      return (
        <div className={styles.logout}>
          <div
            className={styles.submitBtn}
            onClick={() => {
              this.logout();
              this.setState({ isLogin: 0 });
              console.log(localStorage);
            }}
          >
            Wyloguj
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <Aux>
        {this.showBackdrop()}
        <div className={this.showUserToggle()}>
          <div className={styles.title}>Logowanie / Rejestracja</div>
          {this.authForm(this.state.isLogin)}
        </div>
      </Aux>
    );
  }
}

const mapStateToPropst = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckLoginStatus: (status) =>
      dispatch({ type: actionsTypes.CHECK_LOGIN_STATUS, status: status }),
    onShowAll: (items) =>
      dispatch({ type: actionsTypes.SHOW_ALL, items: items }),
    onClearItems: () => dispatch({ type: actionsTypes.CLEAR_ITEMS }),
  };
};

export default connect(mapStateToPropst, mapDispatchToProps)(User);
