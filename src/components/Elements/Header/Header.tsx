import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Roadside Explorer</div>
      <div className={styles.subtitle}>
        想い尽きるまでロードサイドを眺めていたい
      </div>
    </header>
  );
};

export default Header;
