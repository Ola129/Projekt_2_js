"use strict";

class CurrencyConverter {
  constructor() {
    this.currencies = ["EUR", "USD", "CHF"];
    this.rates = {};
    this.selectElement = document.querySelector("#currency-select");
    this.inputElement = document.querySelector("#amount-input");
    this.inputElement.setAttribute("step", "0.01");
    this.resultElement = document.querySelector("#result");
    this.buttonElement = document.querySelector("#convert-button");
    this.loaderElement = document.querySelector("#loader");
    this.errorElement = document.querySelector("#error-message");
    this.formElement = document.querySelector("#currency-form");

    document
      .getElementById("reset-button")
      .addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("result").textContent = "";
        document.getElementById("amount-input").value = "";
      });

    this.currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.text = currency;
      option.value = currency;
      this.selectElement.add(option);
    });
  }

  async fetchRate(currency) {
    this.loaderElement.style.display = "block";
    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`
      );
      const data = await response.json();
      this.rates[currency] = data.rates[0]?.mid;
      this.errorElement.textContent = "";
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych", error);
      this.errorElement.textContent =
        "Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później.";
      this.loaderElement.style.display = "none";
      return;
    }
    this.loaderElement.style.display = "none";
  }

  setupEventListeners() {
    this.formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      const currency = this.selectElement.value;
      const amount = parseFloat(this.inputElement.value);
      if (isNaN(amount) || amount <= 0) {
        alert("Wprowadź poprawną liczbę");
        return;
      }
      await this.fetchRate(currency);
      const rate = this.rates[currency];
      if (rate) {
        const result = amount * rate;
        this.resultElement.textContent = `Wynik: ${result.toFixed(2)} PLN`;
      }
    });
  }

  init() {
    this.setupEventListeners();
  }
}

const converter = new CurrencyConverter();
converter.init();
