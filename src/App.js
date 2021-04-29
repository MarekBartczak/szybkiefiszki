import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionsTypes from "./store/actions/actions";
import Aux from "./hoc/aux";

import Navbar from "./Components/navbar/navbar";
// import Card from "./Components/Card/card";
import CardView from "./Components/cardView/cardView";
import ChangeCard from "./Components/changeCard/changeCard";
import AddButton from "./Components/addButton/addButton";
import AddNewWord from "./Components/addNewWord/addNewWord";
import SummaryCollection from "./Components/summaryCollection/summaryCollection";

class App extends Component {
  render() {
    // this.props.onShowAll();
    return (
      <Aux>
        <Navbar />
        {/* <Card /> */}
        <CardView />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <ChangeCard direct="left" />
          <AddButton />
          <ChangeCard direct="right" />
        </div>
        <AddNewWord />
        <SummaryCollection />
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
    onShowAll: () => dispatch({ type: actionsTypes.SHOW_ALL }),
  };
};

export default connect(mapStateToPropst, mapDispatchToProps)(App);
