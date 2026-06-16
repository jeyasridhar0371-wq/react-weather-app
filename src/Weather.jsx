import { useState } from "react"
import axios from "axios"
function Weather() {

    // states for dynamic rendering
    const [city, setCity] = useState("madurai")
    const [icon, setIcon] = useState("🌍")
    const [weather, setWeather] = useState("Cloud")
    const [temp, setTemp] = useState("32.15")
    const [desc, setDesc] = useState("may be rain")

    // state for loading
    const [loading, setLoading] = useState(false)

    // state for background colour
    const [bgcolor, setBgcolor] = useState("bg-gradient-to-br from-blue-300 to-blue-700")

    // state for input value
    const [input, setInput] = useState()

    function handleChange(evt) {
        setInput(evt.target.value)
    }

    function getWeather() {
        setLoading(true)
        var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=a6d56f21850d81b841da58aaa888791f&units=metric`)
        weatherData.then((success) => {
            console.log(success.data)
            setCity(input)
            setWeather(success.data.weather[0].main)
            setTemp(success.data.main.temp)
            setDesc(success.data.weather[0].description)
            if (success.data.weather[0].main === "Clouds") {
                setIcon("☁️")
                setBgcolor("bg-gradient-to-br from-blue-300 to-gray-500")
            }
            else if (success.data.weather[0].main === "Rain") {
                setIcon("🌧️")
                setBgcolor("bg-gradient-to-br from-gray-500 to-gray-800")
            }
            else if (success.data.weather[0].main === "Clear") {
                setIcon("☀️")
                setBgcolor("bg-gradient-to-br from-yellow-300 to-orange-500")
            }
            else if (success.data.weather[0].main === "Snow") {
                setIcon("❄️☃️")
                setBgcolor("bg-gradient-to-br from-blue-300 to-blue-500")
            }
            else if (success.data.weather[0].main === "Thunderstorm") {
                setIcon("⛈️")
                setBgcolor("bg-gradient-to-br from-gray-600 to-gray-800")
            }
            else {
                setIcon("🌍")
                setBgcolor("bg-gradient-to-br from-blue-400 to-blue-700")
            }
            setLoading(false)
        }).catch(()=>{
            alert("May be network issue or you entered wrong city name, Try later")
            setLoading(false)
            setInput(" ")
        })
    }

    return (
        <div className={`${bgcolor} p-20 w-full min-h-screen flex justify-center text-white`}>
            <div className="bg-white/20 p-10 w-full md:w-[80%] rounded-3xl hover:scale-105 duration-500">
                <h1 className="text-[4vw] font-bold">Weather Report</h1>
                <p className="mb-3">I can give you a weather report about your city !</p>
                <input onChange={handleChange} className="w-[60%] border-2 rounded-md" type="text" placeholder="Enter city" />
                <button onClick={getWeather} className="bg-black text-[2vw] text-white p-1 m-2 rounded-lg">Get Weather</button>
                <div className="font-bold flex justify-center p-5 m-3">
                    {
                        loading ? (<h1 className="text-center mt-30">Loading...</h1>): 
                        (<div className="text-center">
                            <h1 className="font-bold text-[4vw]">{city}</h1>
                            <h1 className="text-[5vw]">{icon}</h1>
                            <h1>{weather}</h1>
                            <p className="text-[2vw] my-3">{temp}℃</p>
                            <p>{desc}</p>
                        </div>)
                    }


                </div>
            </div>
        </div>
    )
}

export default Weather