import React, { Component } from "react";
import styles from "./summaryCollection.module.css";
import Aux from "../../hoc/aux";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";
import Stats from "../stats/stats";
import Filter from "../filter/filter";

class SummaryCollection extends Component {
  //   componentDidMount() {
  //     console.log(this.props.stats);
  //   }
  showStatsToggle = () => {
    this.props.onShowStatsToggle();
    // console.log(this.props.showStatsToggle);
  };
  showFilterToggle = () => {
    this.props.onShowFilterToggle();
    // console.log(this.props.showStatsToggle);
  };

  lighStatsBtn = () => {
    let style;
    this.props.showStatsToggle
      ? (style = [styles.stats, styles.statsActive])
      : (style = [styles.stats]);

    return style.join(" ");
  };

  lighFilterBtn = () => {
    let style;
    this.props.showFilterToggle
      ? (style = [styles.filterBtn, styles.filterBtnActive])
      : (style = [styles.filterBtn]);

    return style.join(" ");
  };
  render() {
    return (
      <Aux>
        <Stats />
        <Filter />
        <div className={styles.summaryCollection}>
          Pokaż {this.props.filter[this.props.selectedFilter]} <br />
          {this.props.stats[this.props.selectedStats]} {this.props.items.length}
        </div>

        <div className={styles.statsBtn}>
          <div
            className={this.lighFilterBtn()}
            onClick={() => {
              this.showFilterToggle();
            }}
          >
            <i className="fas fa-filter fa-2x"></i>
          </div>
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
    onShowFilterToggle: () =>
      dispatch({ type: actionsTypes.SHOW_FILTER_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(SummaryCollection);
