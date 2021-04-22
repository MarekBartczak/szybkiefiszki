import React, { Component } from "react";
import styles from "./card.module.css";
import Aux from "../../hoc/aux";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class Card extends Component {
  state = {
    langEsp: true,
  };

  switchSideCard = () => {
    this.setState({ langEsp: !this.state.langEsp });
  };

  flipStyle = (card) => {
    let style = [styles[card]];
    if (!this.state.langEsp) {
      style = [styles[card], styles.Back];
    }
    return style.join(" ");
  };

  changeContent = (esp, pol) => {
    return this.state.langEsp ? esp : pol;
  };

  checkLearnStatus = (type) => {
    let style;
    this.props.items[this.props.index].learnedStatus !== type
      ? (style = [styles.learnStat])
      : (style = [styles.selectedLearnStatus]);

    return style.join(" ");
  };

  render() {
    return (
      <Aux>
        <div className={this.flipStyle("card")} onClick={this.switchSideCard}>
          <div className={this.flipStyle("word")}>
            {" "}
            {this.changeContent(
              this.props.items[this.props.index].spanishWord,
              this.props.items[this.props.index].polishhWord
            )}
          </div>
          <div className={this.flipStyle("descriptionWord")}>
            {this.changeContent(
              this.props.items[this.props.index].spanishWordDescription,
              this.props.items[this.props.index].polishhWordDescription
            )}
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.learn}>
            <div
              className={this.checkLearnStatus(1)}
              onClick={() =>
                this.props.onSwitchLearnStatus(this.props.index, 1)
              }
            >
              umiem to słówko
            </div>
            <div
              className={this.checkLearnStatus(0)}
              onClick={() =>
                this.props.onSwitchLearnStatus(this.props.index, 0)
              }
            >
              muszę się nauczyć
            </div>
          </div>
          <div className={styles.manage}>
            <div className={styles.edit}>edytuj</div>
            <div className={styles.delete}>usuń</div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchLearnStatus: (i, stat) =>
      dispatch({
        type: actionsTypes.SWITCH_LEARN_STATUS,
        index: i,
        status: stat,
      }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Card);
