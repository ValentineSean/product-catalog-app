import store from "./store"
import axios from "axios"

store.subscribe((mutation) => {
    // console.log(mutation)
    switch(mutation.type){
        case "setToken":
            // console.log(mutation.payload)
            if(mutation.payload){
                axios.defaults.headers.common["Authorization"] = `Bearer ${mutation.payload}`
                sessionStorage.setItem("token", mutation.payload)
            }

            else{
                axios.defaults.headers.common["Authorization"] = null
                sessionStorage.removeItem("token")
            }
            break
    }
})