import React, { Component } from "react";
import * as styles from "./filter.module.css";
import { connect } from "react-redux";
import BackDrop from "../backdrop/backdrop";
import Aux from "../../hoc/aux";
import * as actionsTypes from "../../store/actions/actions";

class Filter extends Component {
  showBackdrop = () => {
    let backdrop;
    this.props.showFilterToggle ? (backdrop = <BackDrop />) : (backdrop = null);
    return backdrop;
  };
  showFilterToggle = () => {
    let style;
    this.props.showFilterToggle
      ? (style = [styles.filter, styles.show])
      : (style = [styles.filter]);

    return style.join(" ");
  };

  showAllStats = () => {
    let stats = this.props.filter;
    return stats.map((el, index) => {
      return (
        <div
          key={index}
          onClick={() => this.props.onSelectFilter(index)}
          className={
            this.props.selectedFilter === index
              ? styles.filterElSelected
              : styles.filterEl
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
        <div className={this.showFilterToggle()}>
          <div className={styles.title}>Filtr</div>
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
    onSelectFilter: (select) =>
      disptch({ type: actionsTypes.SELECT_FILTER, selected: select }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Filter);
