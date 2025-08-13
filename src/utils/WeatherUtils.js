import rainBg from '../assets/rain-drops.png'
import cloudyBg from '../assets/cloudy-1.png'
import clearBg from '../assets/clear-sunny-1.png'
import snowBg from '../assets/snowy-2.png'
import thunderstormBg from '../assets/thunderstorm-1.png'
import mistBg from '../assets/mist-1.png'

export const weatherBackgrounds = {
    rain: rainBg,
    cloudy: cloudyBg,
    clear: clearBg,
    snow: snowBg,
    thunderstorm: thunderstormBg,
    mist: mistBg,
    drizzle: rainBg,
    default: cloudyBg
}

export const getWeatherBackground = (weathermain) => {
    const condition = weathermain.toLowerCase()

    if (condition.includes('rain')) return weatherBackgrounds.rain
    if (condition.includes('clouds')) return weatherBackgrounds.cloudy
    if (condition.includes('clear')) return weatherBackgrounds.clear
    if (condition.includes('snow')) return weatherBackgrounds.snow
    if (condition.includes('thunderstorm')) return weatherBackgrounds.thunderstorm
    if (condition.includes('drizzle')) return weatherBackgrounds.drizzle
    if (condition.includes('mist') || condition.includes('fog')) return weatherBackgrounds.mist

    return weatherBackgrounds.default
}
 

export const popularCities = [
    "Nairobi", 
    "Manchester",
    "New York",
    "Mumbai",
    "Delhi",
    "Kampala"
];
