import React, { Component } from "react";
import styles from "./cardView.module.css";
import { connect } from "react-redux";
import Aux from "../../hoc/aux";

import Card from "../Card/card";

class CardView extends Component {
  checkIfListEmpty = () => {
    console.log(this.props.items);
    if (this.props.items.length > 0) {
      return <Card index={this.props.currentItemIndex} />;
    }
    if (this.props.items.length === 0) {
      return <div className={styles.empty}> Dodaj nowe słówka </div>;
    }
  };
  render() {
    return (
      <Aux>
        <div className={styles.cardView}>{this.checkIfListEmpty()}</div>
      </Aux>
    );
  }
}
const mapStateToPropst = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToPropst, null)(CardView);
