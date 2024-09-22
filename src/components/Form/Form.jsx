import { useEffect, useState } from "react";
import { getConversion } from "../../services/fetchCurrancy";

import styles from "./Form.module.css";

import sprite from "../../img/sprite.svg";
import { InputBox } from "../InputBox/InputBox";

export const Form = ({ allCurrencies }) => {
  const [from, setFrom] = useState("UAH");
  const [to, setTo] = useState("USD");
  const [cuurentAmount, setCurrentAmount] = useState(0);
  const [calculateAmount, setCalculateAmount] = useState(0);

  const getCalculateAmount = async () => {
    try {
      const conversionAmount = await getConversion(from, to, cuurentAmount);
      setCalculateAmount(parseFloat(conversionAmount.toFixed(2)));
    } catch (error) {
      console.error("Error calculating conversion amount:", error);
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    getCalculateAmount();
  };

  const onRevers = () => {
    setFrom(to);
    setTo(from);
    setCurrentAmount(calculateAmount);
    setCalculateAmount(cuurentAmount);
  };

  return (
    <section className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <InputBox
          amount={cuurentAmount}
          currency={from}
          currencies={allCurrencies}
          onCurrencyChange={(currency) => setFrom(currency)}
          onAmountChange={(amount) => setCurrentAmount(amount)}
        />
        <button
          className={styles.btn_revers}
          type="button"
          onClick={() => onRevers()}
        >
          <svg
            className={styles.icon}
            width={16}
            height={16}
            aria-label="icon-loop"
          >
            <use href={sprite + "#icon-loop"}></use>
          </svg>
        </button>
        <InputBox
          amount={calculateAmount}
          currency={to}
          currencies={allCurrencies}
          onCurrencyChange={(currency) => setTo(currency)}
        />
        <button className={styles.submit_btn} type="submit">
          Calculate
        </button>
      </form>
    </section>
  );
};
