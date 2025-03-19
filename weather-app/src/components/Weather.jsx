import React, { useEffect } from "react";
// import {BsCloud} from 'react-icons/bs';
import {FaWind} from 'react-icons/fa';  
import { FaLocationDot } from "react-icons/fa6";
import {BiSearch} from 'react-icons/bi';
// import { MdOutlineMyLocation } from "react-icons/md";
import { fetchForecastByCity } from "../redux/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import sunny from '../assets/sunny.jpg';
import cloudy from '../assets/cloud.jpg';
import rainy from '../assets/rain.jpg';
import snow from '../assets/snow.jpg';

function Weather() {

    const[city, setCity] = React.useState("");
    const handleSearch = () => {
        if(city.trim() !== "")
            dispatch(fetchForecastByCity(city));
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchForecastByCity("New York"));
    }, [dispatch]);

    const forecast = useSelector((state) => state.weather.forecast);
    console.log(forecast);

    const forecastHours = forecast?.forecast?.forecastday[0]?.hour.slice(0, 10);

    const weatherCondition = forecast?.current?.condition?.text?.toLowerCase();

    let background = sunny;

    if(weatherCondition){
        if(weatherCondition.includes("clear") || weatherCondition.includes("sunny") || weatherCondition.includes("fair")){
            background = sunny;
        }
        else if(weatherCondition.includes("rain") || weatherCondition.includes("shower") || weatherCondition.includes("drizzle")){
            background = rainy;
        }
        else if(weatherCondition.includes("cloud") || weatherCondition.includes("overcast")){
            background = cloudy;
        }
        else if(weatherCondition.includes("snow")){
            background = snow;
        }
    }

  return (
    <div className="weather-container"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}> 
        <div className="main-section">
            <div className="weather-info">
                <div className="location">
                    <h3>{/*<MdOutlineMyLocation className="icon"/>*/}{forecast?.location?.name} - {forecast?.location?.country}</h3>
                </div>
                <div className="condition">
                    <h1>{forecast?.current?.condition?.text}</h1>
                </div>
            </div>
            <div className="weather-hours">
                {forecastHours?.map((hour, index) => {
                    
                    const time = new Date(hour.time).toLocaleTimeString("en-US",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                        });

                    return (
                        <div className="hour-card" key={index}>
                            <div className="hour-time">
                                <p>{time}</p>
                            </div>
                            <div className="hour-condition">
                                {/* <BsCloud   /> */}
                                <img src={hour?.condition?.icon} alt=""/>
                            </div>
                            <div className="hour-temp">
                                <h2>{Math.ceil(hour?.temp_c)}°C</h2>
                            </div>
                        </div>
                    )}
                )}
            </div>
        </div>
        <div className="side-section">
            <div className="search-box">
                <FaLocationDot  className="icon"/>
                <input type="text" placeholder={forecast?.location?.name} value={city} 
                    onChange={(e)=> setCity(e.target.value)}
                    onKeyDown= {(e) => {
                        if(e.key === 'Enter'){
                            {handleSearch};}
                    }}
                />                
                <BiSearch  className="icon" onClick={handleSearch}/>
            </div>
            
            <div className="temp-info">
                <h2>{Math.ceil(forecast?.current?.temp_c)}°C</h2>
                <p>
                    <FaWind /> {forecast?.current?.wind_dir} {" "} {forecast?.current?.wind_kph} km/h
                </p>
            </div>

            <div className="forecast-days">
                <h1 className="forecast-heading">The Next Days Forecast</h1>
                {
                    forecast?.forecast?.forecastday?.map((item, index) => {

                        const forecastDate = new Date(item.date).toLocaleDateString("en-US",
                            {
                                weekday: "long",
                                day: "2-digit",
                                month: "long"
                            });

                        return(    
                            <div className="forecast-item" key ={index}>
                                <div className="forecast-details">
                                    <div className="forecast-icon">
                                        {/* <BsCloud className="icon"/> */}
                                        <img src={item?.day?.condition?.icon} alt=""/>
                                    </div>
                                    <div className="details">    
                                        <h2>{forecastDate}</h2>
                                        <p>{item?.day?.condition?.text}</p>
                                    </div>
                                </div>
                                <div className="forecast-temp">
                                    <div className="temp-display">
                                        <h2>{Math.ceil(item.day.maxtemp_c)}°C</h2>
                                        <h2>{Math.ceil(item.day.mintemp_c)}°C</h2>
                                    </div>
                                </div>
                            </div>
                        )}
            )}
            </div>
        </div>
    </div>
  );
}


export default Weather;
