import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Roadside Explorer</div>
      想い尽きるまでロードサイドを眺めていたい
    </header>
  );
};

export default Header;
