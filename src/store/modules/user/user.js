import axios from "axios"

const state = {
    users: [],
    suppliers: [],
}

const getters = {
    getUsers: (state) => state.users,
    getSuppliers: (state) => state.suppliers,
}

const actions = {
    async fetchUsers({ commit }){
        try{
            let response = await axios.get(`get-users`)
            
            if(response["data"]["status"] === "200"){
                let users = response["data"]["data"]
                console.log(users)
                commit("setUsers", users)
                commit("setSuppliers", users)

                return{
                    "status": "success",
                    "message": "Users successfully fetched",
                    "data": users
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch users"
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
    setUsers: (state, users) => (state.users = users),
    setSuppliers: (state, users) => {
        let suppliers = users.filter(x => x.role === "SUPPLIER")
        state.suppliers = suppliers
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}