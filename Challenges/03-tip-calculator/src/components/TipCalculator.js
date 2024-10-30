import { useState } from 'react';
import BillInput from './BillInput';
import PayOutput from './PayOutput';
import ResetBill from './ResetBill';
import SelectPercentage from './SelectPercentage';

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  //   const percentage = percentage1 + percentage2;
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill('');
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput
        bill={bill}
        onSetBill={setBill}
      />
      <div>
        <SelectPercentage
          percentage={percentage1}
          onSelect={setPercentage1}
        >
          How did you like the service?
        </SelectPercentage>
      </div>
      <div>
        <SelectPercentage
          percentage={percentage2}
          onSelect={setPercentage2}
        >
          How did your friend like the service?
        </SelectPercentage>
      </div>
      {bill > 0 && (
        <>
          <PayOutput
            bill={bill}
            tip={tip}
          />
          <ResetBill onReset={handleReset} />
        </>
      )}
    </div>
  );
}

export default TipCalculator;
