import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.title}>🛣️ Roadside Explorer</span>{""}<span className={styles.subtitle}>想い尽きるまでロードサイドを眺めていたい</span>
      </div>
      <div className={styles.headerRight}>
        <span style={{ margin: "15px 15px 15px 15px" }}>
          by Teruki TADA
          &emsp;
          <a href="https://github.com/TadaTeruki/roadside-explorer">
            View Source
          </a>
          &emsp;
          <a href="https://developer.yahoo.co.jp/sitemap/">
            Web Services by Yahoo! JAPAN
          </a>
        </span>
      </div>
    </header>
  );
};

export default Header;
