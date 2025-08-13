import { useEffect, useState } from 'react';
import { getWeatherBackground } from './utils/WeatherUtils';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/loadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar'; 
import PopularCities from './components/PopularCities';
import WeatherDetails from './components/WeatherDetails';
import './styles/base.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('Nairobi');
  const [error, setError] = useState('');

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('response.cit');
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(searchCity);
  }, [searchCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim());
    }
  };

  const handleCitySelect = (city) => {
    setSearchCity(city);
    fetchWeatherData(city);
  };

  const currentBackground = weatherData
    ? getWeatherBackground(weatherData.weather[0].main)
    : getWeatherBackground('default');

  return (
    <div
      className="weather-app"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      <div className="main-weather">
        <div className="app-title">window.weather</div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>

      <div className="sidebar">
        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          handleSearch={handleSearch}
        />

        <PopularCities
          cities={['Nairobi', 'Mumbai', 'New York', 'Kampala', 'Delhi']}
          onCitySelect={handleCitySelect}
        />

        {weatherData && <WeatherDetails weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;

