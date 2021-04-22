import React, { Component } from "react";
import styles from "./addButton.module.css";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";
import BackDrop from "../backdrop/backdrop";
import Aux from "../../hoc/aux";

class AddButton extends Component {
  toggleColorText = () => {
    let style;
    this.props.addNewWordCardToggle
      ? (style = [styles.addButton, styles.addOn])
      : (style = [styles.addButton]);

    return style.join(" ");
  };

  showBackdrop = () => {
    let backdrop;
    this.props.addNewWordCardToggle
      ? (backdrop = <BackDrop />)
      : (backdrop = null);
    return backdrop;
  };

  render() {
    return (
      <Aux>
        {this.showBackdrop()}
        <div
          className={this.toggleColorText()}
          onClick={this.props.onAddNewWordCardToggle}
        >
          DODAJ
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
const mapDispatchToProps = (dispach) => {
  return {
    onAddNewWordCardToggle: () =>
      dispach({ type: actionsTypes.ADD_NEW_WORD_CARD_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(AddButton);
