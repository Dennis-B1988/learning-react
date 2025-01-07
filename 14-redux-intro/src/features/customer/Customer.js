import { useSelector } from 'react-redux';

function Customer() {
  // @ts-ignore
  const customer = useSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
