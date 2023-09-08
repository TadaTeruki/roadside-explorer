import styles from "./Credit.module.css";

export const Credit = () => {
  return (
    <div className={styles.credit}>
      <span style={{ margin: "15px 15px 15px 15px" }}>
        by Teruki TADA (
        <a href="https://github.com/TadaTeruki/roadside-explorer">
          View Source
        </a>
        ) <br />
      </span>
      <span style={{ margin: "15px 15px 15px 15px" }}>
        <a href="https://developer.yahoo.co.jp/sitemap/">
          Web Services by Yahoo! JAPAN
        </a>
      </span>
    </div>
  );
};

export default Credit;
