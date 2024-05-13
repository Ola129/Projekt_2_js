const getCurrencyOptions = async () => {
  const response = await fetch("http://api.nbp.pl/api/exchangerates/tables/a/");
  console.log(response);
  const json = await response.json();
  return json.rates;
};
const getCurrencyRate=(fromCurrency,toCurrency) => {
    
}