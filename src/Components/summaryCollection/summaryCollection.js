import React, { Component } from "react";
import styles from "./summaryCollection.module.css";
import Aux from "../../hoc/aux";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";
import Stats from "../stats/stats";

class SummaryCollection extends Component {
  //   componentDidMount() {
  //     console.log(this.props.stats);
  //   }
  showStatsToggle = () => {
    this.props.onShowStatsToggle();
    // console.log(this.props.showStatsToggle);
  };

  lighStatsBtn = () => {
    let style;
    this.props.showStatsToggle
      ? (style = [styles.stats, styles.statsActive])
      : (style = [styles.stats]);

    return style.join(" ");
  };
  render() {
    return (
      <Aux>
        <Stats />
        <div className={styles.summaryCollection}>
          {this.props.stats[this.props.selectedStats]} {this.props.items.length}
        </div>
        <div className={styles.statsBtn}>
          <div
            className={this.lighStatsBtn()}
            onClick={this.showStatsToggle}
          ></div>
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
    onShowStatsToggle: () => dispatch({ type: actionsTypes.SHOW_STATS_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(SummaryCollection);
