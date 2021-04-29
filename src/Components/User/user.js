import React, { Component } from "react";
import styles from "./user.module.css";
import { connect } from "react-redux";
import BackDrop from "../backdrop/backdrop";
import Aux from "../../hoc/aux";
import * as user from "../../Container/User/user";
// import * as actionsTypes from '../../store/actions/actions';

class User extends Component {
  state = {
    isLogin: 0,
    login: "",
    password: "",
    rePassword: "",
    registerForm: 0,
    rememberUser: 0,
  };

  componentDidUpdate() {
    console.log(this.state);
  }
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
    //   async login = () => {
    //     const userInfo = await user.signIn(user.credentials);
    //     console.log(userInfo)

    //   };
    if (!isLogin) {
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
                onClick={() => user.createUser(user.credentials)}
              >
                Zarejestruj
              </div>
            ) : (
              <Aux>
                <div
                  className={styles.submitBtn}
                  onClick={() => {
                    user.signIn(user.credentials);
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
    if (isLogin) {
      return (
        <div className={styles.logout}>
          <div
            className={styles.submitBtn}
            onClick={() => {
              user.logout();
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

export default connect(mapStateToPropst, null)(User);
