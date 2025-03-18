import React from "react";
import {BsCloud} from 'react-icons/bs';
import {FaWind} from 'react-icons/fa';  
import { FaLocationDot } from "react-icons/fa6";
import {BiSearch} from 'react-icons/bi';
import { MdOutlineMyLocation } from "react-icons/md";

function Weather() {
  return (
    <div className="weather-container">
        <div className="main-section">
            <div className="weather-info">
                <div className="location">
                    <h3>{/*<MdOutlineMyLocation className="icon"/>*/}New York - USA</h3>
                </div>
                <div className="condition">
                    <h1>Overcast</h1>
                </div>
            </div>
            <div className="weather-hours">
                <div className="hour-card">
                    <div className="hour-time">
                        <p>12:00</p>
                    </div>
                    <div className="hour-condition">
                        <BsCloud   />
                    </div>
                    <div className="hour-temp">
                        <h2>10°C</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="side-section">
            <div className="search-box">
                <FaLocationDot  className="icon"/>
                <input type="text" placeholder="New York"/>
                <BiSearch  className="icon"/>
            </div>
            
            <div className="temp-info">
                <h2>10°C</h2>
                <p>
                    <FaWind /> NE 40 km/h
                </p>
            </div>

            <div className="forecast-days">
                <h1 className="forecast-heading">The Next Days Forecast</h1>
                <div className="forecast-item">
                    <div className="forecast-details">
                        <div className="forecast-icon">
                            {/* <BsCLoud /> */}
                        </div>
                        <div className="details">    
                            <h2>Monday, December 3</h2>
                            <p>Overcast</p>
                        </div>
                    </div>
                    <div className="forecast-temp">
                        <div className="temp-display">
                            <h2>10°C</h2>
                            <h2>5°C</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}


export default Weather;