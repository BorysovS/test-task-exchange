import { useEffect, useState } from "react";
import "./App.css";

import { Form } from "./components/Form/Form";
import { getCurrancy } from "./services/fetchCurrancy";
import { Header } from "./components/Header/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [usdCurrency, setUsdCurrency] = useState(null);
  const [eurCurrency, setEurCurrency] = useState(null);
  const [dateUpdated, setDateUpdated] = useState(null);

  useEffect(() => {
    const getAllCurrencies = async () => {
      try {
        const { conversion_rates, time_last_update_utc } = await getCurrancy();
        // console.log(data.USD);
        setUsdCurrency(Number(conversion_rates.USD));
        setEurCurrency(Number(conversion_rates.EUR));
        const allCurrenciesArr = Object.keys(conversion_rates);
        setCurrencies(allCurrenciesArr);
        setDateUpdated(time_last_update_utc.slice(0, -6));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    getAllCurrencies();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header usd={usdCurrency} eur={eurCurrency} date={dateUpdated} />
      <Form allCurrencies={currencies} />
    </>
  );
}

export default App;
