import axios from "axios"

const state = {
    products: [],
    searched_products: [],
    product_details: {}
}

const getters = {
    getProducts: (state) => state.products,
    getSearchedProducts: (state) => state.searched_products,
    getProductDetails: (state) => state.product_details,
}

const actions = {
    async fetchProducts({ commit }){
        try{
            let response = await axios.get(`get-products`)
            
            if(response["data"]["status"] === "200"){
                let products = response["data"]["data"]
                commit("setProducts", products)

                return{
                    "status": "success",
                    "message": "Products successfully fetched",
                    "data": products
                }
            }

            else{
                commit("setProducts", [])

                return{
                    "status": "error",
                    "message": "Failed to fetch products"
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

    async searchProducts({ commit }, search_product){
        let search_string = search_product["search_string"]
        let search_criteria = search_product["search_criteria"]

        try{
            let response = await axios.post(`search-products?search_criteria=${search_criteria}`, {
                search_string
            })
            
            if(response["data"]["status"] === "200"){
                let products = response["data"]["data"]
                commit("setSearchedProducts", products)

                return{
                    "status": "success",
                    "message": "Products successfully fetched",
                    "data": products
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to fetch products"
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

    async refreshProductDetails({ commit }, product){
        try{
            commit("setProductDetails", product)

            return{
                "status": "success",
                "message": "Product details successfully refreshed",
                "data": product
            }
        }

        catch(error){
            return{
                "status": "error",
                "message": "Error encountered while refreshing product"
            }
        }
    },

    async rateProduct({ commit }, product){
        let product_id = product["_id"]["$oid"]
        let rating = product["rating"]

        try{
            let response = await axios.put(`rate-product`, {
                product_id,
                rating
            })
            
            if(response["data"]["status"] === "200"){
                product = response["data"]["data"]
                commit("setRatedProduct", product[0])

                return{
                    "status": "success",
                    "message": "Product successfully rated"
                }
            }

            else{
                return{
                    "status": "error",
                    "message": "Failed to rate product"
                }
            }
        }
        
        catch(error){
                return{
                    "status": "error",
                    "message": "Server technical problem"
                }
        }
    }
}


const mutations = {
    setProducts: (state, products) => (state.products = products),
    setSearchedProducts: (state, products) => (state.searched_products = products),
    setProductDetails: (state, product) => (state.product_details = product),

    setRatedProduct: (state, product) => {
        const index = state.products.findIndex(x => x._id === product["_id"])

        if(index !== -1){
            state.products.splice(index, 1, product)
        }

        state.product_details = product
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}