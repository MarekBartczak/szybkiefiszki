import React, { Component } from "react";
import styles from "./navbar.module.css";

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.logo}></div>
      </div>
    );
  }
}

export default Navbar;
