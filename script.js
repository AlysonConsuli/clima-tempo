const apiKey = '93313b1c2f2f711a51dc8312937f6839'
const main = document.querySelector('main')
const btn = document.querySelector('button')

let city = document.querySelector('.city')
let state = document.querySelector('.state')
let country = document.querySelector('.country')

let cityName = null
let stateCode = null
let countryCode = null
let limit = 1
let lat = 0
let lon = 0

function accessAdress() {
    const promise = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`)

    promise.then(response => {
        if (response.data.length === 0) {
            alert('Insira uma lugar válido')
            window.location.reload()
        }
        const adress = response.data[0]
        lat = adress.lat
        lon = adress.lon
        accessWeather()
    })
}

function accessWeather() {
    const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    promise.then(response => {
        console.log(response.data)
        const localWeather = response.data
        main.innerHTML = `
        <h2>Tempo agora em <br> ${localWeather.name} ${stateCode.toUpperCase()}</h2>
        <div class="weather">
            <img src="http://openweathermap.org/img/wn/${localWeather.weather[0].icon}@2x.png" alt="${localWeather.weather[0].description}">
            <span>${Math.round(localWeather.main.temp - 273)}º</span>
        </div>
        <div class="infos">
            <p>Vento: ${Math.round(localWeather.wind.speed * 3.6)} km/h</p>
            <p>Umidade: ${localWeather.main.humidity}%</p>
        </div>
        `
    })
}

function searchAdress() {
    cityName = city.value
    stateCode = state.value
    countryCode = country.value
    if (cityName === '') {
        alert('Preencha a cidade')
    } else {
        accessAdress()
    }
}