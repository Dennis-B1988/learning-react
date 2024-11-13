import { useEffect, useState } from 'react';
import './App.css';
import { is } from 'C:/Users/Dennis/AppData/Local/Microsoft/TypeScript/5.6/node_modules/@babel/types/lib/index';

function App() {
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);

      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();

      setRates(data.rates[toCurrency].toFixed(2));
      setIsLoading(false);
    }

    if (fromCurrency === toCurrency) return setRates(String(amount));
    if (!amount) return setRates('0');

    fetchRates();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="App">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="JPY">JPY</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="JPY">JPY</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {rates && !isLoading && (
        <p>
          {rates} {toCurrency}
        </p>
      )}
      {fromCurrency === toCurrency && <p>Same currency</p>}
    </div>
  );
}

export default App;
