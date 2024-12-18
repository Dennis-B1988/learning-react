import { createContext, useEffect, useState } from 'react';

const URL = 'http://localhost:9000';

const CitiesContext = createContext(null);

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert('There was an error creating the city');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: 'DELETE',
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert('There was an error deleting the city');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
