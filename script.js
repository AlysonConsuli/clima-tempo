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

function adressPermission() {
    const permission = prompt('Você permite a busca da sua localização? (digite "sim" para permitir)')
    if (permission.toLowerCase() === 'sim') {
        cityName = prompt('Qual sua cidade?')
        stateCode = prompt('Qual código do seu estado?')
        countryCode = prompt('Qual código do seu país?')
        accessAdress()
    }
}

function accessAdress() {
    const promise = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`)

    promise.then(response => {
        //console.log(response.data)
        if(response.data.length === 0){
            alert('Insira uma lugar válido')
            window.location.reload()
        }
        const adress = response.data[0]
        /*console.log(adress.lat)
        console.log(adress.lon)*/
        lat = adress.lat
        lon = adress.lon
        accessWeather()
    })
    promise.catch(erro => {
        console.log(erro.response.status)
    })
}

function accessWeather(){
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

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
    promise.catch(erro => {
        console.log(erro.response.status)
    })
}

function searchAdress(){
    cityName = city.value
    stateCode = state.value
    countryCode = country.value
    accessAdress()
}

adressPermission()




