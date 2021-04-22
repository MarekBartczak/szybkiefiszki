import React, { Component } from "react";
import styles from "./addNewWord.module.css";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actions";

class AddNewWord extends Component {
  state = {
    spanishWord: "",
    spanishWordDescription: "",
    polishhWord: "",
    polishhWordDescription: "",
    learnedStatus: 0,
  };

  toggleVIew = () => {
    let style;
    this.props.addNewWordCardToggle
      ? (style = [styles.addNewWord, styles.show])
      : (style = [styles.addNewWord]);

    return style.join(" ");
  };
  handleInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  checkIfInputNotEmpty = (a, b, c, d) => {
    if (a === "" || b === "" || c === "" || d === "") {
      return false;
    } else {
      return true;
    }
  };

  save = () => {
    let checkIfNotEmpty = this.checkIfInputNotEmpty(
      this.state.spanishWord,
      this.state.spanishWordDescription,
      this.state.polishhWord,
      this.state.polishhWordDescription
    );
    if (checkIfNotEmpty) {
      this.props.onAddNewWordCardToggle();
      this.props.onSaveWord(this.state);
      this.setState({
        spanishWord: "",
        spanishWordDescription: "",
        polishhWord: "",
        polishhWordDescription: "",
      });
    } else {
      //add dialog box later
      alert("Uzuepełnij brakujące słowa");
    }
  };

  render() {
    return (
      <div className={this.toggleVIew()}>
        <div className={styles.area}>
          <div className={styles.spanishArea}>
            Espanol
            <div className={styles.spanishWord}>
              <input
                type="text"
                className={styles.inputType}
                value={this.state.spanishWord}
                name="spanishWord"
                placeholder="palabra"
                autoCapitalize="off"
                spellCheck="false"
                onChange={this.handleInput}
              ></input>
            </div>
            <div className={styles.spanishWordDescription}>
              <input
                type="text"
                className={styles.inputType}
                value={this.state.spanishWordDescription}
                name="spanishWordDescription"
                placeholder="descripción"
                autoCapitalize="off"
                spellCheck="false"
                onChange={this.handleInput}
              ></input>
            </div>
          </div>
          <div className={styles.polishArea}>
            Polski
            <div className={styles.polishhWord}>
              <input
                type="text"
                value={this.state.polishhWord}
                className={styles.inputType}
                name="polishhWord"
                placeholder="słowo"
                autoCapitalize="off"
                spellCheck="false"
                onChange={this.handleInput}
              ></input>
            </div>
            <div className={styles.polishhWordDescription}>
              <input
                type="text"
                value={this.state.polishhWordDescription}
                className={styles.inputType}
                name="polishhWordDescription"
                placeholder="opis"
                autoCapitalize="off"
                spellCheck="false"
                onChange={this.handleInput}
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.submitBtn} onClick={this.save}>
          ZAPISZ
        </div>
      </div>
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
    onSaveWord: (savedItem) =>
      dispatch({ type: actionsTypes.SAVE_WORD, word: savedItem }),
    onAddNewWordCardToggle: () =>
      dispatch({ type: actionsTypes.ADD_NEW_WORD_CARD_TOGGLE }),
  };
};
export default connect(mapStateToPropst, mapDispatchToProps)(AddNewWord);
