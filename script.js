const apiKey = '93313b1c2f2f711a51dc8312937f6839'

let cityName = null
let stateCode = null
let countryCode = null
let limit = 1
let lat = 0
let lon = 0

function adressPermission() {
    const permission = prompt('Você permite a busca da sua localização? (sim ou não)')
    if (permission.toLowerCase() === 'sim') {
        cityName = prompt('Qual sua cidade?')
        stateCode = prompt('Qual código do seu estado?')
        countryCode = prompt('Qual código do seu país?')
        accessAdress()
    }
}

function accessAdress() {
    const promise = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`)

    promise.then(response => {
        console.log(response.data)
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
    const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    promise.then(response => {
        console.log(response.data)
    })
    promise.catch(erro => {
        console.log(erro.response.status)
    })
}

adressPermission()




