import React, { Component } from "react";
import styles from "./stats.module.css";
import { connect } from "react-redux";
import BackDrop from "../backdrop/backdrop";
import Aux from "../../hoc/aux";
import * as actionsTypes from "../../store/actions/actions";

class Stats extends Component {
  showBackdrop = () => {
    let backdrop;
    this.props.showStatsToggle ? (backdrop = <BackDrop />) : (backdrop = null);
    return backdrop;
  };
  showStatsToggle = () => {
    let stats;
    this.props.showStatsToggle
      ? (stats = [styles.stats, styles.show])
      : (stats = [styles.stats]);

    return stats.join(" ");
  };

  showAllStats = () => {
    let stats = this.props.stats;
    return stats.map((el, index) => {
      return (
        <div
          key={index}
          onClick={() => this.props.onSelectStats(index)}
          className={
            this.props.selectedStats === index
              ? styles.statsElSelected
              : styles.statsEl
          }
        >
          {el}
        </div>
      );
    });
  };

  render() {
    return (
      <Aux>
        {this.showBackdrop()}
        <div className={this.showStatsToggle()}>
          <div className={styles.title}>Statystyki </div>
          <div className={styles.list}>
            <div className={styles.text}> {this.showAllStats()}</div>
          </div>
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
const mapDispatchToProps = (disptch) => {
  return {
    onSelectStats: (select) =>
      disptch({ type: actionsTypes.SELECT_STATS, selected: select }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Stats);
