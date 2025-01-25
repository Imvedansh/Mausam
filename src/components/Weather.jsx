import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../assets/search.png'
import Clear_icon from '../assets/clear.png'
import Cloud_icon from '../assets/cloud.png'
import Rain_icon from '../assets/rain.png'
import Snow_icon from '../assets/snow.png'
import Drizzle_icon from '../assets/drizzle.png'
import Humidity_icon from '../assets/humidity.png'
import Wind_icon from '../assets/wind.png'

const Weather = () => {
    const inputref = useRef();
    const [WeatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": Clear_icon,
        "01n": Clear_icon,
        "02d": Cloud_icon,
        "02n": Cloud_icon,
        "03d": Cloud_icon,
        "03n": Cloud_icon,
        "04d": Drizzle_icon,
        "04n": Drizzle_icon,
        "09d": Rain_icon,
        "09n": Rain_icon,
        "10d": Rain_icon,
        "10n": Rain_icon,
        "13d": Snow_icon,
        "13n": Snow_icon,
    }
    const search = async (city) => {

        if (city === "") { alert("Please enter a city name"); return; }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message); 
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        }


        catch (error) {  setWeatherData(false); alert("City not found"); }
    }
    useEffect(() => { search("London") }, [])
    return (
        <div className='Weather'>
            <div className="Search_bar">
                <input ref={inputref} type="text " placeholder='Search here' />
                <img src={Search_icon} alt="" onClick={() => search(inputref.current.value)} />
            </div>
            {WeatherData ? <>
                <img src={WeatherData.icon} alt="" className='Weather_icon' />
                <p className='Temperature'>{WeatherData.temperature}°c</p>
                <p className='Location'>{WeatherData.location}</p>
                <div className='Weather_data'>
                    <div className="Col">
                        <img src={Humidity_icon} alt="" />
                        <div>
                            <p>{WeatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='Col'>
                        <img src={Wind_icon} alt="" />
                        <div>
                            <p>{WeatherData.windSpeed}KM\HR</p>
                            <span>wnind speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Weather