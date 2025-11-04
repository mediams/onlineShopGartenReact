import React from "react";
import { Link } from "react-router";
import ThemeBtn from "../themeBtn/ThemeBtn";
import styles from "./LogoThemeBlock.module.scss";
export default function LogoThemeBlock() {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="media/logo.svg" alt="logo" />
        </Link>
      </div>
      <ThemeBtn />
    </div>
  );
}
