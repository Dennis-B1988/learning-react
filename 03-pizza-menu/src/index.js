import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Pizza Menu</h1>
    </div>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Pizza of the day</h2>
      {numPizzas > 0 ? (
        <>
          <p>Try our mouth-watering selection of pizza today</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza
                pizza={pizza}
                key={pizza.name}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later</p>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (!isOpen)
  //   return (
  //     <p style={{ color: 'red' }}>
  //       We're closed. We are open from {openHour}:00 to {closeHour}:00.
  //     </p>
  //   );

  return (
    <div className="footer">
      <p>&copy; Copyright 2024. All rights reserved.</p>
      {isOpen ? (
        <Order
          closeHour={closeHour}
          openHour={openHour}
        />
      ) : (
        <p style={{ color: 'red' }}>
          We're closed. We are open from {openHour}:00 to {closeHour}:00.
        </p>
      )}
    </div>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're open from {props.openHour}:00 to {props.closeHour}:00. Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

function Pizza({ pizza }) {
  // if (pizza.soldOut) return null;

  return (
    <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
      <img
        src={pizza.photoName}
        alt={pizza.name}
      />
      <div>
        <h2>{pizza.name}</h2>
        <p>{pizza.ingredients}</p>

        {/* {pizza.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{pizza.price}€</span>
        )} */}

        <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price + '€'}</span>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
