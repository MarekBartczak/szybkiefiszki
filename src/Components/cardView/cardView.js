import React, { Component } from "react";
import styles from "./cardView.module.css";
import { connect } from "react-redux";
import Aux from "../../hoc/aux";

import Card from "../Card/card";

class CardView extends Component {
  render() {
    return (
      <Aux>
        <div className={styles.cardView}>
          <Card index={this.props.currentItemIndex} />
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
export default connect(mapStateToPropst, null)(CardView);
