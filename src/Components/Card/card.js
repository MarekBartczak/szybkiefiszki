import React, { Component } from "react";
import styles from "./card.module.css";
import Aux from "../../hoc/aux";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class Card extends Component {
  state = {
    langEsp: true,
    askDel: 0,
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
    this.props.items[this.props.currentItemIndex].learnedStatus !== type
      ? (style = [styles.learnStat])
      : (style = [styles.selectedLearnStatus]);

    return style.join(" ");
  };

  deleteCard = (i) => {
    this.setState({ askDel: 1 });
  };

  askDel = () => {
    return (
      <div className={styles.modalAskDel}>
        <div className={styles.askDelTest}> Czy chcesz usunąć słówko ?</div>
        <div className={styles.askDelBtns}>
          <div
            className={styles.askDelCancel}
            onClick={() => {
              this.setState({ askDel: 0 });
            }}
          >
            Nie
          </div>
          <div
            className={styles.askDelConfirm}
            onClick={() => {
              this.props.onDeleteCard(this.props.currentItemIndex);
              setTimeout(() => {
                this.setState({ askDel: 0 });
              }, 500);
            }}
          >
            Tak
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Aux>
        {this.state.askDel ? this.askDel() : null}
        {this.props.items.length > 0 ? (
          <Aux>
            <div
              className={this.flipStyle("card")}
              onClick={this.switchSideCard}
            >
              <div className={this.flipStyle("word")}>
                {" "}
                {this.changeContent(
                  this.props.items[this.props.currentItemIndex].spanishWord,
                  this.props.items[this.props.currentItemIndex].polishhWord
                )}
              </div>

              <div className={this.flipStyle("descriptionWord")}>
                {this.changeContent(
                  this.props.items[this.props.currentItemIndex]
                    .spanishWordDescription,
                  this.props.items[this.props.currentItemIndex]
                    .polishhWordDescription
                )}
              </div>
            </div>

            <div className={styles.btns}>
              <div className={styles.learn}>
                <div
                  className={this.checkLearnStatus(1)}
                  onClick={() =>
                    this.props.onSwitchLearnStatus(
                      this.props.currentItemIndex,
                      1
                    )
                  }
                >
                  umiem to słówko
                </div>
                <div
                  className={this.checkLearnStatus(0)}
                  onClick={() =>
                    this.props.onSwitchLearnStatus(
                      this.props.currentItemIndex,
                      0
                    )
                  }
                >
                  muszę się nauczyć
                </div>
              </div>
              <div className={styles.manage}>
                <div className={styles.edit}>edytuj</div>
                <div
                  className={styles.delete}
                  onClick={() => this.deleteCard(this.props.currentItemIndex)}
                >
                  usuń
                </div>
              </div>
            </div>
          </Aux>
        ) : null}
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
    onDeleteCard: (index) =>
      dispatch({ type: actionsTypes.REMOVE_CARD, index: index }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(Card);
