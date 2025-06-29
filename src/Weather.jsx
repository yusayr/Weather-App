import React, { useState } from 'react'
import './Weather.css'

const api = {
    key: "ec50de1761bfc33a8c2543a0349cced4",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (evt) => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('')
                    console.log(result)
                })
        }
    }

    const dateBuilder = (d) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const days = [
            "Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? 
            ((weather.main.temp > 16) ? 
        'app warm' : 'app') : 'app'}>
            <main>
                <div className='search-box'>
                    <input type="text"
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search} />
                </div>
                <div>
                    {typeof weather.main !== "undefined" ? (
                        <div>
                            <div className="location-box">
                                <div className="location">
                                    {weather.name}, {weather.sys.country}
                                </div>
                                <div className="date">
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°C 
                                </div><div className="weather">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    )
}

export default Weather