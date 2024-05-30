"use strict";

const selectElement = document.getElementById("currency-select");
const inputElement = document.getElementById("amount-input");
const buttonElement = document.getElementById("convert-button");
const resultElement = document.getElementById("result");

async function getCurrencyCodes() {
  const url = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rates = data[0].rates;
    const selectedCurrencies = ["EUR", "USD", "CHF"];
    rates.forEach((rate) => {
      if (selectedCurrencies.includes(rate.code)) {
        const option = document.createElement("option");
        option.value = rate.code;
        option.text = `${rate.code} (${rate.currency})`;
        selectElement.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
}

async function convertCurrency() {
  const amount = inputElement.value;
  const currencyCode = selectElement.value;
  const url = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode}?format=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[0].mid;
    const result = amount * rate;
    resultElement.textContent = `Wynik: ${result.toFixed(2)} PLN`;
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
}

buttonElement.addEventListener("click", convertCurrency);

window.addEventListener("load", getCurrencyCodes);

// const selectElement = document.getElementById("currency-select");
// const selectElement2 = document.getElementById("toCurrency");
// const inputElement = document.getElementById("amount-input");
// const buttonElement = document.getElementById("convert-button");
// const resultElement = document.getElementById("result");

// async function getCurrencyCodes() {
//   const url = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const rates = data[0].rates;
//     const selectedCurrencies = ["EUR", "USD", "CHF"];
//     rates.forEach((rate) => {
//       if (selectedCurrencies.includes(rate.code)) {
//         const optionFrom = document.createElement("option");
//         optionFrom.value = rate.code;
//         optionFrom.text = `${rate.code} (${rate.currency})`;
//         selectElement.appendChild(optionFrom);

//         const optionTo = document.createElement("option");
//         optionTo.value = rate.code;
//         optionTo.text = `${rate.code} (${rate.currency})`;
//         selectElement2.appendChild(optionTo);
//       }
//     });
//   } catch (error) {
//     console.error("Wystąpił błąd:", error);
//   }
// }

// async function convertCurrency() {
//   const amount = inputElement.value;
//   const currencyCode1 = selectElement.value;
//   const currencyCode2 = selectElement2.value;

//   const url1 = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode1}?format=json`;
//   // const url2 = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyCode2}?format=json`;

//   try {
//     const response1 = await fetch(url1);
//     const data1 = await response1.json();
//     const rate1 = data1.rates[0].mid;

//     const response2 = await fetch(url2);
//     const data2 = await response2.json();
//     const rate2 = data2.rates[0].mid;

//     const result = (amount * rate1) / rate2;
//     resultElement.textContent = `Wynik to ${result.toFixed(
//       2
//     )} ${currencyCode2}`;
//   } catch (error) {
//     console.error("Wystąpił błąd:", error);
//   }
// }

// buttonElement.addEventListener("click", convertCurrency);

// selectElement.addEventListener("click", getCurrencyCodes);
