function PayOutput({ bill, tip }) {
  return (
    <div>
      <h3>
        Your pay ${bill + tip} (${bill} + ${tip} tip)
      </h3>
    </div>
  );
}

export default PayOutput;
