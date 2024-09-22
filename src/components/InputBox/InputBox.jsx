import styles from "./InputBox.module.css";

export const InputBox = ({
  amount,
  currency,
  currencies,
  onCurrencyChange,
  onAmountChange,
}) => {
  return (
    <div>
      <input
        className={styles.form_input}
        type="number"
        value={amount}
        onChange={(evt) => onAmountChange(evt.target.value)}
      />
      <select
        className={styles.form_select}
        value={currency}
        onChange={(evt) => onCurrencyChange(evt.target.value)}
      >
        {currencies?.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
