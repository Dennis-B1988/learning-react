import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, payLoan, requestLoan, withdrawal } from './AccountSlice';

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [currency, setCurrency] = useState('USD');

  const dispatch = useDispatch();
  // @ts-ignore
  const { loan: currentLoan, loanPurpose: currentLoanPurpose, isLoading } = useSelector((store) => store.account);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount(0);
    setCurrency('USD');
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdrawal(withdrawalAmount));
    setWithdrawalAmount(0);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(0);
    setLoanPurpose('');
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(+e.target.value)} />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? 'Converting...' : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input type="number" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(+e.target.value)} />
          <button onClick={handleWithdrawal}>Withdraw {withdrawalAmount}</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} placeholder="Loan purpose" />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} {currentLoanPurpose}
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
