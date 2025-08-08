const API_URL = "https://pydolarve.org/api/v1/dollar?page=alcambio"
const xhr = new XMLHttpRequest()

const ves = document.querySelector(".ves")
const update = document.querySelector(".update_info")
const exch = document.getElementById("drop_opts")

function whenLoad() {
    fetch(API_URL).then(response => {
        if(!response.ok) {
            console.log("ERROR")
            ves.innerHTML = "ERROR"
            update.innerHTML = "ERROR"
        }
        return response.json().then(data => {
            console.log(data)
            tasa = data.monitors.bcv.price
            act = data.monitors.bcv.last_update
            ves.innerHTML = tasa
            update.innerHTML = act
        })
    })
}

window.onload = whenLoad

exch.addEventListener('change', (event) => {
    console.clear()
    console.log(event.target.value)
    var chachi = event.target.value

    function onRequestHandler() {
        if(this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response)
        console.log(data)
        
            if(chachi == "bcv") {
                const current_price = data.monitors.bcv.price
                const last_update = data.monitors.bcv.last_update
                ves.innerHTML = current_price
                update.innerHTML = "Actualizado " + last_update
            } else if(chachi == "paralelo") {
                const current_price = data.monitors.enparalelovzla.price_old
                const last_update = data.monitors.enparalelovzla.last_update
                ves.innerHTML = current_price
                update.innerHTML = "Actualizado " + last_update            
            } else {
                console.log("ERROR")
            }
        }    
    }    
    xhr.addEventListener('load', onRequestHandler)
    xhr.open("GET", `${API_URL}`)
    xhr.send()
})

//HOLA



