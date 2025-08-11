const API_URL = "https://pydolarve.org/api/v2/tipo-cambio"

const ved = document.querySelector(".ved")
const update = document.querySelector(".update_info")
const drop = document.getElementById("drop_opts")
const currSymbol = document.querySelector(".curr_sym")

let currAmmount = document.querySelector(".curr")

//---Mostrar precio del dólar al abrir la página---

function whenLoad() {
    currAmmount.placeholder = "1.00"

    fetch(API_URL).then(response => {
        if(!response.ok) {
            console.log("ERROR")
            ved.innerHTML = "ERROR"
            update.innerHTML = "ERROR"
        }
        return response.json().then(data => {
            console.log(data)
            tasa = data.monitors.usd.price
            act = data.monitors.usd.last_update
            ved.innerHTML = tasa
            update.innerHTML = act
        })
    })
}

window.onload = whenLoad

//---Cambiar divisa---

drop.addEventListener('change', (event) => {
    dropOpt = event.target.value
    currInput = parseFloat(currAmmount.value) || 1

    fetch(API_URL).then(response => {
        return response.json().then(data => {
            console.clear()
            console.log(data)

            switch(dropOpt) {
            case "usd":
                currSymbol.innerHTML = "$"
                currentPrice = data.monitors.usd.price
                lastUpdate = data.monitors.usd.last_update
                ved.innerHTML = (currInput * currentPrice).toFixed(2)
                update.innerHTML = lastUpdate
                tasa = currentPrice
                break
            case "eur":
                currSymbol.innerHTML = "€"
                currentPrice = data.monitors.eur.price
                lastUpdate = data.monitors.eur.last_update
                ved.innerHTML = (currInput * currentPrice).toFixed(2)
                update.innerHTML = lastUpdate
                tasa = currentPrice
                break
            case "cny":
                currSymbol.innerHTML = "¥"
                currentPrice = data.monitors.cny.price
                lastUpdate = data.monitors.cny.last_update
                ved.innerHTML = (currInput * currentPrice).toFixed(2)
                update.innerHTML = lastUpdate
                tasa = currentPrice                
                break
            default:
                console.clear()
                currSymbol.innerHTML = "$"
                currentPrice = data.monitors.usd.price
                lastUpdate = data.monitors.usd.last_update
                ved.innerHTML = (currInput * currentPrice).toFixed(2)
                tasa = currentPrice
                update.innerHTML = lastUpdate                
            }
        })
    })
})
//drop.addEventListener('change', changeCurrency)

/*
exch.addEventListener('change', event() => {
    console.clear()
    let dropOpt = event.target.value
    let currInput = parseFloat(currAmmount.value) || 0

    fetch(API_URL).then(response => {
        if(!response.ok) {
            console.log("ERROR")
        }
        return response.json().then(data => {
            console.log(data)

            switch(dropOpt) {
            case "usd":
                currSymbol.innerHTML = "$"
                currentPrice = data.monitors.usd.price
                lastUpdate = data.monitors.usd.last_update
                ved.innerHTML = (currentPrice * currInput).toFixed(2)
                update.innerHTML = lastUpdate
                break
            case "eur":
                currSymbol.innerHTML = "€"
                currentPrice = data.monitors.eur.price
                lastUpdate = data.monitors.eur.last_update
                ved.innerHTML = (currentPrice * currInput).toFixed(2)
                update.innerHTML = lastUpdate
                break
            case "cny":
                currSymbol.innerHTML = "¥"
                currentPrice = data.monitors.cny.price
                lastUpdate = data.monitors.cny.last_update
                ved.innerHTML = (currentPrice * currInput).toFixed(2)
                update.innerHTML = lastUpdate                
                break
            default:
                currSymbol.innerHTML = "$"
                currentPrice = data.monitors.usd.price
                lastUpdate = data.monitors.usd.last_update
                ved.innerHTML = (currentPrice * currInput).toFixed(2)
                update.innerHTML = lastUpdate                
            }
        })
    })
})

*/

//---Actualizar el cambio en tiempo real mientras el usuario escribe---

function updateExchange() {
    let currInput = parseFloat(currAmmount.value) || 1
    ved.innerHTML = (currInput * tasa).toFixed(2)
}

currAmmount.addEventListener('input', updateExchange)