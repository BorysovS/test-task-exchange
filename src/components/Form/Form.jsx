import { useEffect, useState } from "react";
import { getConversion } from "../../services/fetchCurrancy";

import styles from "./Form.module.css";

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
            viewBox="0 0 32 32"
            className={styles.icon}
            width={16}
            height={16}
          >
            <path d="M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z"></path>
            <path d="M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z"></path>
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
