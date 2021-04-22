import React, { Component } from "react";
import styles from "./backdrop.module.css";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class Backdrop extends Component {
  render() {
    return (
      <div
        className={styles.backdrop}
        onClick={() => {
          if (this.props.addNewWordCardToggle) {
            this.props.onAddNewWordCardToggle();
          }
          if (this.props.showStatsToggle) {
            this.props.onShowStatsToggle();
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
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Backdrop);
