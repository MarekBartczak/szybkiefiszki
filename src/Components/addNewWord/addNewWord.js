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
    date: {
      save: new Date().toISOString().slice(0, 10),
      learned: "",
    },
  };

  handleInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  toggleVIew = () => {
    let style;
    this.props.addNewWordCardToggle
      ? (style = [styles.addNewWord, styles.show])
      : (style = [styles.addNewWord]);

    return style.join(" ");
  };

  checkIfInputNotEmpty = (a, b, c, d) => {
    if (a === "" || b === "" || c === "" || d === "") {
      return false;
    } else {
      return true;
    }
  };

  clearState = () => {
    this.setState({
      spanishWord: "",
      spanishWordDescription: "",
      polishhWord: "",
      polishhWordDescription: "",
      date: {
        save: "",
        learned: "",
      },
    });
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
      this.clearState();
    } else {
      //add dialog box later
      alert("Uzuepełnij brakujące słowa");
    }
  };

  input = (cls, val, plchldr) => {
    return (
      <input
        type="text"
        className={styles[cls]}
        value={this.state[val]}
        name={`${val}`}
        placeholder={`${plchldr}`}
        autoCapitalize="off"
        spellCheck="false"
        onChange={this.handleInput}
      ></input>
    );
  };

  render() {
    return (
      <div className={this.toggleVIew()}>
        <div className={styles.area}>
          <div className={styles.spanishArea}>
            Espanol
            <div className={styles.spanishWord}>
              {this.input("inputType", "spanishWord", "palabra")}
            </div>
            <div className={styles.spanishWordDescription}>
              {this.input("inputType", "spanishWordDescription", "descripción")}
            </div>
          </div>
          <div className={styles.polishArea}>
            Polski
            <div className={styles.polishhWord}>
              {this.input("inputType", "polishhWord", "słowo")}
            </div>
            <div className={styles.polishhWordDescription}>
              {this.input("inputType", "polishhWordDescription", "opis")}
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
