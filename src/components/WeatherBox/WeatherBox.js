import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback,useState, useRef } from 'react';

const WeatherBox = props => {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const APIkey = ""

  const weatherData = useRef()
  const handleCityChange = useCallback(city =>{
    setPending(true)
    setError(false)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            weatherData.current = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main}
            console.log(data, weatherData)
            setPending(false)
          })
        } else {
          setPending(false)
          setError(true)
        }
    })
  }, []) 
  

  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(weatherData.current && !pending && !error) && <WeatherSummary data={weatherData.current}/>}
      {pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;