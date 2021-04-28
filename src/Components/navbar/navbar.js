import React, { Component } from "react";
import styles from "./navbar.module.css";
import Aux from "../../hoc/aux";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";
import User from "../User/user";

class Navbar extends Component {
  lightUserBtn = () => {
    let style;
    this.props.showUserToggle
      ? (style = [styles.user, styles.userActive])
      : (style = [styles.user]);

    return style.join(" ");
  };

  ShowUserToggle = () => {
    this.props.onShowUserToggle();
  };
  render() {
    return (
      <Aux>
        <User />
        <div className={styles.navbar}>
          <div className={styles.logo}></div>
        </div>
        <div
          className={this.lightUserBtn()}
          onClick={() => this.ShowUserToggle()}
        >
          <i className="far fa-user fa-2x"></i>
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
    onShowUserToggle: () => dispatch({ type: actionsTypes.SHOW_USER_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Navbar);
