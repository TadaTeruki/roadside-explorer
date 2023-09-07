import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Roadside Explorer 🛣️</div>
      <div className={styles.subtitle}>
        想い尽きるまでロードサイドを眺めていたい
      </div>
      <br />
      <div className={styles.subtitle}>
        濃い部分をクリックすると詳細が表示されます
      </div>
    </header>
  );
};

export default Header;
