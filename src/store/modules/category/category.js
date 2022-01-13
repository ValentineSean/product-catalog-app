import axios from "axios"

const state = {
    users: [],
}

const getters = {
    getCategories: (state) => state.categories,
}

const actions = {
    async fetchCategories({ commit }){
        try{
            let response = await axios.get(`get-categories`)
            
            if(response["data"]["status"] === "200"){
                let categories = response["data"]["data"]
                console.log(categories)
                commit("setCategories", categories)

                return{
                    "status": "success",
                    "message": "Categories successfully fetched",
                    "data": categories
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch categories"
                }
            }
        }

        catch(error){
            return{
                "status": "error",
                "message": "Server technical problem"
            }
        }
    },
}


const mutations = {
    setCategories: (state, categories) => (state.categories = categories),
}

export default{
    state,
    getters,
    actions,
    mutations
}