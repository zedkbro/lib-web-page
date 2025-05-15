import React, { useEffect, useState } from "react";
import logo from "./image/logo.jpeg";
import axios from "axios";

export default function ForeignExchange() {
  const [fx_rates, setExchangeRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [price, setRate] = useState(0);
  const [currentConversion, setCurrentConversion] = useState("Buying");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isConverted, setIsConverted] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  //  fetch from API
  const fetchData = async () => {
    try { 
      // const targetUrl = process.env.REACT_APP_EXCHANGE_RATE_API;
      const targetUrl = "https://api-in-uat.anbesabank.et/forex/2.0.0/rates"
      const encodedUrl = encodeURIComponent(targetUrl);
      const allOriginsUrl = `https://api.allorigins.win/get?url=${encodedUrl}`;

      const response = await axios.get(allOriginsUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });

      // All Origins wraps the response inside a `contents` field
      const data = JSON.parse(response.data.contents);

      if (data && data.length > 0) {
        setExchangeRates(data);
        setError("");
      }
    } catch (error) {

      setError(error.message);
    }
  };

  useEffect(() => {
    const today = new Date();
    setDate(
      today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    fetchData();
  }, []);
  // Recalculate when amount or currency changes
  useEffect(() => {
    if (amount && fromCurrency && parseFloat(amount) > 0 && price) {
      if (currentConversion === "Buying") {
        const result = parseFloat(amount) * price;
        setConvertedAmount(result.toFixed(2));
        setIsConverted(true);
        return;
      }
      const result = parseFloat(amount) / price;
      setConvertedAmount(result.toFixed(2));
      setIsConverted(true);
    } else {
      setConvertedAmount(null);
      setIsConverted(false);
    }
  }, [amount, fromCurrency, price, currentConversion]);

  // Local =>	Foreign =	Selling Price
  // Foreign =>	Local =	Buying Price
  const handleFromChange = (e) => {
    e.preventDefault();
    if (currentConversion === "Buying") {
      const selectedCurrency = e.target.value;
      setFromCurrency(selectedCurrency);

      const rate = fx_rates.find((r) => r.currencyCode === selectedCurrency);

      if (rate) {
        setRate(rate.buyingPrice);
        if (amount && parseFloat(amount) > 0) {
          const result = parseFloat(amount) * rate.buyingPrice;
          setConvertedAmount(result.toFixed(2));
          setIsConverted(true);
        } else {
          setConvertedAmount(null);
          setIsConverted(false);
        }
      }
      return;
    }
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClear = () => {
    setAmount("");
    setFromCurrency("");
    setToCurrency("");
    setRate(0);
    setConvertedAmount(null);
    setIsConverted(false);
  };

  const handleFromToToggle = (e) => {
    e.preventDefault();
    setAmount("");
    setCurrentConversion(currentConversion === "Buying" ? "Selling" : "Buying");

    if (currentConversion === "Buying") {
      setFromCurrency("ETB");
      setToCurrency("");
    } else {
      setFromCurrency("");
      setToCurrency("ETB");
    }
  };

  //   Handling selling price
  const handleToChange = (e) => {
    e.preventDefault();
    const selectedCurrency = e.target.value;
    setToCurrency(selectedCurrency);
    setFromCurrency("ETB");
    const rate = fx_rates.find((r) => r.currencyCode === selectedCurrency);
    if (rate) {
      setRate(rate.sellingPrice);
      if (amount && parseFloat(amount) > 0) {
        const result = parseFloat(amount) / rate.sellingPrice;
        setConvertedAmount(result.toFixed(2));
        setIsConverted(true);
      } else {
        setConvertedAmount(null);
        setIsConverted(false);
      }
    }
  };

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
        <img src={logo} alt="Logo" className="h-10 md:h-24" />
        <p className="">Exchange Rates <span className="text-[#009FD6]">{date}</span></p>

        <h1 className="text-red-500">{error}</h1>
        <button
          onClick={fetchData}
          className=" border bg-white  px-4 py-1 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="p-6 md:p-8 min-h-screen w-full space-y-12">
      {/* Header */}
      <div className="w-full flex flex-col items-center justify-center space-y-4">

        <h1 className="text-2xl text-center md:text-start  md:text-4xl font-extrabold ">
          Currency <span className="text-[#009FD6]">Exchange</span> Rates
          <span className="text-[#009fd6] text-[16px] ml-4 md:text-2xl">{date}</span>
        </h1>
      </div>



      {/* Exchange Rate Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full md:w-[85%] lg:md:w-3/4 mx-auto bg-white border rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-[#009FD6]/10 text-gray-700 text-left">
            <tr>
              <th className="p-4">Currency</th>
              <th className="p-4">Buying in ETB</th>
              <th className="p-4">Selling in ETB</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fx_rates.map((rate, i) => (
              <tr key={i} className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-bold text-gray-800">
                  {rate.currencyCode}
                  <div className=" text-gray-600">
                    {rate.currencyCode === "USD"
                      ? "US Dollar"
                      : rate.currencyCode === "EUR"
                        ? "Euro"
                        : rate.currencyCode === "GBP"
                          ? "British Pound"
                          : ""}
                  </div>
                </td>
                <td className="p-4  ">{rate.buyingPrice}</td>
                <td className="p-4  ">{rate.sellingPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conversion Form */}
      <div className="w-full md:w-[85%] lg:md:w-3/4 mx-auto bg-white flex md:flex-row gap-4 items-center px-6 py-4 border rounded-xl shadow-sm justify-between flex-wrap">
        {/* From */}

        {/* Buying */}
        {currentConversion === "Buying" ? (
          <div className="w-full md:w-[40%] flex justify-between items-center relative">
            <div className="max-sm:w-[40%]">
              <h1 className="text-gray-700">From</h1>
              <select
                value={fromCurrency}
                onChange={handleFromChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white browser-default"
              >
                <option value="" disabled>
                  Select
                </option>
                {fx_rates.map((rate) => (
                  <option key={rate.currencyCode} value={rate.currencyCode}>
                    {rate.currencyCode}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="border border-gray-300 rounded-full px-4 md:px-8 py-1 focus:bg-[#009FD6]/70 focus:text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] sm:-translate-y-[30%] "
              onClick={handleFromToToggle}
            >
              <span className="icon text-blue-500">&#8596;</span>
            </button>
            {/* To */}
            <div className="max-sm:w-[40%]">
              <h1 className="text-gray-700">To</h1>
              <select
                defaultValue="ETB"
                // value={toCurrency}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white browser-default"
              >
                <option value="ETB">ETB</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="w-[40%] flex justify-between items-center relative">
            <div className="max-sm:w-[40%]">
              <h1 className="text-gray-700">From</h1>
              <select
                value={fromCurrency}
                onChange={handleFromChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white browser-default"
              >
                <option value="ETB">ETB</option>
              </select>
            </div>
            <button
              className="border border-gray-300 rounded-full px-4 md:px-8 py-1 focus:bg-[#009FD6]/70 focus:text-white absolute top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-[30%]"
              onClick={handleFromToToggle}
            >
              <span className="icon text-blue-500">&#8596;</span>
            </button>
            {/* To */}
            <div className="max-sm:w-[40%]">
              <h1 className="text-gray-700">To</h1>
              <select
                value={toCurrency}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white browser-default"
                onChange={handleToChange}
              >
                <option value="" disabled>
                  Select
                </option>
                {fx_rates.map((rate) => (
                  <option key={rate.currencyCode} value={rate.currencyCode}>
                    {rate.currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Amount */}
        <div className="max-sm:w-full">
          <input
            type="number"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={() => {
            if (amount && parseFloat(amount) > 0 && fromCurrency && price) {
              if (currentConversion === "Buying") {
                const result = parseFloat(amount) * price;
                setConvertedAmount(result.toFixed(2));
                setIsConverted(true);
                return;
              }
              const result = parseFloat(amount) / price;
              setConvertedAmount(result.toFixed(2));
              setIsConverted(true);
            }
          }}
          disabled={
            !amount || parseFloat(amount) <= 0 || !fromCurrency || !price
          }
          className={`w-full md:w-auto px-6 py-2 rounded-xl text-white 
    ${!amount || parseFloat(amount) <= 0 || !fromCurrency || !price
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#009FD6] hover:bg-[#007FB3] cursor-pointer"
            }`}
        >
          Calculate
        </button>
      </div>

      {/* Conversion Result */}
      {isConverted && (
        <div className="w-full md:w-[85%] lg:md:w-3/4 mx-auto">
          <div className="text-center text-gray-700 text-xl font-medium flex flex-col ">
            <button
              className="self-end text-white mr-4 cursor-pointer"
              onClick={handleClear}
            >
              <span className="icon ">&#10060;</span>
            </button>
            <div className="text-2xl md:text-3xl">
              <span className="text-white">
                {amount} {fromCurrency} ={" "}
              </span>
              <span className="text-[#009FD6] font-bold">
                {convertedAmount} {toCurrency}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
