"use strict";

class CurrencyConverter {
  constructor() {
    this.currencies = ["EUR", "USD", "CHF"];
    this.rates = {};
    this.selectElement = document.querySelector("select");
    this.inputElement = document.querySelector("input");
    this.resultElement = document.querySelector("#result");
    this.buttonElement = document.querySelector("button");
  }

  fetchRates() {
    this.currencies.forEach((currency) => {
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          this.rates[currency] = data.rates[0].mid;
          const option = document.createElement("option");
          option.text = `${data.code} - ${data.currency}`;
          option.value = currency;
          this.selectElement.add(option);
        });
    });
  }

  setupEventListeners() {
    this.buttonElement.addEventListener("click", () => {
      const rate = this.rates[this.selectElement.value];
      const amount = this.inputElement.value;
      const result = amount * rate;
      this.resultElement.textContent = `Wynik: ${result.toFixed(2)} PLN`;

      setTimeout(() => {
        this.resultElement.textContent = "";
      }, 300000);
    });
  }

  init() {
    this.fetchRates();
    this.setupEventListeners();
  }
}

const converter = new CurrencyConverter();
converter.init();
