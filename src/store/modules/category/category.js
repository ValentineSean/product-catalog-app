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
    setCategories: (state, categories) => (state.categories = categories),
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