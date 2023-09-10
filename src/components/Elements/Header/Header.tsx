import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.title + " " + styles.headerContent}>
          🛣️ Roadside Explorer
        </span>
        <span className={styles.subtitle + " " + styles.headerContent}>
          想い尽きるまでロードサイドを眺めていたい
        </span>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.headerContent}>
          by Teruki TADA &emsp;
          <a href="https://github.com/TadaTeruki/roadside-explorer">
            View Source
          </a>
        </span>
      </div>
    </header>
  );
};

export default Header;
