import axios from "axios"
import jwt_decode from "jwt-decode"

const state = {
    active_user: {}
}

const getters = {
    getActiveUser: (state) => state.active_user,
}

const actions = {
    async login({ commit }, user){
        let email = user["email"]
        let password = user["password"]
        try{
            let response = await axios.post(`login`, {
                email,
                password
            })
            
            if(response["data"]["status"] === "200"){
                let token = response["data"]["token"]
                let active_user = jwt_decode(token)
                active_user = active_user["sub"]
                // console.log(stock)
                commit("setActiveUser", active_user)

                return{
                    "status": "success",
                    "message": "Login successfully",
                    // "data": user
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to login"
                }
            }
        }

        catch(error){
            // console.log(error)
            return{
                "status": "error",
                "message": "Server technical problem"
            }
        }
    },
}

const mutations = {
    setActiveUser: (state, active_user) => (state.active_user = active_user)
}

export default{
    state,
    getters,
    actions,
    mutations
}