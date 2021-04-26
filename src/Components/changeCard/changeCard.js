import React, { Component } from "react";
import styles from "./changeCard.module.css";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class ChangeCard extends Component {
  swichCard = (side) => {
    if (this.props.items.length > 0) {
      let range = this.props.items.length;
      let current = this.props.currentItemIndex;
      let select = current + side;

      if (current + side < 0) {
        select = range - 1;
      }
      if (current + side === range) {
        select = 0;
      }
      this.props.onChangeCard(select);
    }
  };

  setSide = () => {
    if (this.props.direct === "left") {
      return (
        <i
          onClick={() => this.swichCard(-1)}
          className={`fas fa-long-arrow-alt-left fa-3x ${styles.left}`}
        ></i>
      );
    }
    if (this.props.direct === "right") {
      return (
        <i
          onClick={() => this.swichCard(1)}
          className={`fas fa-long-arrow-alt-right fa-3x ${styles.right}`}
        ></i>
      );
    }
  };
  render() {
    return this.setSide();
  }
}

const mapStateToPropst = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCard: (i) => dispatch({ type: actionsTypes.CHANGE_CARD, index: i }),
  };
};

export default connect(mapStateToPropst, mapDispatchToProps)(ChangeCard);
