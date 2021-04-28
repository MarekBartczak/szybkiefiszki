import React, { Component } from "react";
import styles from "./backdrop.module.css";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class Backdrop extends Component {
  render() {
    return (
      <div
        className={styles.backdrop}
        style={{ zIndex: this.props.zindex }}
        onClick={() => {
          if (this.props.addNewWordCardToggle) {
            this.props.onAddNewWordCardToggle();
          }
          if (this.props.showStatsToggle) {
            this.props.onShowStatsToggle();
          }
          if (this.props.showFilterToggle) {
            this.props.onShowFilterToggle();
          }
          if (this.props.showUserToggle) {
            this.props.onShowUserToggle();
          }
        }}
      ></div>
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
    onAddNewWordCardToggle: () =>
      dispatch({ type: actionsTypes.ADD_NEW_WORD_CARD_TOGGLE }),
    onShowStatsToggle: () => dispatch({ type: actionsTypes.SHOW_STATS_TOGGLE }),
    onShowFilterToggle: () =>
      dispatch({ type: actionsTypes.SHOW_FILTER_TOGGLE }),
    onShowUserToggle: () => dispatch({ type: actionsTypes.SHOW_USER_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Backdrop);
