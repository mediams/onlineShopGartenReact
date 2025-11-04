import React from "react";
import { Sun, Moon } from "lucide-react";

import styles from "./ThemeBtn.module.scss";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeBtn() {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <div className={styles.themeToggle}>
      <Sun className={styles.iconSun} />
      <Moon className={styles.iconMoon} />
      <input
        type="checkbox"
        id="theme-switch"
        checked={isDarkTheme}
        onChange={toggleTheme}
        className={styles.themeSwitch}
      />
      <label htmlFor="theme-switch" className={styles.btn}></label>
    </div>
  );
}
