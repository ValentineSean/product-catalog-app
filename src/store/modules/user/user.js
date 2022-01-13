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
            // console.log(error)
            return{
                "status": "error",
                "message": "Server technical problem"
            }
        }
    },
}

    // async createProduct({ commit }, product){
    //     let product_name = product["product_name"]
    //     let category = product["category"]
    //     let quantity_available = product["quantity_available"]
    //     let unit_price = product["unit_price"]
    //     let supplier = product["supplier"]
    //     let product_image = product["product_image"]

    //     product = new FormData()
    //     product.append("product_name", product_name)
    //     product.append("category", category)
    //     product.append("quantity_available", quantity_available)
    //     product.append("unit_price", unit_price)
    //     product.append("supplier", supplier)
    //     product.append("product_image", product_image)

    //     try{
    //         const response = await axios.post(`create-product`, product)
            
    //         if(response["data"]["status"] === "200"){
    //             product = response["data"]["data"]
    //             // console.log(response["data"]["data"])
    //             commit("addProduct", product)

    //             return{
    //                 "status": "success",
    //                 "message": "Product successfully created"
    //             }
    //         }

    //         else{
    //             return{
    //                 "status": "error",
    //                 "message": "Failed to create product"
    //             }
    //         }
    //     }
        
    //     catch(error){
    //         // console.log(error)
    //         return{
    //             "status": "error",
    //             "message": "Server technical problem"
    //         }
    //     }
    // }


const mutations = {
    setUsers: (state, users) => (state.users = users),
    setSuppliers: (state, users) => {
        let suppliers = users.filter(x => x.role === "SUPPLIER")
        state.suppliers = suppliers
    }

    // setRatedProduct: (state, product) => {
    //     const index = state.products.findIndex(x => x._id === product["_id"])

    //     if(index !== -1){
    //         state.products.splice(index, 1, product)
    //     }

    //     state.product_details = product
    // },
    // addProduct: (state, product) => (state.products.unshift(product[0])),
}

export default{
    state,
    getters,
    actions,
    mutations
}