import styles from "./Header.module.css";

export const Header = ({ usd, eur, date }) => {
  console.log(usd);
  console.log(eur);
  const uahPerUsd = (1 / usd).toFixed(1);
  const uahPerEur = (1 / eur).toFixed(1);

  return (
    <header>
      <section className={styles.header_container}>
        <strong className={styles.header_title}>
          Currency Exchange Calculator
        </strong>
        <div>
          <p className={styles.header_text}>Current Currency on {date}</p>
          <ul className={styles.header_list}>
            <li>
              <p>
                UAH to USD -{" "}
                <span className={styles.header_text_wrap}>{uahPerUsd} uah</span>
              </p>
            </li>
            <li>
              <p>
                UAH to USD -{" "}
                <span className={styles.header_text_wrap}>{uahPerEur} uah</span>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </header>
  );
};
